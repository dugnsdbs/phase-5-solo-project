Rails.application.routes.draw do
  

  resources :users

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#login"
  delete "/logout", to: "sessions#destroy"



  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
