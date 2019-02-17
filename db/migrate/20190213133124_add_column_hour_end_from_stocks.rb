class AddColumnHourEndFromStocks < ActiveRecord::Migration[5.2]
  def change
    remove_column :stocks, :hour

    add_column :stocks, :init_hour, :datetime
    add_column :stocks, :ending_hour,  :datetime
  end
end
