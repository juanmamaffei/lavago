class ChangeTypeToLaundry < ActiveRecord::Migration[5.1]
  def change
    change_table :products do |t|
      t.rename :type, :product_type
  
    end
  end
end