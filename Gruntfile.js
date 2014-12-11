module.exports = function(grunt) {

  // 專案設定
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    concat:{
      options: {
        //定義每個文件之間插入分號做為連接輸出
        separator: ';'
      },
      dist: {
          src: ['src/*.js'],
          dest: 'build/<%= pkg.name %>.cat.js'
      }
    },
    jshint: {
        options: {
            '-W033': true,
            globals: {
                exports: true
            }
        },
        pre: ['gruntfile.js','src/*.js'],
        after: ['build/*.js'],
    },
    sass: {                              
      tocss: {
        options: {       
          style: 'compressed', //以壓縮模式來編譯css，取代grunt-contrib-cssmin插件
          sourcemap:'none'  //設定不要產生map文件
        },
        files: [{
          expand:true,
          cwd:'sass',
          src:['**/*.scss','**/*.sass'],
          dest: 'css',
          ext: '.css'
        }]
    }
  },
    qunit: {
      files: ['test/*.html']
  },
    watch: {
            files: ['src/*.js','sass/*.scss','sass/*.sass'],
            tasks: ['uglify','concat','jshint','sass']
        }
  });

  // 載入可以提供 uglify task 的 plugin
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 預設的 task
  grunt.registerTask('default', ['uglify','concat','jshint','sass','qunit','watch']);

};