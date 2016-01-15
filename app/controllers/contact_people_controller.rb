class ContactPeopleController < ApplicationController

  def index
    @contact_people = current_user.contact_people.all
    respond_with @contact_people.to_json(:include => :customer)
  end

  def show
    @contact_person = current_user.contact_people.find(params[:id])
    respond_with @contact_person.to_json(:include => :customer)
  end

  def create
    @contact_person = current_user.contact_people.create(contact_person_params)
    respond_with @contact_person, location: user_contact_people_url
  end

  def update
    @contact_person = current_user.contact_people.find(params[:id])
    @contact_person.update_attributes(contact_person_params)
    respond_with @contact_person.to_json(:include => :customer)
  end

  def destroy
    @contact_person = current_user.contact_people.find(params[:id])
    @contact_person.destroy
    respond_with @contact_person
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def contact_person_params
      params.require(:contact_person).permit(:first_name, :middle_name,
        :last_name, :email, :phone, :phone2, :im, :position, :comment, :customer_id)
    end
end
