# BigWander

[http://bigwander.phoebehong.com][heroku]

## Minimum Viable Product
[MapCrunch][mapcrunch] lets users explore the world by presenting random Google street views (panoramas). [BigWander][heroku] is a MapCrunch clone with personal features added. Users can save their favorite panoramas to their galleries.

[mapcrunch]: http://www.mapcrunch.com/
[heroku]: http://bigwander.phoebehong.com

All users can:
- [x] View random/selected street views (panoramas)
- [x] Create accounts
- [x] View Others' Galleries
- [x] Search for galleries by title
- [x] Search for panoramas by tag

Signed-in users can:
- [x] Create sessions (log in)
- [x] Create Galleries
- [x] Save panoramas to gallery
- [x] Tag panoramas


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Street Views (~2 days)
First thing I need is a Backbone View to show individual street view. It will talk to Google Maps JavaScript API and create `StreetViewPanorama` objects. Url will look like "/v/22.43805_114.097445_12.38_-5_0" – Four sets of numbers, each of them representing latitude, longitude, heading and pitch. Root page will redirect to random panorama page. I will also push to Heroku.

[Details][phase-one]

### Phase 2: User Authentication and Displaying Galleries and Pano Items (~2 days)
I will implement user authentication in Rails. And I will add API routes to serve user and gallery data as JSON, then add Backbone models and collections that fetch data from those routes. I will make Backbone views to show users, galleries and their items.

[Details][phase-two]

### Phase 3: Creating/Editing/Deleting Galleries and PanoItems (~2 days)
Users will be able to create galleries and save individual `StreetViewPanorama` objects as `panoItem` backbone model object, then `pano_item` ActiveRecord object. When logged in, user will be able to edit and delete their own galleries and pano items. Tags should be handled as well.

[Details][phase-three]

### Phase 4: Searching for Galleries and PanoItems (~2 days)
I'll need a `search` route that accepts a query in the params. The controller action will run two queries: one to find galleries where the `title` matches  the search term, and another to find pano items where one of their associated `Tag`s matches the search term. In Backbone, I plan to implement a `SearchResults` view that will display matching galleries in one column and matching pano items in another.

[Details][phase-four]

### Bonus Features (TBD)
- [x] Lading page
- [ ] Share buttons
- [x] Vote button and counter for `PanoItemShow` view
- [ ] TagShow view
- [ ] Pagination of the `UserShow`, `GalleryShow`, and `SearchShow` views
- [ ] Subscribe to lists
- [ ] Save each street view as image file
- [ ] Filter random street views


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
