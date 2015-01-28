# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150121013546) do

  create_table "card_suggestions", force: true do |t|
    t.string   "question"
    t.string   "answer"
    t.string   "purpose"
    t.integer  "user_id"
    t.integer  "deck_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "approved",   default: false
  end

  add_index "card_suggestions", ["deck_id"], name: "index_card_suggestions_on_deck_id"
  add_index "card_suggestions", ["user_id"], name: "index_card_suggestions_on_user_id"

  create_table "cards", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "deck_id"
    t.string   "question"
    t.string   "answer"
  end

  add_index "cards", ["deck_id"], name: "index_cards_on_deck_id"

  create_table "decks", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
    t.integer  "editor"
    t.text     "instructions"
    t.integer  "user_id"
  end

  add_index "decks", ["user_id"], name: "index_decks_on_user_id"

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "last_name"
    t.string   "website"
  end

end
