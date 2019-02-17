class ModifySomeFields < ActiveRecord::Migration[5.2]
  def change
    remove_column :stocks, :day
    add_column :products, :stock, :integer
    add_column :products, :delivery_period, :integer
  end
end
