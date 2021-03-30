Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :todos do
    resources :items
  end
  namespace :v1 do
    resources :contacts
    resources :sessions, only: [:create, :destroy]
  end
end
