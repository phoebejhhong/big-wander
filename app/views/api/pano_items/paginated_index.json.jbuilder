json.page params[:page]
json.total_pages @pano_items.total_pages

json.pano_items @pano_items do |pano_item|
  json.extract! pano_item, :id, :title, :gallery_id,
  :lat, :lng, :heading, :pitch, :all_tags, :votes_count,
  :created_at, :updated_at
  json.gallery do
    json.extract! pano_item.gallery, :id, :title
    json.owner do
      json.extract! pano_item.gallery.owner, :id, :username
    end
  end
end
