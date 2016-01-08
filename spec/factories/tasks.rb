FactoryGirl.define do
  factory :task do
    label "MyString"
title "MyString"
description "MyText"
status_id 1
started_at "2016-01-08"
estimated_finish "2016-01-08"
original_finish "2016-01-08"
project_id 1
  end

end
