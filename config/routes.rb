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
    resources :pano_items, only: [:index, :create, :destroy, :update]
    resources :tags, only: [:create, :destroy]
  end

  get '(*url)' => 'static_pages#root', :constraints => XHRConstraint.new
end
