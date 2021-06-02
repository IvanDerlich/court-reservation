class UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_user, only: %i[bookings courts]

  # GET /bookings/mine
  def my_bookings
    bookings = @user.bookings
    json_response(bookings)
  end

  # GET /bookings/others
  def my_bookings
    bookings = @user.bookings
    json_response(bookings)
  end

  # GET /user/courts
  def courts
    courts = Court
      .select('id, name, address, description')
      .where(administrator_id: @user.id)
    json_response(courts)
  end

  private

  def set_user
    @user = User.find_by(email: params[:email])
  end
end
