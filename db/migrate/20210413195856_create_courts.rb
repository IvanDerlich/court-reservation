class CreateCourts < ActiveRecord::Migration[6.1]
  def change
    create_table :courts do |t|
      t.string :name, :null => false, unique: true
      t.string :address, :null => false
      t.string :description
      t.references :administrator, null: false, foreign_key: { to_table: 'users'}

      t.timestamps      
    end
    add_index :courts, :name, unique: true
  end
end
