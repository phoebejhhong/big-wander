json.array! @galleries.each do |gallery|
  json.extract! gallery, :id, :title, :description, :owner_id,
                :created_at, :updated_at
  # serch result will show only first two items
  json.pano_items gallery.pano_items[0..1] do |pano_item|
    json.extract! pano_item, :id, :title, :lat, :lng,
    :heading, :pitch,:all_tags, :created_at, :updated_at
  end
  json.owner do
    json.extract! gallery.owner, :id, :username
  end
end
