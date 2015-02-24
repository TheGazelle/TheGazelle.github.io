module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
    shell: {
          jekyllBuild: {
              command: 'jekyll build'
          }
    },
    connect: {
        server: {
            options: {
                port: 4000,
                base: '_site'
            }
        }
    },
    watch: {
      livereload: {
        files: [
            '_config.yml',
            'index.html',
            '_layouts/**',
            '_posts/**',
            '_includes/**',
            'css/**',
            'js/**',
            'img/**',
            '_sass/**',
        ],
        tasks: ['shell:jekyllBuild'],
        options: {
          livereload: true
        },
      },
      jade: {
          tasks: ["jade:publish"],
          files: ["**/*.jade", "**/*.md", "!layouts/*.jade"]
        }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['shell', 'connect', 'watch']);
  grunt.registerTask('publish', ['jade:publish']);
  grunt.registerTask('build', ['jade:publish', 'shell:jekyllBuild']);
  grunt.registerTask('test', ['shell', 'connect', 'watch']);

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