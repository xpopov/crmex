defmodule CrmEx.AuthChannel do
  require Logger
  require Coherence.Config;

  use CrmEx.Web, :channel

  alias CrmEx.User
  alias CrmEx.Config

  def join("auth", _params, socket) do
    Logger.info "Auth init"
    salt = UUID.uuid1
    Logger.debug "SALT = #{inspect(salt)}"
    {:ok, socket}
  end

  # Receive e-mail, password, other form data and issue new token on success
  def handle_in("signup", params, socket) do
    # {:reply, {:ok, %{"res" =>333}}, socket}
    Logger.info "Signup"
    # cs = User.changeset(%User{}, params)
    user_schema = Coherence.Config.user_schema
    cs = Coherence.ControllerHelpers.changeset(:registration, user_schema, user_schema.__struct__, params)
    Logger.debug "#{inspect(cs)}"
    user = Coherence.Config.repo.insert(cs)
    Logger.debug "#{inspect(user)}"
    response = case user do
      {:ok, user} ->
    #     # {:ok, %{"token" => get_sl_token(user)}}
        {:ok, %{"data" => user}}
      {:error, changeset} ->
        errors = Enum.reduce(changeset.errors, %{}, fn {field, detail}, acc ->
          Map.put(acc, field, render_detail(field, detail))
        end)
        {:error, %{"errors" => errors}}
    end
    {:reply, response, socket}
  end

  # Receive e-mail and password and obtain token on success
  def handle_in("signin", params, socket) do
    Logger.info "Signin"
    # trying to login manually through Coherence
    remember = if Coherence.Config.user_schema.rememberable?, do: params["remember"], else: false
    user_schema = Coherence.Config.user_schema
    login_field = Coherence.Config.login_field
    login_field_str = to_string login_field
    Logger.debug "#{inspect(login_field_str)}"
    login = params[login_field_str]
    password = params["password"]
    user = Coherence.Config.repo.one(from u in user_schema, where: field(u, ^login_field) == ^login)
    lockable? = user_schema.lockable?
    response = nil
    if user != nil and user_schema.checkpw(password, Map.get(user, Coherence.Config.password_hash)) do
      if Coherence.Schema.Confirmable.confirmed?(user) || Coherence.Schema.Confirmable.unconfirmed_access?(user) do
        unless lockable? and user_schema.locked?(user) do

          # opts = [id_key: Coherence.Config.schema_key]
          id_key = Coherence.Config.schema_key
          store = Coherence.CredentialStore.Session
          id = UUID.uuid1
          store.put_credentials({id, user, id_key})

          # This gives error - not relation - WTF!!!
          # {changeset, series, token} = Coherence.Rememberable.create_login(user)
          # Coherence.Config.repo.insert! changeset
          # save_login_cookie conn, user.id, series, token, Config.login_cookie, Config.rememberable_cookie_expire_hours * 60 * 60

          Logger.debug "#{inspect(user)}"

          # Coherence.Rememberable.gen_cookie(user.id_key, series, token)
          response = {:ok, %{"token" => id}}
          # put_session(conn, @session_key, id)

          # apply(Coherence.Config.auth_module, Coherence.Config.create_login, [conn, user, [id_key: Coherence.Config.schema_key]])
          # |> reset_failed_attempts(user, lockable?)
          # |> track_login(user, user_schema.trackable?)
          # |> save_rememberable(user, remember)
          # |> put_flash(:notice, "Signed in successfully.")
          # |> redirect_to(:session_create, params)
        else
          response = {:error, %{"errors" => %{"error" => "Too many failed login attempts. Account has been locked."}}}
          # conn
          # |> put_flash(:error, "Too many failed login attempts. Account has been locked.")
          # |> assign(:locked, true)
          # |> put_status(423)
          # |> render("new.html", [{login_field, ""}, remember: rememberable_enabled?])
        end
      else
        response = {:error, %{"errors" => %{"error" => "You must confirm your account before you can login."}}}
        # conn
        # |> put_flash(:error, "You must confirm your account before you can login.")
        # |> put_status(406)
        # |> render("new.html", [{login_field, login}, remember: rememberable_enabled?])
      end
    else
      response = {:error, %{"errors" => %{"error" => "Login failed"}}}
      # Increase failed login count

      # conn
      # |> failed_login(user, lockable?)
      # |> put_layout({Coherence.LayoutView, "app.html"})
      # |> put_view(Coherence.SessionView)
      # |> put_status(401)
      # |> render(:new, [{login_field, login}, remember: rememberable_enabled?])
    end


    # apply(Config.auth_module, Config.create_login, [conn, user, [id_key: Config.schema_key]])
    # |> track_login(user, Config.user_schema.trackable?)

    # response = case User.signin(params) do
    #   {:ok, user} ->
    #     {:ok, %{"token" => get_sl_token(user)}}
    #   {:error, error} ->
    #     {:error, %{"error" => error}}
    # end
    {:reply, response, socket}
  end

  # Auto-login by token
  def handle_in("verify_rememberable", params, socket) do
    Logger.info "Rememberable Callback"

    id = params["token"]
    Logger.debug "#{inspect(id)}"
    store = Coherence.CredentialStore.Session
    user = store.get_user_data({id, Coherence.Config.user_schema, Coherence.Config.schema_key})
    if user != nil do
      user = Map.drop(user, [:__meta__, :password_hash])
      Logger.debug "#{inspect(user)}"
    else
      Logger.debug "User not found"
    end
    case user do
      nil -> {:reply, {:error, %{"errors" => "Token not accepted"}}, socket}
      _user -> {:reply, {:ok, %{"user" => _user}}, socket}
    end
    # case conn.cookies[key] do
    #   nil -> {conn, nil}
    #   cookie ->
    #     case String.split cookie, " " do
    #       [id, series, token] ->
    #         case opts[:rememberable_callback] do
    #           nil ->
    #             Coherence.SessionController.remberable_callback(conn, id, series, token, opts)
    #           fun ->
    #             fun.(conn, id, series, token, opts)
    #         end
    #       _ -> {conn, nil}   # invalid cookie
    #     end
    # end
  end

  defp remberable_callback(id, series, token, opts) do
    repo = Coherence.Config.repo
    cred_store = Coherence.Authentication.Utils.get_credential_store
    validate_login(id, series, token)
    |> case do
      {:ok, rememberable} ->
        # Logger.debug "Valid login :ok"
        case repo.get(Config.user_schema, id) do
          nil -> {:error, :not_found}
          user ->
            gen_cookie(id, series, token)
            |> cred_store.delete_credentials
            {changeset, new_token} = Rememberable.update_login(rememberable)

            cred_store.put_credentials({gen_cookie(id, series, new_token), Config.user_schema, Config.schema_key})

            Config.repo.update! changeset
            conn = save_login_cookie(conn, id, series, new_token, opts[:login_key], opts[:cookie_expire])
            |> assign(:remembered, true)
            {conn, user}
        end
      {:error, :not_found} ->
        Logger.debug "No valid login found"
        {conn, nil}
      {:error, :invalid_token} ->
        # this is a case of potential fraud
        Logger.warn "Invalid token. Potential Fraud."

        conn
        |> delete_req_header(opts[:login_key])
        |> put_flash(:error, """
          You are using an invalid security token for this site! This security
          violation has been logged.
          """)
        |> redirect(to: logged_out_url(conn))
        |> halt
    end
  end

  defp render_detail(_field, {message, values}) do
    Enum.reduce(values, message, fn({k, v}, acc) ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end)
  end
  defp render_detail(field, "can't be blank" = message), do: "#{field} - #{message}"
  defp render_detail(_field, message), do: message

  defp get_sl_token(user) do
    ttl = {10, :seconds}
    {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :disposable, %{"ttl" => ttl})
    jwt
  end
end