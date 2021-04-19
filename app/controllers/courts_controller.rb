class CourtsController < ApplicationController
  before_action :authenticate_api_v1_user!
  def index
    json_response(Court.all)
  end   
end
