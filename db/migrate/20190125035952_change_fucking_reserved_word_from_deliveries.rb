class ChangeFuckingReservedWordFromDeliveries < ActiveRecord::Migration[5.1]
  def change
    remove_column :deliveries, :type
    add_column :deliveries, :delivery_type, :integer
  end
end
