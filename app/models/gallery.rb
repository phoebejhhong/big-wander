class Gallery < ActiveRecord::Base
  validates :title, :owner_id, presence: true

  belongs_to :owner, class_name: "User"
  has_many :pano_items, dependent: :destroy
<<<<<<< HEAD

  def self.search(query)
    if query
      Gallery.where("title LIKE ?", "%#{query}%")
    else
      Gallery.all
    end
  end
=======
>>>>>>> 9ee3dd4e72eb94baedf5d74fd5b9a98e4db316d7

end
