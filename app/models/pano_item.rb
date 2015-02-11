class PanoItem < ActiveRecord::Base
  validates :title, :gallery_id, :lat, :lng, :heading, :pitch, presence: true

  belongs_to :gallery
  delegate :owner, to: :gallery
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
  has_many :votes, dependent: :destroy

  def self.search(query)
    tags = Tag.where("LOWER(label) LIKE ?", "%#{query.downcase}%")
    PanoItem.includes(:taggings).where(taggings: {tag_id: tags})
  end

  def self.popular(num)
    PanoItem.order(:votes_count).limit(num)
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
