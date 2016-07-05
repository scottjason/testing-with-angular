module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-ui-router/release/angular-ui-router.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './src/scripts/app.js',
      './src/scripts/app.config.js',
      './src/scripts/controllers/main.ctrl.js',
      './src/scripts/directives/auth.directive.js',
      './src/scripts/directives/auth.directive.spec.js',
      'src/views/templates/auth.tpl.html'
    ],
    preprocessors: {
      "src/views/templates/auth.tpl.html": ["ng-html2js"]
    },
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
  })
}
