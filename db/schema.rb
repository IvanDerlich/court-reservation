# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_210_423_192_153) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'bookings', force: :cascade do |t|
    t.bigint 'booker_id', null: false
    t.bigint 'court_id', null: false
    t.datetime 'date', null: false
    t.string 'description'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['booker_id'], name: 'index_bookings_on_booker_id'
    t.index ['court_id'], name: 'index_bookings_on_court_id'
  end

  create_table 'courts', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'address', null: false
    t.string 'description'
    t.bigint 'administrator_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['administrator_id'], name: 'index_courts_on_administrator_id'
    t.index ['name'], name: 'index_courts_on_name', unique: true
  end

  create_table 'users', force: :cascade do |t|
    t.string 'provider', default: 'email', null: false
    t.string 'uid', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.datetime 'remember_created_at'
    t.string 'first_name'
    t.string 'last_name'
    t.string 'email'
    t.json 'tokens'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index %w[uid provider], name: 'index_users_on_uid_and_provider', unique: true
  end

  add_foreign_key 'bookings', 'courts'
  add_foreign_key 'bookings', 'users', column: 'booker_id'
  add_foreign_key 'courts', 'users', column: 'administrator_id'
end
