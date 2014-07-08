Pepper::Application.routes.draw do

  root 'decks#index'
  
  get 'sign_in' => 'sessions#new'
  get 'sign_up' => 'users#new'
  
  resources :users

  resources :decks do 
    resources :chapters
  end

  resources :chapters

  resource :session
  resources :decks
end