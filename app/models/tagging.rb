class Tagging < ActiveRecord::Base
  validates :pano_item, :tag, presence: true

  belongs_to :tag
  belongs_to :pano_item
end
