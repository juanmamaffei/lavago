class ChangeTablesForAddingAdministrators < ActiveRecord::Migration[5.1]
  def change
    #Administradores de LAVANDERÍAS y CENTROS DE LOGÍSTICA
    add_column :laundries, :admin_user, :bigint
    add_column :carriers, :admin_user, :bigint

  end
end
