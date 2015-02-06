class Tag < ActiveRecord::Base
  validates :label, presence: true

  has_many :taggings
  has_many :pano_items, through: :taggings

end
