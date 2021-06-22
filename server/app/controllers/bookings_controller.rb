class BookingsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_court, only: [:index]
  before_action :set_user, only: [:on_mine, :on_others]
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
    court = Court.find(params[:booking][:courtId])

    booking = Booking.create(
      booker_id: current_api_v1_user.id,
      court: court,
      date: params[:booking][:date],
      description: params[:booking][:description],
    )

    if booking.save
      json_response(booking, :created)
    else
      head(:unprocessable_entity)
    end
  end

  # PUT /court/:court_id/booking/:id
  def update
    unless params[:description] || params[:date]
      head :unprocessable_entity # nothing to do, no editable parameters, send error
      return 0
    end

    if @booking.update(booking_params.permit(:description, :date))
      @booking.save
      json_response(@booking, 200)
    else
      head :unprocessable_entity # validation errors
    end
  end

  def destroy
    booking = Booking.find(params[:id])
    booking.destroy
    json_response(booking, 200)
  end

  # GET /bookings/mine
  def on_mine
    bookings = Booking
      .joins(:booker)
      .joins(:court)
      .select(
        # bookings
        'bookings.id',
        'date',
        'bookings.description as booking_description',
        # courts
        'courts.id as court_id',
        'courts.name as court_name',
        # bookers
        'booker_id', # key from bookings
        'users.first_name',
        'users.last_name',
      )
      .where(courts: { administrator_id: @user.id })
    json_response(bookings)
  end

  # GET /bookings/others
  def on_others
    bookings = Booking
      .joins(:court)
      .select(
        # bookings
        'bookings.id',
        'bookings.date',
        'bookings.description',
        # courts
        'courts.id as court_id',
        'courts.name as courts_name'
      )
      .where(booker_id: @user.id)
    json_response(bookings)
  end

  private

  def booking_params
    params.permit(:booker_id, :description, :date, :court_id)
  end

  def set_court
    @court = Court.find(params[:court_id])
  end

  def set_user
    @user = User.find_by(email: params[:email])
  end

  def set_court_booking
    @booking = @court.bookings.find_by!(id: params[:id]) if @court
  end
end
