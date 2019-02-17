class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.references :laundry, foreign_key: true
      t.references :carrier, foreign_key: true
      t.date :day
      t.string :hour
      t.integer :available
      t.integer :remaining
      t.string :delivery_type

      t.timestamps
    end
  end
end
