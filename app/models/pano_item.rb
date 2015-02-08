class PanoItem < ActiveRecord::Base
  validates :title, :gallery_id, :lat, :lng, :heading, :pitch, presence: true

  belongs_to :gallery
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  def self.search(query)
    if query
      tags = Tag.where("label LIKE ?", "%#{query}%")
      PanoItem.includes(:taggings).where(taggings: {tag_id: tags})
    else
      PanoItem.all
    end
  end

  def all_tags
    self.tags.map(&:label).join(",")
  end

  def all_tags=(labels)
    self.tags = labels.downcase.split(',').map(&:strip).map do |label|
      Tag.where(label: label).first_or_create!
    end
  end
end
