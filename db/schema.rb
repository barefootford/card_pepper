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

ActiveRecord::Schema.define(version: 20160715155317) do

  create_table "card_edits", force: true do |t|
    t.integer  "user_id"
    t.integer  "card_id"
    t.string   "question"
    t.string   "answer"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "reason"
    t.text     "editor_response"
    t.integer  "status",          default: 0
  end

  add_index "card_edits", ["card_id"], name: "index_card_edits_on_card_id"

  create_table "card_suggestions", force: true do |t|
    t.string   "question"
    t.string   "answer"
    t.string   "purpose"
    t.integer  "user_id"
    t.integer  "deck_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "status",     default: 0
  end

  add_index "card_suggestions", ["deck_id"], name: "index_card_suggestions_on_deck_id"
  add_index "card_suggestions", ["user_id"], name: "index_card_suggestions_on_user_id"

  create_table "cards", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "deck_id"
    t.string   "question"
    t.string   "answer"
    t.integer  "user_id"
    t.integer  "status",     default: 0
  end

  add_index "cards", ["deck_id"], name: "index_cards_on_deck_id"
  add_index "cards", ["user_id"], name: "index_cards_on_user_id"

  create_table "deck_subscriptions", force: true do |t|
    t.integer  "deck_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "status",     default: 0
  end

  add_index "deck_subscriptions", ["deck_id"], name: "index_deck_subscriptions_on_deck_id"
  add_index "deck_subscriptions", ["user_id"], name: "index_deck_subscriptions_on_user_id"

  create_table "decks", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
    t.integer  "editor"
    t.text     "instructions"
    t.integer  "user_id"
  end

  add_index "decks", ["user_id"], name: "index_decks_on_user_id"

  create_table "study_sessions", force: true do |t|
    t.integer  "deck_subscription_id"
    t.integer  "deck_id"
    t.integer  "user_id"
    t.integer  "new_card_goal",        default: 5
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "study_sessions", ["deck_id"], name: "index_study_sessions_on_deck_id"
  add_index "study_sessions", ["deck_subscription_id"], name: "index_study_sessions_on_deck_subscription_id"
  add_index "study_sessions", ["user_id"], name: "index_study_sessions_on_user_id"

  create_table "to_dos", force: true do |t|
    t.integer  "study_session_id"
    t.integer  "user_card_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "to_dos", ["study_session_id"], name: "index_to_dos_on_study_session_id"
  add_index "to_dos", ["user_card_id"], name: "index_to_dos_on_user_card_id"

  create_table "user_cards", force: true do |t|
    t.integer  "deck_subscription_id"
    t.integer  "card_id"
    t.datetime "last_view"
    t.datetime "first_view"
    t.float    "efficiency"
    t.integer  "view_count"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "next_view"
  end

  add_index "user_cards", ["card_id"], name: "index_user_cards_on_card_id"
  add_index "user_cards", ["deck_subscription_id"], name: "index_user_cards_on_deck_subscription_id"

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "last_name"
    t.string   "website"
    t.integer  "beta_status",     default: 0
  end

  create_table "versions", force: true do |t|
    t.integer  "card_id"
    t.string   "question"
    t.string   "answer"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  add_index "versions", ["card_id"], name: "index_versions_on_card_id"
  add_index "versions", ["user_id"], name: "index_versions_on_user_id"

end
