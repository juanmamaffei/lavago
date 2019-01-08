class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :name
      t.integer :price
      t.references :laundry, foreign_key: true
      t.text :description
      t.integer :type
      t.string :picture
      t.integer :score
      t.boolean :only_for_suscriptions

      t.timestamps
    end
  end
end
