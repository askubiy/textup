class Project < ActiveRecord::Base
  belongs_to :user
  belongs_to :customer
  has_many :tasks, dependent: :destroy

  validates :title, presence: true
  validates :customer_id, presence: true
end
