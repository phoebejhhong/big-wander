json.array! @galleries.each do |gallery|
  json.extract! gallery, :id, :title, :description, :owner_id,
                :created_at, :updated_at
  # serch result will show only first two items
  # (but get three items to check if it has more than 2 items)
  json.pano_items gallery.pano_items[0..2] do |pano_item|
    json.extract! pano_item, :id, :title, :lat, :lng,
    :heading, :pitch,:all_tags, :created_at, :updated_at
  end
  json.owner do
    json.extract! gallery.owner, :id, :username
  end
end
