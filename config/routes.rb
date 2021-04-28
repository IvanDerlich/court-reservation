Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :courts do
    resources :bookings
  end

  get 'users/:id/bookings', to: 'users#bookings', as: 'user_bookings'
  get 'users/:id/courts', to: 'users#courts', as: 'user_courts'
  get 'courts/:id/bookings', to: 'courts#bookings', as: 'courts_bookings'

  namespace :api do
    namespace :v1 do
      # Try to place courts here without routing errors
      mount_devise_token_auth_for 'User', at: 'auth', skip: [:password]
    end
  end

  root to: 'home#index'
end
