define ['backbone'], (Backbone)->
	class AppRouter extends Backbone.Router
		routes:
			''							: 'indexView'
			'main'						: 'mainView'

		initialize : ->
			#@handleHREF()

		indexView : ->
			$('.login-btn').on('click', @gotoMain)

		gotoMain : =>
			this.navigate('main')

		mainView : ->
			path = 'views/searchPlaces'
			@startIndexView(path);

		startIndexView: (path, options, callback)->
			require [path], (IndexView)=>
				@prevView = @currentView;
				if !@prevView or @currentView.pageType != @prevView.pageType
					@currentView = new IndexView(options);
					if @prevView
						@prevIndex.destroy()

				if callback
					callback()

		handleHREF: ->
			console.log "Yoo"
			# self = this			
			# $(document).on 'click', 'a[href^="/"]', (e)->
			# 	href = $(e.currentTarget).attr 'href'

			# 	url = href
			# 			.replace  /^\//  , ''
			# 			.replace '\#\!\/', ''

			# 	self.navigate url, trigger: true
			# 	return false	

	return AppRouter