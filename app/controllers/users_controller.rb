class UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_user, only: %i[bookings courts]

  # GET /user/:id/bookings
  def bookings
    json_response(@user.bookings)
  end

  # GET /user/courts
  def courts
    json_response(@user.courts)
  end

  private

  def set_user
    # @user = User.find(params[:id])
    @user = User.find(params[:email])
  end
end
