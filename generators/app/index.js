'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const username = require('username');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to this nifty ' + chalk.red('moria') + ' generator!'
    ));



    // Get the current user's name
    username()
      .then(username => {

        return [
          {
            type: 'input',
            name: 'name',
            message: 'What would you like to call your app?',
            default: this.appname,
            store: true
         },
         {
           type: 'input',
           name: 'version',
           message: 'Which version is your app at?',
            default: '0.1.0',
           store: true
         },
         {
           type: 'input',
           name: 'description',
            message: 'What is your app about?',
           default: 'A lean Mithril app with Skeleton styling.',
            store: true
          },
          {
            type: 'input',
            name: 'repoType',
            message: 'Which type of VCS do you (want to) use?',
            default: 'git',
            store: true
          },
          {
            type: 'input',
            name: 'repoUrl',
            message: 'Where can your repository be found?',
            default: 'https://github.com/' + username + '/' + this.appname,
            store: true
          },
          {
            type: 'input',
            name: 'author',
            message: 'Who shall we list as the author?',
            default: username,
            store: true
          },
          {
            type: 'input',
            name: 'license',
            message: 'Which license do you want to apply?',
            default: 'ISC',
            store: true
          }
        ];

        })
      .then( (prompts) => {
        this.prompt(prompts, function (props) {
          this.props = props;
          done();
        }.bind(this));
      });
  },

  writing: function () {

    // Set up package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        version: this.props.version,
        description: this.props.description,
        repoType: this.props.repoType,
        repoUrl: this.props.repoUrl,
        author: this.props.author,
        license: this.props.license
      }
    );

    // Set up license
    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      {
      }
    );

    // Set up README.md
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
      }
    );

    // Set up CHANGELOG.md
    this.fs.copyTpl(
      this.templatePath('CHANGELOG.md'),
      this.destinationPath('CHANGELOG.md'),
      {
      }
    );

    // Set up index.html
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {
        title: this.props.name,
        description: this.props.description
      }
    );

  },

  install: function () {
    this.installDependencies({npm:true, bower: false});
  }
});
