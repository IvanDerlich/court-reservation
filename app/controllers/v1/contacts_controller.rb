class V1::ContactsController < ApplicationController

  before_action :set_contact, only: [:show, :update, :destroy]

  def index
    @contacts = Contact.all
    render json: @contacts, status: :ok
  end

  def show
    json_response(@contact)
  end
  
  def create
    @contact = Contact.new(contact_params)

    @contact.save!
    render json: @contact, status: :created
  end


  def update
    if @contact.update(contact_params)
      render json: @contact, status: 200
    else
      head(:unprocessable_entity)
    end
  end
  
  def destroy
    if @contact.destroy  
      head(:ok)  
    else
      head(:unprocessable_entity)
    end
  end

private

  def contact_params    
    params.permit(:first_name, :last_name, :email)
  end

 def set_contact
   @contact = Contact.find(params[:id])
 end

end

