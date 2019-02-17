class Stock < ApplicationRecord
  belongs_to :laundry
  belongs_to :carrier
end
