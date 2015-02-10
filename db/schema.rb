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

ActiveRecord::Schema.define(version: 20150210224250) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "galleries", force: true do |t|
    t.integer  "owner_id",    null: false
    t.string   "title",       null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "galleries", ["owner_id"], name: "index_galleries_on_owner_id", using: :btree

  create_table "pano_items", force: true do |t|
    t.integer  "gallery_id",                          null: false
    t.string   "title",                               null: false
    t.decimal  "lat",         precision: 9, scale: 6, null: false
    t.decimal  "lng",         precision: 9, scale: 6, null: false
    t.decimal  "heading",     precision: 6, scale: 3, null: false
    t.decimal  "pitch",       precision: 6, scale: 3, null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "votes_count"
  end

  add_index "pano_items", ["gallery_id"], name: "index_pano_items_on_gallery_id", using: :btree

  create_table "panoramas", force: true do |t|
    t.decimal  "lat",        precision: 9, scale: 6, null: false
    t.decimal  "lng",        precision: 9, scale: 6, null: false
    t.decimal  "heading",    precision: 6, scale: 3, null: false
    t.decimal  "pitch",      precision: 6, scale: 3, null: false
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

  create_table "taggings", force: true do |t|
    t.integer "pano_item_id", null: false
    t.integer "tag_id",       null: false
  end

  add_index "taggings", ["pano_item_id"], name: "index_taggings_on_pano_item_id", using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree

  create_table "tags", force: true do |t|
    t.string   "label",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

  create_table "votes", force: true do |t|
    t.integer  "pano_item_id", null: false
    t.integer  "voter_id",     null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "votes", ["pano_item_id", "voter_id"], name: "index_votes_on_pano_item_id_and_voter_id", unique: true, using: :btree
  add_index "votes", ["pano_item_id"], name: "index_votes_on_pano_item_id", using: :btree
  add_index "votes", ["voter_id"], name: "index_votes_on_voter_id", using: :btree

end
