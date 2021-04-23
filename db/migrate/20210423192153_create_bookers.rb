class CreateBookers < ActiveRecord::Migration[6.1]
  def change
    create_table :bookers do |t|
      t.references :user, null: false, foreign_key: true
      t.references :court, null: false, foreign_key: true
      t.datetime :date
      t.string :description

      t.timestamps
    end
  end
end
