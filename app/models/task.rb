class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :project
  belongs_to :customer
  belongs_to :status
  has_many :comments, dependent: :destroy
end
