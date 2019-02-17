json.extract! stock, :id, :laundry_id, :carrier_id, :init_hour, :ending_hour, :available, :remaining, :delivery_type, :created_at, :updated_at
json.url stock_url(stock, format: :json)