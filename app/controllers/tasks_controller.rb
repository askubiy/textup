class TasksController < ApplicationController
  def index
    @tasks = current_user.tasks.all
    respond_with @tasks.to_json(:include => [:project, :status])
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    @task.destroy
    respond_with @task
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:task).permit(:title, :description, :project_id)
    end
end
