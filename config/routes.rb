Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :courts do
    resources :bookings
  end

  get 'bookings/mine', to: 'users#bookings_mine', as: 'my_bookings'
  get 'bookings/others', to: 'users#bookings_others', as: 'others_bookings'
  get 'user/courts', to: 'users#courts', as: 'user_courts'

  namespace :api do
    namespace :v1 do
      # Try to place courts here without routing errors
      mount_devise_token_auth_for 'User', at: 'auth', skip: [:password]
    end
  end

  root to: 'home#index'
end
