require 'test_helper'

class OrdersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @order = orders(:one)
  end

  test "should get index" do
    get orders_url
    assert_response :success
  end

  test "should get new" do
    get new_order_url
    assert_response :success
  end

  test "should create order" do
    assert_difference('Order.count') do
      post orders_url, params: { order: { calification_comment: @order.calification_comment, calification_score: @order.calification_score, delivery_carrier: @order.delivery_carrier, drop_carrier: @order.drop_carrier, drop_data: @order.drop_data, drop_status: @order.drop_status, suscription: @order.suscription, user_id: @order.user_id, wash_data: @order.wash_data, wash_status: @order.wash_status } }
    end

    assert_redirected_to order_url(Order.last)
  end

  test "should show order" do
    get order_url(@order)
    assert_response :success
  end

  test "should get edit" do
    get edit_order_url(@order)
    assert_response :success
  end

  test "should update order" do
    patch order_url(@order), params: { order: { calification_comment: @order.calification_comment, calification_score: @order.calification_score, delivery_carrier: @order.delivery_carrier, drop_carrier: @order.drop_carrier, drop_data: @order.drop_data, drop_status: @order.drop_status, suscription: @order.suscription, user_id: @order.user_id, wash_data: @order.wash_data, wash_status: @order.wash_status } }
    assert_redirected_to order_url(@order)
  end

  test "should destroy order" do
    assert_difference('Order.count', -1) do
      delete order_url(@order)
    end

    assert_redirected_to orders_url
  end
end
