require 'test_helper'

class CarriersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @carrier = carriers(:one)
  end

  test "should get index" do
    get carriers_url
    assert_response :success
  end

  test "should get new" do
    get new_carrier_url
    assert_response :success
  end

  test "should create carrier" do
    assert_difference('Carrier.count') do
      post carriers_url, params: { carrier: { delivery_excluded: @carrier.delivery_excluded, delivery_zone: @carrier.delivery_zone, description: @carrier.description, exclusive: @carrier.exclusive, name: @carrier.name } }
    end

    assert_redirected_to carrier_url(Carrier.last)
  end

  test "should show carrier" do
    get carrier_url(@carrier)
    assert_response :success
  end

  test "should get edit" do
    get edit_carrier_url(@carrier)
    assert_response :success
  end

  test "should update carrier" do
    patch carrier_url(@carrier), params: { carrier: { delivery_excluded: @carrier.delivery_excluded, delivery_zone: @carrier.delivery_zone, description: @carrier.description, exclusive: @carrier.exclusive, name: @carrier.name } }
    assert_redirected_to carrier_url(@carrier)
  end

  test "should destroy carrier" do
    assert_difference('Carrier.count', -1) do
      delete carrier_url(@carrier)
    end

    assert_redirected_to carriers_url
  end
end
