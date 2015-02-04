json.extract! @user, :id, :username, :created_at, :updated_at

json.galleries @user.galleries do |gallery|
  json.id gallery.id
  json.title gallery.title
  json.description gallery.description
end
