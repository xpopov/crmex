# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     CrmEx.Repo.insert!(%CrmEx.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

CrmEx.Repo.delete_all CrmEx.User

CrmEx.User.changeset(%CrmEx.User{}, %{name: "Test User", email: "testuser@example.com", password: "secret", password_confirmation: "secret"})
|> CrmEx.Repo.insert!
