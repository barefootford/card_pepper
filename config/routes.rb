Pepper::Application.routes.draw do

  root 'decks#index'

  get 'sign_in' => 'sessions#new'
  get 'sign_up' => 'users#new'
  get 'users/:id/delete' => 'users#delete', as: 'user_delete'
  get 'users/:id/edit_password' => 'users#edit_password', as: 'edit_password'

  get 'session/destroy' => 'sessions#destroy'

  patch 'users/:id/edit_password' => 'users#update_password', as: 'update_password'

  resources :users
  resource :session

  get 'dashboard' => 'dashboards#show', as: 'dashboard'

  resources :decks do 
    resources :cards, only: [ :create, :destroy ]
    resources :card_suggestions, only: [ :create, :update ]
  end
end