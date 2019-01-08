class CreateSuscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :suscriptions do |t|
      t.references :user, foreign_key: true
      t.json :details

      t.timestamps
    end
  end
end
