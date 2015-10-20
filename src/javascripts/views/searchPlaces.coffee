define ['marionette', 'templates/list_item', 'audiojs'], 
	(Marionetee, tpl)->
		class searchPlaceView extends Marionetee.CompositeView
			template : tpl
			el : ".main-container"
			initialize : ->
				@initAudioJS()
				@renderMaps()

			initAudioJS: () ->
				@self =@
				audiojs.events.ready ()=> 
					@audioPlayer = audiojs.createAll()[0]

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
				@marker = new google.maps.Marker({
					map: @map
				});

				google.maps.event.addListener(@autocomplete, 'place_changed', @placeChanged)

			# markerClicked : (marker)=>
			# 	if !marker
			# 		@marker.started = false;
			# 		@marker.setIcon @playImage
			# 		@audioPlayer.pause()
			# 	else
			# 		if marker.started	
			# 			marker.started = false;
			# 			marker.setIcon @playImage
			# 			@audioPlayer.pause()
			# 		else
			# 			marker.started= true;
			# 			marker.setIcon @pauseImage
			# 			@audioPlayer.load(@audio)
			# 			@audioPlayer.play()

			markerClicked: (event, marker) =>
				if @prevMarker
					@audioPlayer.pause()
					@prevMarker.setIcon @playImage
				else 
					@$('.audio-player').removeClass 'hide'

				marker.setIcon @pauseImage
				@prevMarker = marker
				@audioPlayer.load(marker.audio)
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

				$.ajax(
					url : "http://dharmendrav.housing.com:4000/get_feed", 
					method : "GET", 
					data : {
						source : "web",
						latitude : place.geometry.location.lat(), 
						longitude : place.geometry.location.lng()
					},
					success : (data)=>
						@makeMarkers(data.stories)
				)


			makeMarkers : (stories)->
				@playImage = new google.maps.MarkerImage 'images/play.png', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25)
				@pauseImage = new google.maps.MarkerImage 'images/pause.ico', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25)
				i = 0
				self = @
				@marker = []
				while i < stories.length
					curMarker = stories[i]
					@marker[i] = new google.maps.Marker
						position	:	new google.maps.LatLng(curMarker.coordinates.latitude, curMarker.coordinates.longitude)
						audio 		:	curMarker.audio_url
						icon		: 	@playImage
					@marker[i].setMap @map
					google.maps.event.addListener @marker[i], 'click', (e) -> 
						self.markerClicked(e, this)
					i++

				@renderList(stories);

			renderList : (stories) ->
				i = 0
				while i < stories.length
					@$('.audio-list').append(@template({
						name : stories[i].name,
						image : stories[i].user_picture,
						place : stories[i].poi
						lct : stories[i].location
						audio : stories[i].audio_url
					}))
					@$('.audio-item').last().on 'click', @playMusic
					i++;
			
			playMusic : (event)=>
				index = $(event.currentTarget).index()
				@markerClicked(event, @marker[index])