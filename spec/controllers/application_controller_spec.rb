require 'spec_helper'

describe 'ApplicationController' do 

  describe 'destroy_session' do 
    it 'should remove the session user_id'
  end

  describe 'require_creator' do 
    it 'should redirect to the root url if the params user and current user do not match'
  end

  describe 'current user' do 
    it 'should return the correct user if the session user_id is set'
    it 'should return nil if session user_id is not set'
  end

  describe 'require_sign_in' do 
    it 'should redirect to the sign up path if the user is not signed in'
    it 'should let the user access the correct page when signed in'
  end
  
end