# CRM using Phoenix/Elixir and React

This is very basic CRM built on Phoenix framework (backend) and React (front-end).
It's WIP.


Features:
- Authentication via channels


Installation:

  * Install PostgreSQL. Make sure that username/password match the ones in dev.exs (postgres/postgres)
  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `npm install`

Running

  * Start Phoenix endpoint with `mix phoenix.server` (this will start also React HMR at 8080 port in development env)

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

