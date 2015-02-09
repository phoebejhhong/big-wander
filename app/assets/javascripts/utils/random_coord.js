BigWander.createRandomLat = function () {
  var lat = Number((Math.random() * 90).toFixed(6));
  return lat * [1, -1][Math.floor(Math.random()*2)];
};

BigWander.createRandomLng = function () {
  return BigWander.createRandomLat() * 2;
};

BigWander.saveRandomPanorama = function (lat, lng) {
  var loc = new google.maps.LatLng(lat, lng);
  var sv = new google.maps.StreetViewService();
  sv.getPanoramaByLocation(loc, 50, function (data, status) {
    if (status === google.maps.StreetViewStatus.OK) {
      console.log("saved " + lat +", " + lng);
      p = new BigWander.Models.Panorama
      p.save({
        lat: lat,
        lng: lng
      });
    } else {
      BigWander.saveRandomPanorama(BigWander.createRandomLat(), BigWander.createRandomLng());
    };
  });
};
