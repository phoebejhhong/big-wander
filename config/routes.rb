Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :panoramas, only: [:show, :index]
    resources :users, only: [:show]
    resources :galleries, only: [:create, :destroy, :show, :update]
    resources :pano_items, only: [:create, :destroy, :update]
  end
end
