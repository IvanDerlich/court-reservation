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

  def update
    unless params[:name] || params[:address] || params[:description] || params[:administrator_id]
      head :unprocessable_entity # nothing to do, no editable parameters, send error
      return 0
    end
    if @court.update(court_params) 
      head :accepted
    else
      head :unprocessable_entity # validation errors
    end
  end

  # DELETE /todos/:id
  def destroy
    @court.destroy
    head :no_content
  end

  private

  def court_params    
    params.permit(:name, :address, :description, :administrator_id)
  end

  def set_court
    @court = Court.find(params[:court_id])
  end
end
