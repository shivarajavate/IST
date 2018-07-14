module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            less: {
                files: '**/*.less', // ** any directory; * any file
                tasks: ['less', 'cssmin']
            },
            uglify: {
                files: 'app/scripts/**/*.js',
                tasks: ['copy', 'uglify']
            }
        },
        less: {
            dev: {
                // indicates that it will be used only during development   
                files: [
                    {
                        expand: true,
                        cwd: 'app/assets/styles/less',
                        src: ['*.less'],
                        dest: 'app/assets/styles/css/',
                        ext: '.css'
                    }
                ]
            }
        },
        cssmin: {
            minify: {
                files: {
                    'dist/app/assets/styles/css/main.min.css': 'app/assets/styles/css/*.css'
                }
            }
        },
        uglify: {
            target: {
                files: {
                    'dist/app/scripts/common.min.js': 'app/scripts/common/*.js',
                    'dist/app/scripts/controllers.min.js': 'app/scripts/controllers/*.js',
                    'dist/app/scripts/directives.min.js': 'app/scripts/directives/*.js',
                    'dist/app/scripts/project.min.js': 'app/scripts/project/*.js',
                    'dist/app/scripts/routes.min.js': 'app/scripts/routes/*.js',
                    'dist/app/scripts/services.min.js': 'app/scripts/services/*.js'
                }
            }
        },
        eslint: {
            options: {
                configFile: '.eslintrc',
                ignorePath: '.eslintignore',
                format: 'html',
                outputFile: 'logs/eslint.error.report.html',
                failOnError: false
            },
            target: ['app/**/*.js', 'server/**/*.js']
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components',
                        src: [
                            'angular/angular.min.js',
                            'angular-cookies/angular-cookies.min.js',
                            'angular-route/angular-route.min.js',
                            'angular-ui-router/release/angular-ui-router.min.js',
                            'autosize/dist/autosize.min.js',
                            'jquery/dist/jquery.min.js',
                            'konva/konva.min.js',
                            'vis/dist/vis.min.js',
                            'undo-manager/lib/undomanager.js'
                        ],
                        flatten: true,
                        dest: 'app/common/js',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components',
                        src: [
                            'bootstrap/dist/css/bootstrap.min.css',
                            'font-awesome/web-fonts-with-css/css/fontawesome.min.css',
                            'vis/dist/vis.min.css',
                            'vis/dist/vis-network.min.css'
                        ],
                        flatten: true,
                        dest: 'app/common/css',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components',
                        src: [
                            'vis/dist/img/network/*'
                        ],
                        flatten: true,
                        dest: 'app/common/css/img/network',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components',
                        src: [
                            'angular/angular.min.js',
                            'angular-cookies/angular-cookies.min.js',
                            'angular-route/angular-route.min.js',
                            'angular-ui-router/release/angular-ui-router.min.js',
                            'autosize/dist/autosize.min.js',
                            'bootstrap/dist/js/bootstrap.min.js',
                            'jquery/dist/jquery.min.js',
                            'konva/konva.min.js',
                            'vis/dist/vis.min.js',
                            'undo-manager/lib/undomanager.js'
                        ],
                        flatten: true,
                        dest: 'dist/app/common/js',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components',
                        src: [
                            'bootstrap/dist/css/bootstrap.min.css',
                            'font-awesome/web-fonts-with-css/css/fontawesome.min.css',
                            'vis/dist/vis.min.css',
                            'vis/dist/vis-network.min.css'
                        ],
                        flatten: true,
                        dest: 'dist/app/common/css',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components',
                        src: [
                            'vis/dist/img/network/*'
                        ],
                        flatten: true,
                        dest: 'dist/app/common/css/img/network',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '',
                        src: [
                            '**/*',
                            '!app/sprints/**',
                            '!app/index.html',
                            '!app/readme.txt',
                            '!**/dist/**',
                            '!**/styles/**',
                            '!**/scripts/**',
                            '!**/bower_components/**',
                            '!**/logs/**',
                            '!**/node_modules/**',
                            '!bower.json',
                            '!Gruntfile.js',
                            '!package-lock.json'
                        ],
                        dest: 'dist/'
                    }
                ]
            }
        }
    });

    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('deploy', ['less', 'copy', 'cssmin', 'uglify', 'eslint']);
    grunt.registerTask('report', ['eslint']);
};