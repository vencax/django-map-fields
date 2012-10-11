
geocoder = new google.maps.Geocoder();

function isInArray(arrayForSearch, what) {
  for(j=0; j<arrayForSearch.length; j++) {
    if(arrayForSearch[j] == what)
      return true;
  }
  return false;
}

function findTypePart(result, type) {
  var comp = result[0].address_components;
  for(i=0; i<comp.length; i++) {
    if(isInArray(comp[i].types, type)) {
      return comp[i].long_name;
    }
  }
  return "";
}

function findLocalityPart(result) {
  return findTypePart(result, 'locality')
}

function findRoutePart(result) {
  var sublocality = findTypePart(result, 'sublocality');
  var route = findTypePart(result, 'route');

  if(sublocality == "") {
    return route;
  } else {
    return sublocality + ', ' + route;
  }
}

function getAddr(pos, elem) {
  if (geocoder) {
    geocoder.geocode({'latLng': pos, 'language' : 'cs'}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
    	elem.value = results[0].formatted_address;
      }
    });
  }
}

function getAddress(lat, lng){

  var latlng = new google.maps.LatLng(lat, lng);

  if (geocoder) {
    geocoder.geocode({'latLng': latlng, 'language' : 'cs'}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var town = document.getElementById("basicInfoForm:ccomponent:townEdit");
        town.value = findLocalityPart(results);

        var address =
          document.getElementById("basicInfoForm:ccomponent:addressEdit");
        address.value = findRoutePart(results);
      }
    });
  }

}

function getLocation(map) {
  var czMin = new google.maps.LatLng(48.5, 12);
  var czMax = new google.maps.LatLng(51, 18.9);
  var czBounds = new google.maps.LatLngBounds(czMin, czMax);
  var town = document.getElementById(map.townEditID).value;
  if (geocoder) {
    geocoder.geocode( 
      { 'address': town,
        'region' : 'CZ',
        'language' : 'cs',
        'bounds' : czBounds },
      function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          m.setNewView(results[0].geometry.location, 13);
        }
    });
  }
}

function getPlaceLocation(place, callback) {
  if (geocoder) {
    geocoder.geocode(
      { 'address': place, 'region' : 'CZ', 'language' : 'cs' },
      function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          callback(results[0].geometry.viewport.getCenter());        		  		
        }
    });
  }
}