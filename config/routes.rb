Pepper::Application.routes.draw do

  root 'dashboards#show'
  #static pages
  get 'beta' => 'pages#beta', as: 'beta'
  get 'requestafeature' => 'pages#request_feature'
  get 'reportabug' => 'pages#report_bug'

  get 'anki-import' => 'decks#anki_import', as: 'anki-import'
  get 'dashboard' => 'dashboards#show', as: 'dashboard'

  resources :users
  get 'users/:id/delete' => 'users#delete', as: 'user_delete'
  get 'users/:id/edit_password' => 'users#edit_password', as: 'edit_password'
  patch 'users/:id/edit_password' => 'users#update_password', as: 'update_password'

  resource :session
  get 'session/destroy' => 'sessions#destroy'
  get 'sign_in' => 'sessions#new'
  get 'sign_up' => 'users#new'

  resources :cards, only: [ :create, :destroy, :update ]

  get 'decks/:id/destroy' => 'decks#destroy'
  resources :decks do
    # let's try and remove this after adding in the card resource routes
    resources :cards, only: [ :create, :destroy, :update ]
    resources :card_suggestions, only: [ :create, :update ]
  end

  resources :deck_subscriptions, only: [:create, :edit, :show, :update] do
    resources :study_sessions, only: [ :create, :update, :show ]
  end
end