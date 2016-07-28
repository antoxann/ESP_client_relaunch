module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
    // grunt.loadNpmTasks('grunt-csssplit');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
  
    // Default task(s).
    grunt.registerTask('default', ['ngtemplates','less', 'connect','watch']);
    
};