class PanoItem < ActiveRecord::Base
  validates :title, :gallery_id, :lat, :lng, :heading, :pitch, presence: true

  belongs_to :gallery
end
