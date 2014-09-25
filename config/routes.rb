Pepper::Application.routes.draw do

  root 'decks#index'

  get 'dashboards/example' => 'dashboards#example'
  
  get 'sign_in' => 'sessions#new'
  get 'sign_up' => 'users#new'
  get 'users/:id/delete' => 'users#delete', as: 'user_delete'
  get 'users/:id/edit_password' => 'users#edit_password', as: 'edit_password'

  get 'session/destroy' => 'sessions#destroy'  

  patch 'users/:id/edit_password' => 'users#update_password', as: 'update_password'
  
  resources :users
  resource :session

  resources :dashboards

  resources :decks do 
    resources :chapters
  end

  resources :chapters do 
    resources :cards
    resources :card_suggestions
  end

  patch 'decks/:deck_id/card_suggestions/:card_suggestion_id/approve' => 'dashboards#approve', as: 'card_approve'
  
end