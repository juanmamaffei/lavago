require "application_system_test_case"

class StocksTest < ApplicationSystemTestCase
  setup do
    @stock = stocks(:one)
  end

  test "visiting the index" do
    visit stocks_url
    assert_selector "h1", text: "Stocks"
  end

  test "creating a Stock" do
    visit stocks_url
    click_on "New Stock"

    fill_in "Available", with: @stock.available
    fill_in "Carrier", with: @stock.carrier_id
    fill_in "Day", with: @stock.day
    fill_in "Delivery type", with: @stock.delivery_type
    fill_in "Hour", with: @stock.hour
    fill_in "Laundry", with: @stock.laundry_id
    fill_in "Remaining", with: @stock.remaining
    click_on "Create Stock"

    assert_text "Stock was successfully created"
    click_on "Back"
  end

  test "updating a Stock" do
    visit stocks_url
    click_on "Edit", match: :first

    fill_in "Available", with: @stock.available
    fill_in "Carrier", with: @stock.carrier_id
    fill_in "Day", with: @stock.day
    fill_in "Delivery type", with: @stock.delivery_type
    fill_in "Hour", with: @stock.hour
    fill_in "Laundry", with: @stock.laundry_id
    fill_in "Remaining", with: @stock.remaining
    click_on "Update Stock"

    assert_text "Stock was successfully updated"
    click_on "Back"
  end

  test "destroying a Stock" do
    visit stocks_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Stock was successfully destroyed"
  end
end
