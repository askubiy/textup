class CheckStatusesController < ApplicationController

  def index
    @check_statuses = CheckStatus.all
    respond_with @check_statuses.to_json
  end
end