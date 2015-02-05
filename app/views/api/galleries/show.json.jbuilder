json.extract! @gallery, :id, :title, :description, :created_at, :updated_at

json.pano_items @gallery.pano_items do |pano_item|
  json.extract! pano_item, :id, :title, :lat, :lng, :heading, :pitch, :created_at, :updated_at
end
