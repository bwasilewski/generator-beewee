'use strict';
var util = require('util')
  ,path = require('path')
  ,yeoman = require('yeoman-generator')
  ,BeeweeGenerator;


BeeweeGenerator = module.exports = function BeeweeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BeeweeGenerator, yeoman.generators.Base);

BeeweeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'name'
    ,message: 'What will you name your new project?'
  }, {
    type: 'confirm'
    ,name: 'inuit'
    ,message: 'Would you like to include Inuit.css?'
    ,default: true
  }];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    this.inuit = props.inuit;

    cb();
  }.bind(this));
};

BeeweeGenerator.prototype.app = function app() {

  this.mkdir('app');
  this.mkdir('app/scss');
  this.mkdir('app/img');
  this.mkdir('app/js');

  if ( this.inuit === true ) {
    this.directory('inuit.css', 'app/scss/inuit.css');
  }

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_index.html', 'app/index.html');

};

BeeweeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};
