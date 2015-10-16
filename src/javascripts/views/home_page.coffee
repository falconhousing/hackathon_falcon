define [
	'marionette'
	'templates/home_page'
	'audiojs'
	], (Marionette, temp)->
	class HomePage extends Marionette.ItemView

		el: '#main-content'

		template: temp

		markers: [
			{lat: 51.508742, lon: -0.120850, mid : 1, audio: 'http://kolber.github.io/audiojs/demos/mp3/juicy.mp3'},
			{lat: 53.508742, lon: -0.120850, mid : 2, audio: 'http://www.w3schools.com/html/horse.mp3'},
			{lat: 55.508742, lon: -0.120850, mid : 3, audio: 'http://kolber.github.io/audiojs/demos/mp3/juicy.mp3'}
		]

		initialize: ->
			window.q = @
			@render()

		onRender: ->
			@initAudioJS()
			@initMap()
			@setMarkers()
			@prevMarker = null

		initAudioJS: () ->
			audiojs.events.ready ()=> 
				@audioPlayer = audiojs.createAll()[0]

		initMap: ->
			myCenter = new google.maps.LatLng(51.508742,-0.120850);
			mapProp = 
				center:myCenter
				zoom:5
				mapTypeId:google.maps.MapTypeId.ROADMAP

			@map = new google.maps.Map @$('.map-container')[0], mapProp

			@playImage = new google.maps.MarkerImage 'images/play.png', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25)
			@pauseImage = new google.maps.MarkerImage 'images/pause.png', new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25)

		setMarkers: ->
			i = 0
			self = @
			while i < @markers.length
				curMarker = @markers[i]
				marker = new google.maps.Marker
					position	:	new google.maps.LatLng(curMarker.lat, curMarker.lon)
					mid			: 	curMarker.mid
					audio 		:	curMarker.audio
					icon		: 	@playImage
				marker.setMap @map
				google.maps.event.addListener marker, 'click', (e) -> 
					self.markerClicked(e, this)
				i++

		markerClicked: (event, marker) ->
			if @prevMarker
				@audioPlayer.pause()
				@prevMarker.setIcon @playImage
			else 
				@$('.audio-player').removeClass 'hide'

			marker.setIcon @pauseImage
			@prevMarker = marker
			@audioPlayer.load(marker.audio)
			@audioPlayer.play()

	return HomePage
