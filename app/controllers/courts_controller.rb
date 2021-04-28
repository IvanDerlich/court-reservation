class CourtsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_court, only: [:show, :bookings, :update, :destroy]  
  before_action :authorized_create?, only: [:create]
  before_action :authorized?, only: [:update, :destroy]
  before_action :useful_content?, only: [:create, :update]
  

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
    if @court.update(court_params)
      @court.save
      head :accepted
    else
      head :unprocessable_entity
    end
  end

  # DELETE /todos/:id
  def destroy
    @court.destroy
    head :no_content
  end

  # GET /court/:id/bookings
  def bookings
    json_response(@court.bookings)
  end

  private

  def court_params    
    params.permit(:name, :address, :description, :administrator_id)
  end

  def set_court 
    return head :unprocessable_entity unless has_value? params[:id]
    @court = Court.find(params[:id]) 
  end

  def authorized?
    return head :unauthorized if current_api_v1_user.id != @court.administrator_id
  end

  def authorized_create? 
    return head :unprocessable_entity unless 
      has_value? params[:administrator_id]
    return head :unauthorized if 
      current_api_v1_user.id != params[:administrator_id].to_i
  end 

  def useful_content?
    unless params[:name] ||
      params[:address] ||
      params[:description]
      head :unprocessable_entity # nothing to do, no editable parameters, send error
      return
    end
  end

end
