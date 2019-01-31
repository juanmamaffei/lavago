class ProfilesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_user

    # PATCH/PUT /profile.json
	def update
        respond_to do |format|
            if @user.update(user_params)
                format.json {render json: @user}
            else
                format.json { render json: @user.errors}
            end
        end
    end

	private
		def set_user
			@user = User.find(current_user.id)			
		end

		def user_params
			params.require(:user).permit(:name, :last_name, :address, :address_details, :city, :dni)
		end

end