'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.company %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		clean: {
			dependencies: ['dist/']
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			core: {
				src: [
					'src/enhance.js'
				],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		jshint: {
			all: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'src/*.js'
			}
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: ['<%= concat.core.src %>'],
				tasks: ['default']
			}
		},
		uglify: {
			js: {
				files: {
					'dist/<%= pkg.name %>.min.js': [ 'dist/<%= pkg.name %>.js' ]
				}
			}
		},
		bytesize: {
			dist: {
				src: [
					'dist/<%= pkg.name %>.min.js'
				]
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Default task.
	grunt.registerTask('travis', ['jshint']);
	grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'bytesize']);



};