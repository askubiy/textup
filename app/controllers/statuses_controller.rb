class StatusesController < ApplicationController
  def index
    @statuses = Status.all
    respond_with @statuses
  end
end