class Check < ActiveRecord::Base
  belongs_to :check_status
  belongs_to :check_type
  belongs_to :task
  belongs_to :currency
end
