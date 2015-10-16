requirejs.config(
	paths:
		'underscore' 	: 'libs/underscore'
		'jquery' 		: 'libs/jquery'
		'backbone' 		: 'libs/backbone'
		'marionette' 	: 'libs/marionette'
		'jade'			: 'libs/jade'
		'audiojs'		: 'libs/audio.min'

	shims:
		'backbone' : {
			deps : ['underscore', 'jquery']
		},
		'marionette' : {
			deps: ['underscore', 'jquery', 'backbone']
		},
		'cascade'	: {
			deps: ['jquery']
		}
)

requirejs ['index'], 
	(Index) ->
		Index.initialize()
