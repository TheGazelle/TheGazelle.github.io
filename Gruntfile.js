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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-contrib-jade");

  grunt.registerTask('default', ['jade:publish']);
  grunt.registerTask('publish', ['jade:publish']);

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