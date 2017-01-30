defmodule CrmEx.PageController do
  use CrmEx.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
