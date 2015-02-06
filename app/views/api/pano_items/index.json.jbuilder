json.array! @pano_items.each do |pano_item|
  json.extract! pano_item, :id, :title, :gallery_id,
                :lat, :lng, :heading, :pitch, :all_tags,
                :created_at, :updated_at
end
