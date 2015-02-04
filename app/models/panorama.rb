class Panorama < ActiveRecord::Base
  validates :lat, :lng, :heading, :pitch, presence: true
  validates :lat, uniqueness: { scope: :lng }
end
