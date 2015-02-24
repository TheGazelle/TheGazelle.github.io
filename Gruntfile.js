module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      jade: {
        tasks: ["jade:publish"],
        files: ["**/*.jade", "**/*.md", "!layouts/*.jade"]
      }
    },
    jade: {
        publish: {
            options: {
                client: false,
                pretty: true
            },
            files: [ {
              cwd: "src/jade",
              src: "**/*.jade",
              dest: "",
              expand: true,
              ext: ".html"
            } ]
        }
      },
    web: {
      options: {
        port: 8001
      }
    },
    jekyll: {
      options: {                          // Universal options
        bundleExec: true,
        serve: true,

      },
      serve : {
        serve: true,
        server : true,
        server_port : 4000,
        auto : true
      },
      dev: {
        src: 'templates',
        dest: 'dev'
      },
      prod: {
        src: 'templates',
        dest: 'prod'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('default', ['jade:publish']);
  grunt.registerTask('publish', ['jade:publish']);
  grunt.registerTask('test', ['jekyll:serve'])

  grunt.registerTask('web', 'Start web server...', function() {
    var options = this.options();
    var connect = require('connect');
    connect.createServer(
        connect.static(__dirname)
    ).listen(options.port);
    console.log('http://localhost:%s', options.port);

    grunt.task.run(["watch:jade"]);
  });

};