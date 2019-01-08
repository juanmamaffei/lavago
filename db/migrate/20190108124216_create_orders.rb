class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.references :user, foreign_key: true
      t.integer :drop_status
      t.json :drop_data
      t.integer :drop_carrier
      t.integer :wash_status
      t.json :wash_data
      t.integer :delivery_carrier
      t.integer :suscription
      t.integer :calification_score
      t.string :calification_comment

      t.timestamps
    end
  end
end
