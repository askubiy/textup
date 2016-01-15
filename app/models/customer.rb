class Customer < ActiveRecord::Base
  belongs_to :user
  has_many :projects, dependent: :destroy
  has_many :contact_people, dependent: :destroy
end
