# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
statuses = [
  { name: "Открыта", status_type: "new" },
  { name: "Новая", status_type: "open" },
  { name: "В работе", status_type: "in_work" },
  { name: "Выполнена", status_type: "done" },
  { name: "Отложена", status_type: "paused" },
  { name: "Оплачена", status_type: "paid" }
]

statuses.each do |status|
  new_status = Status.find_or_initialize_by(status)
  new_status.save!
end

check_statuses = [
  { name: "paid" },
  { name: "unpaid" }
]

check_statuses.each do |check_status|
  new_check_status = CheckStatus.find_or_initialize_by(check_status)
  new_check_status.save!
end

check_types = [
  { name: "static" },
  { name: "calculated" }
]

check_types.each do |check_type|
  new_check_type = CheckType.find_or_initialize_by(check_type)
  new_check_type.save!
end

currencies = [
  { name: "hrivnya", abbreviation: "UAH" },
  { name: "us_dollar", abbreviation: "USD" },
  { name: "russian_rubl", abbreviation: "RUR" }
]

currencies.each do |currency|
  new_currency = Currency.find_or_initialize_by(currency)
  new_currency.save!
end