define ['router', 'backbone'],
	(Router, Backbone)->
		initialize = ->
			@appRouter = new Router
			Backbone.history.start({pushState: true})

		getRouter = ->
			return @appRouter

		return {
			initialize : initialize,
			getRouter : getRouter
		}