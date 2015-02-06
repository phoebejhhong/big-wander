class XHRConstraint
  def matches?(request)
    !request.xhr? && !(request.url =~ /\.json$/ && ::Rails.env == 'development')
  end
end

Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :panoramas, only: [:show, :index]
    resources :users, only: [:show]
    resources :galleries, only: [:index, :create, :destroy, :show, :update]
    resources :pano_items, only: [:create, :destroy, :update]
    resources :tags, only: [:create, :destroy]
<<<<<<< HEAD
    resources :searches, only: [:show]
=======
>>>>>>> 9ee3dd4e72eb94baedf5d74fd5b9a98e4db316d7
  end

  get '(*url)' => 'static_pages#root', :constraints => XHRConstraint.new
end
