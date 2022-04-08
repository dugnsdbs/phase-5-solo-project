Rails.application.routes.draw do
  resources :weathers
  resources :activities
  resources :lists
  resources :users

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#login"
  delete "/logout", to: "sessions#destroy"

  post "/createActivity", to: "activities#create"

  post "/createList", to: "lists#create"
  delete "/deleteActivity", to: "activities#destroy"


  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
