json.extract! product, :id, :name, :price, :laundry_id, :description, :product_type, :picture, :score, :only_for_suscriptions, :created_at, :updated_at
json.url laundry_product_url(:laundry_id, product.id, format: :json)
