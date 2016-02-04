class Task < ActiveRecord::Base
  belongs_to :user
  belongs_to :project
  belongs_to :customer
  belongs_to :status
  has_many :comments, dependent: :destroy
  has_many :checks, dependent: :destroy

  validates :title, presence: true
  validates :customer_id, presence: true
  validates :status_id, presence: true
  validates :estimated_finish, presence: true
  validates :started_at, presence: true

  def checks_totals
    checks = self.checks
      .select("SUM(price) as total, currencies.abbreviation as abbreviation, check_statuses.name as status_name")
      .joins(:currency).joins(:check_status)
      .group("currencies.abbreviation").group("check_statuses.name").order("abbreviation")

    totals = {}

    checks.each do |check|
      totals[check.abbreviation.to_sym] ||= {}
      totals[check.abbreviation.to_sym][check.status_name.to_sym] = check.total.to_f
    end

    totals
  end

end
