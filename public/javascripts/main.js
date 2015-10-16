requirejs.config({
  paths: {
    'underscore': 'libs/underscore',
    'jquery': 'libs/jquery',
    'backbone': 'libs/backbone',
    'marionette': 'libs/marionette',
    'jade': 'libs/jade',
<<<<<<< HEAD
=======
    'slick': 'libs/slick',
    'cascade': 'libs/jquery.cascadingdropdown',
>>>>>>> fe81b7e84981d1999cd2dfd97307da3c8164b4de
    'audiojs': 'libs/audio.min'
  },
  shims: {
    'backbone': {
      deps: ['underscore', 'jquery']
    },
    'marionette': {
      deps: ['underscore', 'jquery', 'backbone']
    },
    'cascade': {
      deps: ['jquery']
    }
  }
});

requirejs(['index'], function(Index) {
  return Index.initialize();
});
