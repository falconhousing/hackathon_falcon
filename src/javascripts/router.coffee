define ['backbone'], (Backbone)->
	class AppRouter extends Backbone.Router
		routes:
			''							: 'indexView'

		initialize : ->
			@handleHREF()

		indexView : ->
			@startIndexView('views/home_page', {})

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
			self = this			
			$(document).on 'click', 'a[href^="/"]', (e)->
				href = $(e.currentTarget).attr 'href'

				url = href
						.replace  /^\//  , ''
						.replace '\#\!\/', ''

				self.navigate url, trigger: true
				return false	

	return AppRouter