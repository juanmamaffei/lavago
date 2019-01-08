class CreateDeliveries < ActiveRecord::Migration[5.1]
  def change
    create_table :deliveries do |t|
      t.string :name
      t.references :carrier, foreign_key: true
      t.integer :type
      t.integer :price
      t.integer :status
      t.string :address
      t.string :address_details
      t.string :city
      t.json :location

      t.timestamps
    end
  end
end
