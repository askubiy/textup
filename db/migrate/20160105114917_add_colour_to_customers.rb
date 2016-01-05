class AddColourToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :colour, :string
  end
end
