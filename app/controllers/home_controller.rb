class HomeController < ApplicationController
  def index
    @user = User.find(current_user.id)
    
    @incomplete_profile = false
    # Si alguno de los campos requeridos está vacío, pedir que complete el perfil.
    if @user.name == nil || @user.last_name == nil || @user.address == nil || @user.address_details == nil || @user.city == nil 
      @incomplete_profile = true

    end
  end

  def login

  end
end
