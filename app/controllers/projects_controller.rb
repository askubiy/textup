class ProjectsController < ApplicationController
  def index
    @projects = current_user.projects.all
    respond_with @projects.to_json(:include => :customer)
  end

  def show
    @project = current_user.projects.find(params[:id])
    respond_with @project.to_json(:include => [:customer, {tasks: { :include => :status}}])
  end

  def create
    @project = current_user.projects.create(project_params)
    respond_with @project, location: user_projects_url
  end

  def update
    @project = current_user.projects.find(params[:id])
    @project.update_attributes(project_params)
    respond_with @project.to_json(:include => :customer)
  end

  def destroy
    @project = current_user.projects.find(params[:id])
    @project.destroy
    respond_with @project
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.require(:project).permit(:title, :description, :customer_id)
    end
end
