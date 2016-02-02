class Check < ActiveRecord::Base
  belongs_to :check_status
  belongs_to :check_type
  belongs_to :task
  belongs_to :currency

  validates :price, presence: true, :numericality => { :greater_than => 0 }
  validates :task_id, presence: true
  validates :check_type_id, presence: true
  validates :currency_id, presence: true
end
