Rails.application.routes.draw do
  
  resources :carriers
  resources :suscriptions
  resources :laundries do
    resources :products
  end
  resources :orders do
    resources :deliveries
  end
  
  # get 'home/index'

  resources :profiles, as: :users, only: [:update, :show]
  

  devise_for :users, :controllers => {
    omniauth_callbacks: "users/omniauth_callbacks",
    sessions: 'users/sessions',
    registrations: 'users/registrations',
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  

  authenticated :user do
    root "home#index"
  end
  root "home#login"
end
