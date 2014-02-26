'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt)
{

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'modules',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['{.tmp,<%= yeoman.app %>}/{,*/}*.js'],
                tasks: ['newer:jshint:all']
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            less: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                tasks: ['less:style', 'newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js', '<%= yeoman.app %>/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp', '<%= yeoman.dist %>/*', '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/images'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/**/img/*',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}', '.htaccess', 'bower_components/**/*', 'images/{,*/}*.{webp}', 'fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: [
                            'generated/*'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles', 'imagemin', 'less', 'svgmin'
            ]
        },

        cssmin: {
            dist: {
                files: [
                    { dest: 'dist/styles/main.css',
                        src: [ '.tmp/concat/styles/main.css' ] },
                    { dest: 'dist/styles/main.css',
                        src: [ '.tmp/concat/styles/main.css' ] }
                ]
            }
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: false,
                    sourceMapIncludeSources: false
                },
                files: [
                    { dest: 'dist/scripts/angularjs-itc-utils.min.js',
                        src: [ '.tmp/concat/scripts/angularjs-itc-utils.min.js' ] }
                ]
            }
        },
        concat: {
            dist: {},
            generated: {
                files: [
                    { dest: '.tmp/concat/styles/main.css',
                        src: [ '.tmp/styles/main.css' ] },
                    { dest: '.tmp/concat/scripts/angularjs-itc-utils.min.js',
                        src: ['modules/*.js', 'modules/**/*.js'] },
                    { dest: '.tmp/concat/scripts/angularjs-itc-utils.min.js',
                        src: ['modules/*.js', 'modules/**/*.js'] }
                ]}
        },

        // Test settings
        karma: {
            e2e: {
                configFile: 'karma-e2e.conf.js',
                singleRun: true
            },
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        less: {
            style: {
                files: {
                    '<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/styles/main.less'
                }
            }
        },
        bump: {
            options: {
                files: ["source/*.js", "spec/*.js"],
                updateConfigs: ["pkg"],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        },
        changelog: { options: { dest: 'CHANGELOG.md' } }
    });

    grunt.registerTask('test', [
        'clean:server', 'concurrent:test', 'autoprefixer', 'less', 'connect:test', 'karma'
    ]);

    grunt.registerTask('test:unit', [
        'clean:server', 'concurrent:test', 'autoprefixer', 'connect:test', 'connect:livereload', 'karma:unit'
    ]);

    grunt.registerTask('test:e2e', [
        'clean:server', //        'concurrent:server',
        'karma:e2e'
    ]);

    grunt.registerTask('build', [
        'clean:dist', 'concurrent:dist', 'autoprefixer', 'concat', 'ngmin', 'copy:dist', 'cssmin', 'uglify'
    ]);

    grunt.registerTask('default', [
        'newer:jshint', 'test', 'build'
    ]);

//    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};
