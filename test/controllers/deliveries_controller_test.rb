require 'test_helper'

class DeliveriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @delivery = deliveries(:one)
  end

  test "should get index" do
    get deliveries_url
    assert_response :success
  end

  test "should get new" do
    get new_delivery_url
    assert_response :success
  end

  test "should create delivery" do
    assert_difference('Delivery.count') do
      post deliveries_url, params: { delivery: { address: @delivery.address, address_details: @delivery.address_details, carrier_id: @delivery.carrier_id, city: @delivery.city, location: @delivery.location, name: @delivery.name, price: @delivery.price, status: @delivery.status, type: @delivery.type } }
    end

    assert_redirected_to delivery_url(Delivery.last)
  end

  test "should show delivery" do
    get delivery_url(@delivery)
    assert_response :success
  end

  test "should get edit" do
    get edit_delivery_url(@delivery)
    assert_response :success
  end

  test "should update delivery" do
    patch delivery_url(@delivery), params: { delivery: { address: @delivery.address, address_details: @delivery.address_details, carrier_id: @delivery.carrier_id, city: @delivery.city, location: @delivery.location, name: @delivery.name, price: @delivery.price, status: @delivery.status, type: @delivery.type } }
    assert_redirected_to delivery_url(@delivery)
  end

  test "should destroy delivery" do
    assert_difference('Delivery.count', -1) do
      delete delivery_url(@delivery)
    end

    assert_redirected_to deliveries_url
  end
end
