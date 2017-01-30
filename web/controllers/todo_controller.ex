defmodule CrmEx.TodoController do
  use CrmEx.Web, :controller

  alias CrmEx.Todo

  def index(conn, _params) do
    todos = Repo.all(Todo)
    render(conn, "index.html", todos: todos)
  end

  def new(conn, _params) do
    changeset = Todo.changeset(%Todo{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"todo" => todo_params}) do
    changeset = Todo.changeset(%Todo{}, todo_params)

    case Repo.insert(changeset) do
      {:ok, _todo} ->
        conn
        |> put_flash(:info, "Todo created successfully.")
        |> redirect(to: todo_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    todo = Repo.get!(Todo, id)
    render(conn, "show.html", todo: todo)
  end

  def edit(conn, %{"id" => id}) do
    todo = Repo.get!(Todo, id)
    changeset = Todo.changeset(todo)
    render(conn, "edit.html", todo: todo, changeset: changeset)
  end

  def update(conn, %{"id" => id, "todo" => todo_params}) do
    todo = Repo.get!(Todo, id)
    changeset = Todo.changeset(todo, todo_params)

    case Repo.update(changeset) do
      {:ok, todo} ->
        conn
        |> put_flash(:info, "Todo updated successfully.")
        |> redirect(to: todo_path(conn, :show, todo))
      {:error, changeset} ->
        render(conn, "edit.html", todo: todo, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    todo = Repo.get!(Todo, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(todo)

    conn
    |> put_flash(:info, "Todo deleted successfully.")
    |> redirect(to: todo_path(conn, :index))
  end
end
