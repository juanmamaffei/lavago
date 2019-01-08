json.extract! delivery, :id, :name, :carrier_id, :type, :price, :status, :address, :address_details, :city, :location, :created_at, :updated_at
json.url delivery_url(delivery, format: :json)
