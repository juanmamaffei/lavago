class CreateCarriers < ActiveRecord::Migration[5.1]
  def change
    create_table :carriers do |t|
      t.json :delivery_zone
      t.json :delivery_excluded
      t.integer :exclusive, default: 0
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
