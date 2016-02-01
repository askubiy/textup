class CheckTypesController < ApplicationController

  def index
    @check_types = CheckType.all
    respond_with @check_types.to_json
  end
end