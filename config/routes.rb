Pepper::Application.routes.draw do

  root 'decks#index'

  get 'beta' => 'pages#beta', as: 'beta'

  #SESSIONS
  get 'sign_in' => 'sessions#new'
  get 'sign_up' => 'users#new'
  

  # Get these outta here newb. 
  get 'users/:id/delete' => 'users#delete', as: 'user_delete'
  get 'users/:id/edit_password' => 'users#edit_password', as: 'edit_password'

  get 'session/destroy' => 'sessions#destroy'

  patch 'users/:id/edit_password' => 'users#update_password', as: 'update_password'

  resources :users
  resource :session

  get 'dashboard' => 'dashboards#show', as: 'dashboard'

  resources :decks do 
    resources :cards, only: [ :create, :destroy, :update ]
    resources :card_suggestions, only: [ :create, :update ]
  end
end