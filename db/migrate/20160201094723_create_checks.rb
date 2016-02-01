class CreateChecks < ActiveRecord::Migration
  def change
    create_table :checks do |t|
      t.references :check_status, index: true
      t.references :check_type, index: true
      t.references :task, index: true
      t.references :currency, index: true
      t.decimal :price

      t.timestamps null: false
    end
  end
end
