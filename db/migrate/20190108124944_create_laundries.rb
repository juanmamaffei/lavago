class CreateLaundries < ActiveRecord::Migration[5.1]
  def change
    create_table :laundries do |t|
      t.string :name
      t.integer :score
      t.string :address
      t.string :address_details
      t.string :city
      t.string :logo
      t.string :cover
      t.string :location

      t.timestamps
    end
  end
end
