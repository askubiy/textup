class CustomersController < ApplicationController
  def index
    @customers = current_user.customers.all
    respond_with @customers
  end

  def update
    @customer = current_user.customers.find(params[:id])
    @customer.update_attributes(customer_params)
    respond_with @customer, location: user_customers_url
  end

  def create
    @customer = current_user.customers.create(customer_params)
    respond_with @customer, location: user_customers_url
  end

  def show
    @customer = current_user.customers.find(params[:id])
    respond_with @customer, location: user_customer_url(current_user, @customer)
  end

  def destroy
    @customer = current_user.customers.find(params[:id])
    @customer.destroy
    respond_with @customer
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def customer_params
      params.require(:customer).permit(:name, :description, :colour)
    end
end