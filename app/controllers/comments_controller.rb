class CommentsController < ApplicationController

  def create
    @comment = Comment.create(comment_params)
    respond_with @comment, location: user_task_comment_url(current_user, @comment.task, @comment)
  end

  def destroy
    @task = current_user.tasks.find(params[:task_id])
    @comment = @task.comments.find(params[:id])
    @comment.destroy
    respond_with @comment
  end

  def update
    @task = current_user.tasks.find(params[:task_id])
    @comment = @task.comments.find(params[:id])
    @comment.update_attributes(comment_params)
    respond_with @comment
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit(:message, :task_id)
    end
end
