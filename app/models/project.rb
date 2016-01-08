class Project < ActiveRecord::Base
  belongs_to :user
  belongs_to :customer
  has_many :tasks, dependent: :destroy
end
