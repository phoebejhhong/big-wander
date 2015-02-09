class Panorama < ActiveRecord::Base
  validates :lat, :lng, :heading, :pitch, presence: true
  validates :lat, uniqueness: { scope: :lng,
    message: "Coordinate already in database" }
end
