class CurrenciesController < ApplicationController

  def index
    @currencies = Currency.all
    respond_with @currencies.to_json
  end
end