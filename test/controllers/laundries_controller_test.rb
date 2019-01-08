require 'test_helper'

class LaundriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @laundry = laundries(:one)
  end

  test "should get index" do
    get laundries_url
    assert_response :success
  end

  test "should get new" do
    get new_laundry_url
    assert_response :success
  end

  test "should create laundry" do
    assert_difference('Laundry.count') do
      post laundries_url, params: { laundry: { address: @laundry.address, address_details: @laundry.address_details, city: @laundry.city, cover: @laundry.cover, location: @laundry.location, logo: @laundry.logo, name: @laundry.name, score: @laundry.score } }
    end

    assert_redirected_to laundry_url(Laundry.last)
  end

  test "should show laundry" do
    get laundry_url(@laundry)
    assert_response :success
  end

  test "should get edit" do
    get edit_laundry_url(@laundry)
    assert_response :success
  end

  test "should update laundry" do
    patch laundry_url(@laundry), params: { laundry: { address: @laundry.address, address_details: @laundry.address_details, city: @laundry.city, cover: @laundry.cover, location: @laundry.location, logo: @laundry.logo, name: @laundry.name, score: @laundry.score } }
    assert_redirected_to laundry_url(@laundry)
  end

  test "should destroy laundry" do
    assert_difference('Laundry.count', -1) do
      delete laundry_url(@laundry)
    end

    assert_redirected_to laundries_url
  end
end
