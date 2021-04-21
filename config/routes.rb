Rails.application.routes.draw do
   
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
   

  resources :courts
  
  namespace :api do
    namespace :v1 do
      # Try to place courts here without routing errors
      mount_devise_token_auth_for 'User', at: 'auth', skip: [:password]   
    end
  end  

  root to:"home#index"
end
