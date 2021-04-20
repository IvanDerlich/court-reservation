class CourtsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_court, only: [:show, :update, :destroy]

  def index
    json_response(Court.all)
  end

  def show
    json_response(@court)
  end

  def create    
    @court = Court.create!(court_params)
    json_response(@court, :created)
  end

  # def update
  #   @court.update(court_params)
  #   head :accepted  
  # end

  private

  def court_params    
    params.permit(:name, :address, :description, :administrator_id)
  end

  def set_court
    @court = Court.find(params[:id])
  end
end
