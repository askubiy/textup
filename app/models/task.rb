class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :project
  belongs_to :status

  #def as_json(options = {})
  #  super.merge(started_at: started_at.strftime('%d.%m.%Y %H:%M'))
  #    .merge(estimated_finish: estimated_finish.strftime('%d.%m.%Y %H:%M'))
  #end
end
