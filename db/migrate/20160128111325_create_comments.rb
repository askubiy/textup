class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :message
      t.references :task

      t.timestamps null: false
    end
  end
end
