# Phase 2: User Authentication and Displaying Galleries and Pano Items

## Rails
### Models
* User
* Gallery
* Pano Item

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)

Api::UsersController (show)
Api::GalleriesController (create, destroy, index, show, update)
Api::PanoItemsController (create, destroy, update)

### Views
* users/show.json.jbuilder
* galleries/show.json.jbuilder
* users/new.html.erb
* session/new.html.erb

## Backbone
### Models
* User (parses nested `galleries` association)
* Gallery (parses nested `pano_items` association)
* PanoItem

### Collections
* Galleries
* PanoItems

### Views
* UserShow (composite view, contains GalleryIndex)
* GalleryIndex (composite view, contains GalleryIndexItem)
* GalleryIndexItem (composite view, contains PanoIndexItem)
* PanoIndexItem

## Gems/Libraries
