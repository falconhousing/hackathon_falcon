define ['marionette', 'audiojs'], 
	(Marionetee)->
		class searchPlaceView extends Marionetee.CompositeView
			el : ".main-container"
			initialize : ->
				@initAudioJS()
				@renderMaps()

			initAudioJS: () ->
				audiojs.events.ready ()=> 
					@audioPlayer = audiojs.createAll({
						pause : @markerClicked
					})[0]

			renderMaps : ->
				mapOptions = {
					center: {lat: -33.8688, lng: 151.2195},
					zoom: 13,
					scrollwheel: false
				};
				@map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

				input = document.getElementById('search-container');
				
				@autocomplete = new google.maps.places.Autocomplete(input);
				# @autocomplete.bindTo('bounds', @map);
				# @map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

				@$(input).removeClass('hide')
				@audio = "http://www.w3schools.com/html/horse.mp3"
				@playImage = new google.maps.MarkerImage 'images/play.png', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25)
				@pauseImage = new google.maps.MarkerImage 'images/pause.ico', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25)
				@marker = new google.maps.Marker({
					map: @map
					icon : @playImage
				});

				self = @
				google.maps.event.addListener(@marker, 'click', ->
					self.markerClicked(this)
				)
				google.maps.event.addListener(@autocomplete, 'place_changed', @placeChanged)

			markerClicked : (marker)=>
				if !marker
					@marker.started = false;
					@marker.setIcon @playImage
					@audioPlayer.pause()
				else
					if marker.started	
						marker.started = false;
						marker.setIcon @playImage
						@audioPlayer.pause()
					else
						marker.started= true;
						marker.setIcon @pauseImage
						@audioPlayer.load(@audio)
						@audioPlayer.play()

			placeChanged : =>
				@$('.middle-content').attr('map', 'true')
				place = @autocomplete.getPlace();
				if (!place.geometry)
					return;

				if (place.geometry.viewport)
					@map.fitBounds(place.geometry.viewport);
				else
					@map.setCenter(place.geometry.location);
					@map.setZoom(17);

				@marker.setPlace(({
					placeId: place.place_id,
					location: place.geometry.location
				}));


				@marker.setVisible(true);
				@$('.latitude-value').html(place.geometry.location.lat())
				@$('.longitude-value').html(place.geometry.location.lng())