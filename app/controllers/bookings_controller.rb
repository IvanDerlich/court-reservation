class BookingsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_court
  before_action :set_court_booking, only: [:show, :update, :destroy]

  def index
    json_response(@court.bookings)
  end

  def show
    json_response(@booking)
  end

  private

  def set_court
    @court = Court.find(params[:court_id])
  end

  def set_court_booking
    @booking = @court.bookings.find_by!(id: params[:id]) if @court
  end
end
