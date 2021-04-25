class CreateBookers < ActiveRecord::Migration[6.1]
  def change
    create_table :bookings do |t|      
      t.references :booker, null: false, foreign_key: { to_table: 'users'}
      t.references :court, null: false, foreign_key: true
      t.datetime :date, null: false
      t.string :description

      t.timestamps
    end
    add_index :bookings, [:court, :date], unique: true
  end
end
