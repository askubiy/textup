# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
statuses = Status.create([
  { name: "Открыта", status_type: "new" },
  { name: "Новая", status_type: "open" },
  { name: "В работе", status_type: "in_work" },
  { name: "Выполнена", status_type: "done" },
  { name: "Отложена", status_type: "paused" },
  { name: "Оплачена", status_type: "paid" }
])
