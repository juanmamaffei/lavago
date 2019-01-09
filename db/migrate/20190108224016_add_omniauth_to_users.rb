class AddOmniauthToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :token, :string
    add_column :users, :expires_at, :integer
    add_column :users, :expires, :boolean
  end
end
