class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :label
      t.string :title
      t.text :description
      t.references :user, index: true
      t.references :customer, index: true

      t.timestamps null: false
    end
  end
end
