class Users::RegistrationsController < Devise::RegistrationsController
    clear_respond_to  
    respond_to :json
    
    # respond_to :html, only: []
    # respond_to :xml, only: []
end