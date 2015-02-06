json.galleries @galleries do |gallery|
  json.extract! gallery, :id, :title, :description, :owner_id,
                :created_at, :updated_at
  json.pano_items gallery.pano_items do |pano_item|
    json.extract! pano_item, :id, :title, :lat, :lng,
    :heading, :pitch,:all_tags, :created_at, :updated_at
    json.tags pano_item.tags do |tag|
      json.extract! tag, :id, :label
    end
  end

end
#
