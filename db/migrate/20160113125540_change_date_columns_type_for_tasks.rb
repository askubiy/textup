class ChangeDateColumnsTypeForTasks < ActiveRecord::Migration
  def up
    change_column(:tasks, :started_at, :datetime)
    change_column(:tasks, :estimated_finish, :datetime)
    change_column(:tasks, :original_finish, :datetime)
  end

  def down
    change_column(:tasks, :started_at, :date)
    change_column(:tasks, :estimated_finish, :date)
    change_column(:tasks, :original_finish, :date)
  end
end
