class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :label
      t.string :title
      t.text :description
      t.references :status
      t.date :started_at
      t.date :estimated_finish
      t.date :original_finish
      t.references :project
      t.references :user

      t.timestamps null: false
    end
  end
end
