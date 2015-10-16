var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['marionette', 'templates/home_page', 'audiojs'], function(Marionette, temp) {
  var HomePage;
  HomePage = (function(superClass) {
    extend(HomePage, superClass);

    function HomePage() {
      return HomePage.__super__.constructor.apply(this, arguments);
    }

    HomePage.prototype.el = '#main-content';

    HomePage.prototype.template = temp;

    HomePage.prototype.markers = [
      {
        lat: 51.508742,
        lon: -0.120850,
        mid: 1,
        audio: 'http://kolber.github.io/audiojs/demos/mp3/juicy.mp3'
      }, {
        lat: 53.508742,
        lon: -0.120850,
        mid: 2,
        audio: 'http://www.w3schools.com/html/horse.mp3'
      }, {
        lat: 55.508742,
        lon: -0.120850,
        mid: 3,
        audio: 'http://kolber.github.io/audiojs/demos/mp3/juicy.mp3'
      }
    ];

    HomePage.prototype.initialize = function() {
      window.q = this;
      return this.render();
    };

    HomePage.prototype.onRender = function() {
      this.initAudioJS();
      this.initMap();
      this.setMarkers();
      return this.prevMarker = null;
    };

    HomePage.prototype.initAudioJS = function() {
      return audiojs.events.ready((function(_this) {
        return function() {
          return _this.audioPlayer = audiojs.createAll()[0];
        };
      })(this));
    };

    HomePage.prototype.initMap = function() {
      var mapProp, myCenter;
      myCenter = new google.maps.LatLng(51.508742, -0.120850);
      mapProp = {
        center: myCenter,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.$('.map-container')[0], mapProp);
      this.playImage = new google.maps.MarkerImage('images/play.png', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25));
      return this.pauseImage = new google.maps.MarkerImage('images/pause.png', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25));
    };

    HomePage.prototype.setMarkers = function() {
      var curMarker, i, marker, results, self;
      i = 0;
      self = this;
      results = [];
      while (i < this.markers.length) {
        curMarker = this.markers[i];
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(curMarker.lat, curMarker.lon),
          mid: curMarker.mid,
          audio: curMarker.audio,
          icon: this.playImage
        });
        marker.setMap(this.map);
        google.maps.event.addListener(marker, 'click', function(e) {
          return self.markerClicked(e, this);
        });
        results.push(i++);
      }
      return results;
    };

    HomePage.prototype.markerClicked = function(event, marker) {
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

    return HomePage;

  })(Marionette.ItemView);
  return HomePage;
});
