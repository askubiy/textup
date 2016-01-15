class ContactPerson < ActiveRecord::Base
  belongs_to :user
  belongs_to :customer

  def name
    name = first_name
    name += " #{middle_name}" if middle_name
    name += " #{last_name}" if last_name
  end

  def as_json(options={})
    super(options).merge({name: name})
  end
end
