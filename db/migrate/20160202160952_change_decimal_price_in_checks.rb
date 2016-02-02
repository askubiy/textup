class ChangeDecimalPriceInChecks < ActiveRecord::Migration
  def change
    change_column :checks, :price, :decimal, :precision => 9, :scale => 2
  end
end
