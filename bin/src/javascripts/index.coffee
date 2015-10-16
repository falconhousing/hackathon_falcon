define ['router', 'backbone'],
	(Router, Backbone)->
		initialize = ->
			appRouter = new Router
			window.aa = appRouter
			Backbone.history.start({pushState: true})

		return {
			initialize : initialize
		}