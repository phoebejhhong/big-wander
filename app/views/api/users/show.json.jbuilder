json.extract! @user, :id, :username, :created_at, :updated_at

json.galleries @user.galleries do |gallery|
  json.extract! gallery, :id, :title, :owner_id, :description, :created_at, :updated_at

  json.pano_items gallery.pano_items do |pano_item|
    json.extract! pano_item, :id, :title, :lat, :lng, :heading, :pitch, :created_at, :updated_at
  end
end

json.votes @user.votes do |vote|
  json.extract! vote, :id, :pano_item_id
end
