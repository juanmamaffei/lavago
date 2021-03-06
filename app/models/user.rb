class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  devise :omniauthable, :omniauth_providers => [:google_oauth2, :facebook]
  
  #devise :omniauthable, omniauth_providers: %i[facebook]
  
  def self.from_omniauth(auth)
    # Either create a User record or update it based on the provider (Google) and the UID   
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
	    user.password = Devise.friendly_token[0,20]
      user.token = auth.credentials.token
      user.expires = auth.credentials.expires
      user.expires_at = auth.credentials.expires_at
      #user.refresh_token = auth.credentials.refresh_token
    end
  end
  #Relaciones agregadas
  
  has_many :suscriptions
  has_many :orders

end
