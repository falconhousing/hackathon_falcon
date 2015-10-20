var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['backbone'], function(Backbone) {
  var AppRouter;
  AppRouter = (function(superClass) {
    extend(AppRouter, superClass);

    function AppRouter() {
      this.gotoMain = bind(this.gotoMain, this);
      return AppRouter.__super__.constructor.apply(this, arguments);
    }

    AppRouter.prototype.routes = {
      '': 'indexView',
      'main': 'mainView'
    };

    AppRouter.prototype.initialize = function() {};

    AppRouter.prototype.indexView = function() {
      return $('.login-btn').on('click', this.gotoMain);
    };

    AppRouter.prototype.gotoMain = function() {
      return this.navigate('main');
    };

    AppRouter.prototype.mainView = function() {
      var path;
      path = 'views/searchPlaces';
      return this.startIndexView(path);
    };

    AppRouter.prototype.startIndexView = function(path, options, callback) {
      return require([path], (function(_this) {
        return function(IndexView) {
          _this.prevView = _this.currentView;
          if (!_this.prevView || _this.currentView.pageType !== _this.prevView.pageType) {
            _this.currentView = new IndexView(options);
            if (_this.prevView) {
              _this.prevIndex.destroy();
            }
          }
          if (callback) {
            return callback();
          }
        };
      })(this));
    };

    AppRouter.prototype.handleHREF = function() {
      return console.log("Yoo");
    };

    return AppRouter;

  })(Backbone.Router);
  return AppRouter;
});
