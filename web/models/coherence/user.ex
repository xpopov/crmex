defmodule CrmEx.User do
  require Logger

  use CrmEx.Web, :model
  use Coherence.Schema

  alias CrmEx.Repo

  schema "users" do
    field :name, :string
    field :email, :string
    coherence_schema

    timestamps
  end

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:name, :email] ++ coherence_fields)
    |> validate_required([:name, :email])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email, name: "users_email_index")
    |> validate_coherence(params)
  end

  # For brief stuff, just use Repo here (in model)
  def signup(params) do
    # user_schema = Config.user_schema
  #   case Config.repo.insert(cs) do
  #     {:ok, user} ->
  #       conn
  #       |> send_confirmation(user, user_schema)
  #       |> redirect_or_login(user, params, Config.allow_unconfirmed_access_for)
  #     {:error, changeset} ->
  #       conn
  #       |> render("new.html", changeset: changeset)
  #   end
  end

end
