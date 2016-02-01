class ChecksController < ApplicationController

  def show
    @task = current_user.tasks.find(params[:task_id])
    @check = @task.find(params[:id])
    respond_with @check.to_json(:include => [:task,
      :check_status, :check_type, :currency])
  end

  def update
    @task = current_user.tasks.find(params[:task_id])
    @check = @task.find(params[:id])
    @check.update_attributes(check_params)
    respond_with @check.to_json()
  end

  def create
    @task = current_user.tasks.find(params[:task_id])
    @check = @task.checks.create(check_params)
    respond_with @check, location: user_task_checks_url(current_user, @task, @check)
  end

  def destroy
    @task = current_user.tasks.find(params[:task_id])
    @check = @task.find(params[:id])
    @check.destroy
    respond_with @check
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def check_params
      params.require(:check).permit(:price, :check_status_id, :check_type_id, :task_id, :currency_id)
    end
end
