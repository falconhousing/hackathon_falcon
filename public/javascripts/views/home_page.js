var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['marionette'], function(Marionette) {
  var HomePage;
  HomePage = (function(superClass) {
    extend(HomePage, superClass);

    function HomePage() {
      return HomePage.__super__.constructor.apply(this, arguments);
    }

    HomePage.prototype.initialize = function() {};

    return HomePage;

  })(Marionette.ItemView);
  return HomePage;
});
