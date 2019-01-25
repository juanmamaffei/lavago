class Order < ApplicationRecord
  belongs_to :user

  # Relaciones agregadas
  has_many :products
  # belongs_to :suscriptions
  has_one :laundry
  has_many :carriers

end
