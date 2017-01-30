defmodule CrmEx.TodoControllerTest do
  use CrmEx.ConnCase

  alias CrmEx.Todo
  @valid_attrs %{description: "some content", title: "some content"}
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, todo_path(conn, :index)
    assert html_response(conn, 200) =~ "Listing todos"
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, todo_path(conn, :new)
    assert html_response(conn, 200) =~ "New todo"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, todo_path(conn, :create), todo: @valid_attrs
    assert redirected_to(conn) == todo_path(conn, :index)
    assert Repo.get_by(Todo, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, todo_path(conn, :create), todo: @invalid_attrs
    assert html_response(conn, 200) =~ "New todo"
  end

  test "shows chosen resource", %{conn: conn} do
    todo = Repo.insert! %Todo{}
    conn = get conn, todo_path(conn, :show, todo)
    assert html_response(conn, 200) =~ "Show todo"
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, todo_path(conn, :show, -1)
    end
  end

  test "renders form for editing chosen resource", %{conn: conn} do
    todo = Repo.insert! %Todo{}
    conn = get conn, todo_path(conn, :edit, todo)
    assert html_response(conn, 200) =~ "Edit todo"
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    todo = Repo.insert! %Todo{}
    conn = put conn, todo_path(conn, :update, todo), todo: @valid_attrs
    assert redirected_to(conn) == todo_path(conn, :show, todo)
    assert Repo.get_by(Todo, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    todo = Repo.insert! %Todo{}
    conn = put conn, todo_path(conn, :update, todo), todo: @invalid_attrs
    assert html_response(conn, 200) =~ "Edit todo"
  end

  test "deletes chosen resource", %{conn: conn} do
    todo = Repo.insert! %Todo{}
    conn = delete conn, todo_path(conn, :delete, todo)
    assert redirected_to(conn) == todo_path(conn, :index)
    refute Repo.get(Todo, todo.id)
  end
end
