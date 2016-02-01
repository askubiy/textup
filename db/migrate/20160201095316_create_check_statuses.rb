class CreateCheckStatuses < ActiveRecord::Migration
  def change
    create_table :check_statuses do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
