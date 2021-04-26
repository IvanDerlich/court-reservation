class BookingsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_court
  before_action :set_court_booking, only: [:show, :update, :destroy]

  # GET /courts/:court_id/bookings
  def index
    json_response(@court.bookings)
  end

  # GET /courts/:court_id/bookings/:id
  def show
    json_response(@booking)
  end

  # POST /courts/:court_id/bookings
  def create

    booking =  @court.bookings.create(booking_params)
 
    if booking.save
      json_response(booking, :created)
    else
      head(:unprocessable_entity)
    end
  end

  private

  def booking_params
    params.permit(:booker_id, :description, :date)
  end

  def set_court
    @court = Court.find(params[:court_id])
  end

  def set_court_booking
    @booking = @court.bookings.find_by!(id: params[:id]) if @court
  end
end
