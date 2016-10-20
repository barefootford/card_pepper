## Manifesto

The aim of Card Pepper is to bring the power of collaboration and multiple iterations to flashcard decks. Most flashcard decks are created with only one user in mind. If decks are instead built with the intention of sharing and collaborating with others, flash cards can be used like a specialized mentor that intimately knows the material well instead of as just notes. Not everyone is going to think this is a good idea, but that's OK. There are lots of alternatives.

## Requirements

* Ruby 2.2.0
* Rails 4.1.4
* Postgres

## Install
Card Pepper relies on Ruby on Rails (4.1.4), Ruby (2.2.0) and Postgres.

Download or clone the repo. From inside the repo:

Set ruby version (if using rbenv):
```
$ rbenv local 2.2.0
```

Install gem bundle and run database migrations:
```
$ bundle install
$ bundle exec rake db:migrate
```

Start the Rails Server:
```
$ bundle exec rails server
```

Pick an issue and start hacking. Questions? Leave an @message to @barefootford or @natomato





