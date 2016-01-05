class ProjectsController < ApplicationController
  def index
    @projects = current_user.projects.all
    respond_with @projects
  end

  def create
    @project = current_user.projects.create(project_params)
    respond_with @customer, location: user_projects_url
  end

  def destroy
    @project = current_user.projects.find(params[:id])
    @project.destroy
    respond_with @project
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.require(:project).permit(:title, :description)
    end
end
