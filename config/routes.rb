Pepper::Application.routes.draw do

  resources :study_sessions

  root 'decks#index'
  get 'beta' => 'pages#beta', as: 'beta'
  get 'anki-import' => 'decks#anki_import', as: 'anki-import'
  get 'dashboard' => 'dashboards#show', as: 'dashboard'

  resources :users do
    resources :deck_subscriptions, only: [:create, :edit, :show, :update]
  end
  get 'users/:id/delete' => 'users#delete', as: 'user_delete'
  get 'users/:id/edit_password' => 'users#edit_password', as: 'edit_password'
  patch 'users/:id/edit_password' => 'users#update_password', as: 'update_password'

  resource :session
  get 'session/destroy' => 'sessions#destroy'
  get 'sign_in' => 'sessions#new'
  get 'sign_up' => 'users#new'

  resources :decks do
    resources :cards, only: [ :create, :destroy, :update ]
    resources :card_suggestions, only: [ :create, :update ]
  end
end