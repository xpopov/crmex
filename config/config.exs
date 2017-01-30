# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :crmex,
  ecto_repos: [CrmEx.Repo]

# Configures the endpoint
config :crmex, CrmEx.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "2vyKwOaXpQ9a5yy9GgQD94cibjvXZjufKZV7r8aHe7fm/phVArFOUhaoh/TJ11he",
  render_errors: [view: CrmEx.ErrorView, accepts: ~w(html json)],
  pubsub: [name: CrmEx.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# %% Coherence Configuration %%   Don't remove this line
config :coherence,
  user_schema: CrmEx.User,
  repo: CrmEx.Repo,
  module: CrmEx,
  logged_out_url: "/",
  email_from_name: "Your Name",
  email_from_email: "yourname@example.com",
  opts: [:authenticatable, :recoverable, :lockable, :trackable, :unlockable_with_token, :invitable, :registerable]

config :coherence, CrmEx.Coherence.Mailer,
  adapter: Swoosh.Adapters.Sendgrid,
  api_key: "your api key here"
# %% End Coherence Configuration %%
