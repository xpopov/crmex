defmodule CrmEx.Repo.Migrations.CreateTodo do
  use Ecto.Migration

  def change do
    create table(:todos) do
      add :title, :string
      add :description, :string

      timestamps()
    end

  end
end
