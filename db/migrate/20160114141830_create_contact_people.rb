class CreateContactPeople < ActiveRecord::Migration
  def change
    create_table :contact_people do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.string :phone2
      t.string :im
      t.string :position
      t.text :comment
      t.references :customer, index: true
      t.references :user, index: true

      t.timestamps null: false
    end
  end
end
