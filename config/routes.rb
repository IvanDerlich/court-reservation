Rails.application.routes.draw do
   
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to:"home#index"
  resources :todos do
    resources :items
  end  
  namespace :api do
    namespace :v1 do
      resources :contacts  
      mount_devise_token_auth_for 'User', at: 'auth', skip: [:password]   
    end
  end  
end
