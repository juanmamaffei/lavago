class HomeController < ApplicationController
  def index
    @user = User.find(current_user.id)
    
    # Si alguno de los campos requeridos está vacío, pedir que complete el perfil.
    if @user.name == nil || @user.last_name == nil || @user.address == nil || @user.address_details == nil || @user.city == nil 
      redirect_to user_path(current_user)
    end
  end

  def login

  end
end
