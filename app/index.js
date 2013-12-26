'use strict';


var util = require('util')
  ,path = require('path')
  ,yeoman = require('yeoman-generator')
  ,BeeweeGenerator;


BeeweeGenerator = module.exports = function BeeweeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.testFramework = options['test-framework'] || 'mocha';
  this.coffee = options.coffee;

  options['test-framework'] = this.testFramework;

  this.hookFor('test-framework', {
    as: 'app'
   ,options: {
      options: {
        'skip-install': options['skip-install-message'],
        'skip-message': options['skip-install']
      }
   }
  });

  this.options = options;

  // this.on('end', function () {
  //   this.installDependencies({ skipInstall: options['skip-install'] });
  // });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BeeweeGenerator, yeoman.generators.Base);

BeeweeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  if (!this.options['skip-welcome-message'])
  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log('Out of the box I include [[some stuff]].');

  var prompts = [{
    name: 'name'
   ,message: 'The name of your project:'
  }, {
    type: 'checkbox'
   ,name: 'features'
   ,message: 'What else do you need?'
   ,choices: [{
      name: 'Modernizr'
     ,value: 'modernizr'
     ,checked: true
   }]
  }];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) {
      return features.indexOf(feat) !== -1;
    }

    this.name = answers.name;
    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.modernizr = hasFeature('modernizr');

    cb();
  }.bind(this));
};

BeeweeGenerator.prototype.gruntfile = function gruntfile () {
  this.template('Gruntfile.js');
}

BeeweeGenerator.prototype.app = function app() {

  // Create project directories
  this.mkdir('app');
  this.mkdir('app/scss');
  this.mkdir('app/img');
  this.mkdir('app/js');

  // If the user requires inuit.css, copy it over
  if ( this.inuit === true ) {
    this.directory('inuit.css', 'app/scss/inuit.css');
  }

  // If the user requires modernizr, copy it over
  if ( this.modernizr === true ) {
    this.directory('modernizr', 'app/js/lib/vendor/modernizr');
  }

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_index.html', 'app/index.html');

};

BeeweeGenerator.prototype.projectfiles = function projectfiles() {

  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};
