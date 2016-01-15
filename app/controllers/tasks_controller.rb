class TasksController < ApplicationController

  def index
    @tasks = current_user.tasks.all
    respond_with @tasks.to_json(:include => [:project, :status])
  end

  def show
    @task = current_user.tasks.find(params[:id])
    respond_with @task.to_json(:include => [:project, :status])
  end

  def create
    @task = current_user.tasks.create(task_params)
    respond_with @task, location: user_tasks_url
  end

  def update
    @task = current_user.tasks.find(params[:id])
    @task.update_attributes(task_params)
    respond_with @task.to_json(:include => [:project, :status])
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    @task.destroy
    respond_with @task
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:task).permit(:title, :description,
       :project_id, :status_id, :started_at, :estimated_finish, :original_finish)
    end
end
