class PanoItem < ActiveRecord::Base
  validates :title, :gallery_id, :lat, :lng, :heading, :pitch, presence: true

  belongs_to :gallery
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

<<<<<<< HEAD
  def self.search(query)
    if query
      # PanoItem.where("ta LIKE ?", "%#{query}%")
    else
      # PanoItem.all
    end
  end

=======
>>>>>>> 9ee3dd4e72eb94baedf5d74fd5b9a98e4db316d7
  def all_tags
    self.tags.map(&:label).join(",")
  end

  def all_tags=(labels)
    self.tags = labels.split(',').map(&:strip).map do |label|
      Tag.where(label: label).first_or_create!
    end
  end
end
