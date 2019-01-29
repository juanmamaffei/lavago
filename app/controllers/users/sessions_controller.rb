class Users::SessionsController < Devise::SessionsController
    clear_respond_to 
    respond_to :json
     
    # respond_to :html, only: []
    # respond_to :xml, only: []
end