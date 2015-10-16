var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['marionette', 'audiojs'], function(Marionetee) {
  var searchPlaceView;
  return searchPlaceView = (function(superClass) {
    extend(searchPlaceView, superClass);

    function searchPlaceView() {
      this.placeChanged = bind(this.placeChanged, this);
      this.markerClicked = bind(this.markerClicked, this);
      return searchPlaceView.__super__.constructor.apply(this, arguments);
    }

    searchPlaceView.prototype.el = ".main-container";

    searchPlaceView.prototype.initialize = function() {
      this.initAudioJS();
      return this.renderMaps();
    };

    searchPlaceView.prototype.initAudioJS = function() {
      return audiojs.events.ready((function(_this) {
        return function() {
          return _this.audioPlayer = audiojs.createAll({
            pause: _this.markerClicked
          })[0];
        };
      })(this));
    };

    searchPlaceView.prototype.renderMaps = function() {
      var input, mapOptions, self;
      mapOptions = {
        center: {
          lat: -33.8688,
          lng: 151.2195
        },
        zoom: 13,
        scrollwheel: false
      };
      this.map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
      input = document.getElementById('search-container');
      this.autocomplete = new google.maps.places.Autocomplete(input);
      this.$(input).removeClass('hide');
      this.audio = "http://www.w3schools.com/html/horse.mp3";
      this.playImage = new google.maps.MarkerImage('images/play.png', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25));
      this.pauseImage = new google.maps.MarkerImage('images/pause.ico', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25));
      this.marker = new google.maps.Marker({
        map: this.map,
        icon: this.playImage
      });
      self = this;
      google.maps.event.addListener(this.marker, 'click', function() {
        return self.markerClicked(this);
      });
      return google.maps.event.addListener(this.autocomplete, 'place_changed', this.placeChanged);
    };

    searchPlaceView.prototype.markerClicked = function(marker) {
      if (!marker) {
        this.marker.started = false;
        this.marker.setIcon(this.playImage);
        return this.audioPlayer.pause();
      } else {
        if (marker.started) {
          marker.started = false;
          marker.setIcon(this.playImage);
          return this.audioPlayer.pause();
        } else {
          marker.started = true;
          marker.setIcon(this.pauseImage);
          this.audioPlayer.load(this.audio);
          return this.audioPlayer.play();
        }
      }
    };

    searchPlaceView.prototype.placeChanged = function() {
      var place;
      this.$('.middle-content').attr('map', 'true');
      place = this.autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }
      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);
      }
      this.marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location
      });
      this.marker.setVisible(true);
      this.$('.latitude-value').html(place.geometry.location.lat());
      return this.$('.longitude-value').html(place.geometry.location.lng());
    };

    return searchPlaceView;

  })(Marionetee.CompositeView);
});
