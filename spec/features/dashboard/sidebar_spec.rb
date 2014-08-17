require 'spec_helper'

describe 'The Sidebar' do 

  describe 'While signed in' do
    it 'should list decks'
    it 'should list the current user name'
    it 'should have a link to edit the profile'
    it 'should have a link to sign out'
    it 'should have a link to edit password'
  end

  describe 'While signed out' do 
    it 'should not list any user type links'
    it 'should have a link to sign up'
  end
end