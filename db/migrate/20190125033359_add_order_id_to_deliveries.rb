class AddOrderIdToDeliveries < ActiveRecord::Migration[5.1]
  def change
    add_column :deliveries, :order_id, :bigint
    add_index :deliveries, :order_id
  end
end
