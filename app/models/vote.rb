class Vote < ActiveRecord::Base
  validates :pano_item, :voter, presence: true
  validates :pano_item, uniqueness: { scope: :voter,
    message: "Already Voted" }
  validate :cannot_be_owner

  belongs_to :voter, class_name: 'User'
  belongs_to :pano_item, counter_cache: true

  private
  def cannot_be_owner
    if voter_id == pano_item.owner.id
      errors.add(:voter_id, "Can't Vote Your Own Item")
    end
  end
end
