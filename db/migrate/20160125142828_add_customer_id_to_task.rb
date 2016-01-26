class AddCustomerIdToTask < ActiveRecord::Migration
  def change
    add_reference :tasks, :customer, index: true
  end
end
