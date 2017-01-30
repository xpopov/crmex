defmodule CrmEx.Router do
  use CrmEx.Web, :router
  use Coherence.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Coherence.Authentication.Session
  end

  pipeline :protected do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Coherence.Authentication.Session, protected: true
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/" do                   
    pipe_through :browser        
    coherence_routes :public
  end                            
                                
  scope "/" do                   
    pipe_through :protected      
    coherence_routes :protected  
  end                            

  scope "/", CrmEx do
    pipe_through :browser # Use the default browser stack
    get "/*page", PageController, :index
    # Add public routes below    
    resources "/todos", TodoController
  end

  scope "/", CrmEx do
    pipe_through :protected
    # Add protected routes below
  end


  # Other scopes may use custom stacks.
  # scope "/api", CrmEx do
  #   pipe_through :api
  # end
end
