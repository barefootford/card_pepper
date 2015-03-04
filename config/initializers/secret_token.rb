# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.

if    ENV['RAILS_ENV'] == 'test' || ENV['RAILS_ENV'] == 'development'
  Pepper::Application.config.secret_key_base = 'e578d0aee1e553160effb8931a735741e3b2fce25f67a143f8409fa8b41e0cd7ca1c5ee964982ea422dcec6943e164babbd61496c3ddb1dfaa3514e431b471df'
elsif ENV['RAILS_ENV'] == 'production'
  Pepper::Application.config.secret_key_base = ENV["SECRET_KEY_BASE"]
end