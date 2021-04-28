class UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_user, only: [:bookings,:courts]

  # GET /user/:id/bookings
  def bookings
    json_response(@user.bookings)
  end

  # GET /user/:id/courts
  def courts
    json_response(@user.courts)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end