class ChangeColumnLocationFromLaundries < ActiveRecord::Migration[5.2]
  def change
    remove_column :laundries, :location
    add_column :laundries, :coverage_area, :json
  end
end
