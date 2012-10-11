
/*
function SimpleMap(iconPath, title, mapDIVID, val, zoom)
{
	this._getVal = function() {
		var min = new Array(3);
		min = val.split(":");
		min[0] = parseFloat(min[0]);
		min[1] = parseFloat(min[1]);
		min[2] = parseInt(min[2]);		  
		return min;
	}
  
  	this.createMap = function(loc) {
	    var myOptions = {
			  zoom: zoom,
			  center: loc,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
	
	    var mapEm = document.getElementById(mapDIVID);
	    var map = new google.maps.Map(mapEm, myOptions);
	    map.panTo(loc);
	    createMarker(map, loc, title, iconPath);
	}
  
	// --------------------------
	this.resizeMarkerImage = new google.maps.MarkerImage(
		iconPath,
	    // This marker is 20 pixels wide by 32 pixels tall.
	    new google.maps.Size(27, 53),
	    // The origin for this image is 0,0.
	    new google.maps.Point(0,0),
	    // The anchor is in the middle of the image
	    new google.maps.Point(27, 53));
	  
	getPlaceLocation(val, this.createMap);
}
*/

function SimpleMap(valElemID, mapDivID, markerTitle, iconPath) {
	CommonMap(valElemID, mapDivID, false, markerTitle, iconPath, null);
}

/**
map for location selection.
*/
function ChooseLocMap(valElemID, mapDivID, enabled, markerTitle, iconPath) {
	CommonMap(valElemID, mapDivID, enabled, markerTitle, iconPath, null);
}

function CommonMap(valElemID, mapDivID, enabled, markerTitle, iconPath, onDragEndListener)
{
	this._getVal = function() {
		  var min = new Array(3);
		  var val = this.valElem.value;
		  if(val.length == 0) {
			  min[0] = min[1] = 0;
			  min[2] = 10;
		  } else {
			  min = val.split(":");
			  min[0] = parseFloat(min[0]);
			  min[1] = parseFloat(min[1]);
			  min[2] = parseInt(min[2]);
		  }
		  return min;
	  }
	
	this.setLoc = function(loc) {
		  var min = this._getVal();
		  var newVal = loc.lat() + ":" + loc.lng() + ":" + min[2];
		  this.valElem.value = newVal;
	  }

	  this.getLoc = function() {
		  var min = this._getVal();
		  return new google.maps.LatLng(min[0], min[1]);
	  }
	  
	  this.getZoom = function() {
		  var min = this._getVal();
		  return min[2];
	  }
	  
	  this.setZoom = function(zoom) {
		  var min = this._getVal();
		  var newVal = min[0] + ":" + min[1] + ":" + zoom;
		  this.valElem.value = newVal;
	  }
	  
  this.setNewView = function(loc, zoom) {
    this.map.panTo(loc);
    this.map.setZoom(zoom);
    this.marker.setPosition(loc);
    this.setLoc(loc);
    this.setZoom(zoom);
  }

  this.onMarkerDragend = function() {
    var newPos = this.marker.getPosition();
    this.map.panTo(newPos);
    // set to DOM
    this.setLoc(newPos);
    if(onDragEndListener != null) {
      onDragEndListener(newPos.lat(), newPos.lng());
    }
  }

  this.onZoom = function() {
	  this.setZoom(this.map.getZoom());
  }
  
  this.createMap = function(mapDivID) {
	var loc = this.getLoc();
    var myOptions = {
      zoom: parseInt(this.getZoom()),
      center: loc,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var mapEm = document.getElementById(mapDivID);
    var map = new google.maps.Map(mapEm, myOptions);
    map.panTo(loc);
    return map;    
  }
  
  this.onFindTown = function() {
	  getLocation(this);
  }
  
  // --------------------------
  
  this.valElem = document.getElementById(valElemID);
  
  this.map = this.createMap(mapDivID);

  this.resizeMarkerImage = new google.maps.MarkerImage(
	iconPath,
    // This marker is 32 pixels wide by 32 pixels tall.
    new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    new google.maps.Point(0,0),
    // The anchor is in the dewn middle of the image
    new google.maps.Point(16, 32));

  this.marker = new google.maps.Marker({
    position: this.getLoc(),
    map: this.map,
    title: markerTitle,
    icon: this.resizeMarkerImage,
    draggable: enabled
  });

  var m = this;

  if(enabled)
  {
    google.maps.event.addListener(this.marker, 'dragend', function() {
      m.onMarkerDragend();
    });
  }

  google.maps.event.addListener(this.map, 'zoom_changed', function() {
    m.onZoom();
  });
}