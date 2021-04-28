class CourtsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_court, only: [:show, :update, :destroy]
  before_action :authorized?, only: [:update, :destroy]
  before_action :authorized_create?, only: [:create]
  

  def index    
    json_response(Court.all)
  end

  def show
    json_response(@court)
  end

  def create  
    unless params[:name] ||
      params[:address] ||
      params[:description] ||
      params[:administrator_id].to_i ||
      params[:administrator_id] == ""
      head :unprocessable_entity # nothing to do, no editable parameters, send error
      return
    end
   
    @court = Court.create!(court_params)
    json_response(@court, :created)
  end

  def update

    unless params[:name] ||
        params[:address] ||
        params[:description]
      head :unprocessable_entity # nothing to do, no editable parameters, send error
      return 0
    end

    if @court.update(court_params)
      @court.save
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
    return head :unprocessable_entity if 
      params[:id] == "" ||
      params[:id] == nil
    @court = Court.find(params[:id]) 
  end

  def authorized?
    return head :unprocessable_entity if 
      params[:id] == nil ||
      params[:id] == ""
    return head :unauthorized if current_api_v1_user.id != @court.administrator_id
  end

  def authorized_create? 
    return head :unprocessable_entity if 
      params[:administrator_id] == nil ||
      params[:administrator_id] == ""
    return head :unauthorized if current_api_v1_user.id != params[:administrator_id].to_i
  end
end
