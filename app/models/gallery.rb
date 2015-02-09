class Gallery < ActiveRecord::Base
  validates :title, :owner_id, presence: true

  belongs_to :owner, class_name: "User"
  has_many :pano_items, dependent: :destroy

  def self.search(query)
    if query
      Gallery.where("LOWER(title) LIKE ?", "%#{query.downcase}%")
    else
      Gallery.all
    end
  end

end
