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

ActiveRecord::Schema.define(version: 20190108131447) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "laundries", force: :cascade do |t|
    t.string "name"
    t.integer "score"
    t.string "address"
    t.string "address_details"
    t.string "city"
    t.string "logo"
    t.string "cover"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "drop_status"
    t.json "drop_data"
    t.integer "drop_carrier"
    t.integer "wash_status"
    t.json "wash_data"
    t.integer "delivery_carrier"
    t.integer "suscription"
    t.integer "calification_score"
    t.string "calification_comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.integer "price"
    t.bigint "laundry_id"
    t.text "description"
    t.integer "product_type"
    t.string "picture"
    t.integer "score"
    t.boolean "only_for_suscriptions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["laundry_id"], name: "index_products_on_laundry_id"
  end

  create_table "suscriptions", force: :cascade do |t|
    t.bigint "user_id"
    t.json "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_suscriptions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "uid"
    t.string "provider"
    t.string "name"
    t.string "last_name"
    t.string "address"
    t.string "city"
    t.integer "dni"
    t.string "address_details"
    t.integer "score"
    t.integer "permissions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "orders", "users"
  add_foreign_key "products", "laundries"
  add_foreign_key "suscriptions", "users"
end
