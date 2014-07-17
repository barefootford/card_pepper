Pepper::Application.routes.draw do

  root 'decks#index'
  
  get 'sign_in' => 'sessions#new'
  get 'sign_up' => 'users#new'
  get 'users/:id/delete' => 'users#delete', as: 'user_delete'

  resources :users

  resources :decks do 
    resources :chapters
  end

  resources :chapters do 
    resources :cards
  end

  resource :session
  resources :decks
end