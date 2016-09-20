module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: ['app/**.js', 'app/pages/**/**.js', 'app/components/**/**.js', 'app/services/**.js', 'dist/templates.js'],
                dest: 'dist/concat.js'
            }
        },
        connect : {
            server : {
                options : {
                    port: 3000,
                    hostname: '*',
                    livereload: true
                }
            }
        },
        ngtemplates: {
          app: { 
            cwd: 'app/',               
            src: ['pages/**/**.html', 'components/**/**.html'],
            dest: 'dist/templates.js'
          },
          options: {
            module: 'myApp',
            url:    function(url) { 
                var url = url.split("/");
                return url[url.length-1].replace('.html', '');
            },
            htmlmin:  { collapseWhitespace: true, collapseBooleanAttributes: true }
          }
        },
        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "dist/app.css": "assets/less/app.less",
                },
                cleancss: true
            },

        },
        // csssplit: {
        //     your_target: {
        //         src: ['css/app.css'],
        //         dest: 'css/app.min.css',
        //         options: {
        //             maxSelectors: 4095,
        //             suffix: '.'
        //         }
        //     },
        // },
        watch: {
            options : {
                livereload: true
            },
            html: {
                files: ['app/**/**/**.html', 'app/**/**/**.html'], // which files to watch
                tasks: ['ngtemplates']
            },
            js: {
                files: ['app/**/**/**.js', 'app/**/**.js'], // which files to watch
                tasks: ['concat']
            }
        },
        clean: {
          js: ['dist/']
        },
        uglify: {
            my_target: {
              options: {
                sourceMap: true,
                sourceMapName: 'dist/sourcemap.map'
              },
              files: {
                'dist/production.min.js': ['dist/concat.js']
              }
            }
        }
    });
  
    // Load the plugin that provides the "less" task.
    //grunt.loadNpmTasks('grunt-devserver');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-csssplit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
  
    // Default task(s).
    grunt.registerTask('default', ['ngtemplates', 'concat', 'less', 'connect', 'watch']);
    grunt.registerTask('prod', ['clean', 'ngtemplates','concat', 'less', 'uglify', 'connect']);
    
};