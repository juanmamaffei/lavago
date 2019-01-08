class Suscription < ApplicationRecord
  belongs_to :user

  #Relaciones agregadas

  has_many :orders
end
