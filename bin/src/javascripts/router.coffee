define ['jquery', 'underscore', 'backbone'], ($, _, Backbone)->
	AppRouter = Backbone.Router.extend(
		routes:
			'': 'indexView'
			'repair': 'repairView'

		indexView : ->
			console.log('This is the handler for the base route')

		repairView : ->
			console.log('This is the handler for the repair route')
	)
	return AppRouter