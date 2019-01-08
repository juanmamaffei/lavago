json.extract! order, :id, :user_id, :drop_status, :drop_data, :drop_carrier, :wash_status, :wash_data, :delivery_carrier, :suscription, :calification_score, :calification_comment, :created_at, :updated_at
json.url order_url(order, format: :json)
