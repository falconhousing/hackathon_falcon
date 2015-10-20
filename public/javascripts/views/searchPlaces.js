var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['marionette', 'templates/list_item', 'audiojs'], function(Marionetee, tpl) {
  var searchPlaceView;
  return searchPlaceView = (function(superClass) {
    extend(searchPlaceView, superClass);

    function searchPlaceView() {
      this.playMusic = bind(this.playMusic, this);
      this.placeChanged = bind(this.placeChanged, this);
      this.markerClicked = bind(this.markerClicked, this);
      return searchPlaceView.__super__.constructor.apply(this, arguments);
    }

    searchPlaceView.prototype.template = tpl;

    searchPlaceView.prototype.el = ".main-container";

    searchPlaceView.prototype.initialize = function() {
      this.initAudioJS();
      return this.renderMaps();
    };

    searchPlaceView.prototype.initAudioJS = function() {
      this.self = this;
      return audiojs.events.ready((function(_this) {
        return function() {
          return _this.audioPlayer = audiojs.createAll()[0];
        };
      })(this));
    };

    searchPlaceView.prototype.renderMaps = function() {
      var input, mapOptions;
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
      this.marker = new google.maps.Marker({
        map: this.map
      });
      return google.maps.event.addListener(this.autocomplete, 'place_changed', this.placeChanged);
    };

    searchPlaceView.prototype.markerClicked = function(event, marker) {
      if (this.prevMarker) {
        this.audioPlayer.pause();
        this.prevMarker.setIcon(this.playImage);
      } else {
        this.$('.audio-player').removeClass('hide');
      }
      marker.setIcon(this.pauseImage);
      this.prevMarker = marker;
      this.audioPlayer.load(marker.audio);
      return this.audioPlayer.play();
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
      this.$('.longitude-value').html(place.geometry.location.lng());
      return $.ajax({
        url: "http://dharmendrav.housing.com:4000/get_feed",
        method: "GET",
        data: {
          source: "web",
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng()
        },
        success: (function(_this) {
          return function(data) {
            return _this.makeMarkers(data.stories);
          };
        })(this)
      });
    };

    searchPlaceView.prototype.makeMarkers = function(stories) {
      var curMarker, i, self;
      this.playImage = new google.maps.MarkerImage('images/play.png', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25));
      this.pauseImage = new google.maps.MarkerImage('images/pause.ico', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25));
      i = 0;
      self = this;
      this.marker = [];
      while (i < stories.length) {
        curMarker = stories[i];
        this.marker[i] = new google.maps.Marker({
          position: new google.maps.LatLng(curMarker.coordinates.latitude, curMarker.coordinates.longitude),
          audio: curMarker.audio_url,
          icon: this.playImage
        });
        this.marker[i].setMap(this.map);
        google.maps.event.addListener(this.marker[i], 'click', function(e) {
          return self.markerClicked(e, this);
        });
        i++;
      }
      return this.renderList(stories);
    };

    searchPlaceView.prototype.renderList = function(stories) {
      var i, results;
      i = 0;
      results = [];
      while (i < stories.length) {
        this.$('.audio-list').append(this.template({
          name: stories[i].name,
          image: stories[i].user_picture,
          place: stories[i].poi,
          lct: stories[i].location,
          audio: stories[i].audio_url
        }));
        this.$('.audio-item').last().on('click', this.playMusic);
        results.push(i++);
      }
      return results;
    };

    searchPlaceView.prototype.playMusic = function(event) {
      var index;
      index = $(event.currentTarget).index();
      return this.markerClicked(event, this.marker[index]);
    };

    return searchPlaceView;

  })(Marionetee.CompositeView);
});
