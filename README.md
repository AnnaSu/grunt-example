## grunt-example


# Grunt介紹

### 目錄

本次筆記內容如下:

* 前言
* Grunt安裝
* Grunt常用插件
  - grunt-contrib-uglify
  - grunt-contrib-qunit
  - grunt-contrib-concat
  - grunt-contrib-jshint
  - grunt-contrib-watch


***

### 前言

[Grunt官網]( http://gruntjs.com/)

>Grunt是基於Node所建構的，所以要先裝Node，
>請先到 http://nodejs.org/，針對你的OS下載對應的版本。

***

### Grunt安裝

1.安装Grunt的命令列工具

```
npm install -g grunt-cli
```
>-g 是指會將Grunt安裝到全域環境下，讓你可以存取gulp的CLI。

輸入 grunt 測試一下有沒有安裝完成

```
grunt
```
發現錯誤:

```
Fatal error: Unable to find local grunt.
```
因為grunt命令執行，必須於所在目錄中包括package.json和Gruntfile.js兩個文件。

* package.json，是npm項目配置文件

* Gruntfile.js，是專門用來配置grunt的配置文件

***

2.建立package.json

npm init 會自動創建一個基本的package.json文件

```
npm init 
```
根據指令提示，一步步輸入內容後，
即可產生一個基本的package.json文件

```
{
  "name": "EIP",
  "version": "0.0.1",
  "description": "Doggy's EIP",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

***
3.安装Grunt

輸入指令如下

```
npm install grunt --save-dev
```

>Grunt 和Grunt 任務會用的到外掛，都必須列在package.json檔案的devDependencies 中，在指令裡加入-save-dev，可以直接將安裝插件寫入package.json檔案裡。

***

4.安装grunt插件

先來安裝一個常見的grunt插件
用來檢查js程式碼

輸入指令如下

```
npm install jshint --save-dev

```

####本範例檔案需要安裝的插件如下:


```
npm install grunt-contrib-uglify --save-dev
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-contrib-watch --save-dev
npm install grunt-contrib-sass --save-dev

```
或直接輸入

```
npm install grunt-contrib-uglify grunt-contrib-concat grunt-contrib-jshint grunt-contrib-watch grunt-contrib-sass --save-dev

```

***

5.建立Gruntfile文件

#### grunt-contrib-jshint-用來檢查js程式碼
```
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
            options: {
                // '-W033': true,
                globals: {
                    exports: true
                }
            },
            pre: ['src/*.js'],
            after: ['build/*.js'],
        },

    watch: {
                files: ['src/*.js'],
                tasks: ['jshint']
            }
    });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);

};
```
由於忘記加分號是常見的錯誤，對程式來說沒有什麼大問題，
所以我捫可以去除掉這個錯誤偵測。

透過下列這段指令，可以忽略掉分號的錯誤
```
'-W033': true 
```

***
#### grunt-contrib-uglify-用來壓縮 js程式碼
```
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
    }
  });

  // 載入可以提供 uglify task 的 plugin
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 預設的 task
  grunt.registerTask('default', ['uglify']);

};
```
### 執行

我們已經安裝完成grunt 以及 uglify的插件了

那我們來新增檔案，執行檔案壓縮的任務吧!

1.新增src和build資料夾
* src 放原始檔案
* build 放編譯後的檔案

2.在src資料夾裡面，新增hello.js檔案
3.執行檔案壓縮任務

輸入
```
grunt
```
輸出錯誤訊息
```
Loading "Gruntfile.js" tasks...ERROR
>> Error: Unable to parse "package.json" file (Unexpected string).
Warning: Task "default" not found. Use --force to continue.

Aborted due to warnings.
```
錯誤顯示是package.json的錯誤，結果發現我少打一個逗號。
修正後再輸入grunt

輸入
```
grunt
```
輸出錯誤訊息
```
>> Local Npm module "grunt-contrib-uglify" not found. Is it installed?
Warning: Task "uglify" not found. Use --force to continue.

Aborted due to warnings.
```
錯誤顯示是找不到grunt-contrib-uglify這個模組，我們必須先安裝才可以唷!

安裝uglify，指令輸入如下

```
npm install grunt-contrib-uglify --save-dev
```

修正後再輸入grunt

輸入
```
grunt
```
輸出
```
Running "uglify:build" (uglify) task
>> Destination build/EIP.min.js not written because src files were empty.
>> No files created.

Done, without errors.
```
終於成功啦!

***

##其他套件
####grunt-contrib-concat

1.安裝grunt-contrib-concat
```
npm install grunt-contrib-concat --save-dev
```

2.修改Gruntfile文件，加入concat
```
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
    }
  });

  // 載入可以提供 uglify task 的 plugin
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // 預設的 task
  grunt.registerTask('default', ['uglify','concat']);

};
```
3.執行

在src目錄，新增加文件src/hiConcat.js

```
var sayHi = function(name){
	return "Hi " + name;
}
```

輸入
```
grunt concat
```
輸出
```
Running "concat:dist" (concat) task
File build/hello.cat.js created.

Done, without errors.
```
兩個文件成功合併摟!

***
####grunt-contrib-qunit
用來執行QUint單元測試的任務

1.安裝grunt-contrib-qunit插件並更新到配置
```
npm install grunt-contrib-qunit --save-dev
```
2.修改Gruntfile文件，加入qunit
```
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      files: ['test/*.html']
    }
  });
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.registerTask('default', ['uglify','concat','qunit']);
```
3.新增一個test目錄，並編寫用於測試的qunit.html文件
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QUnit Example</title>
  <link rel="stylesheet" href="http://code.jquery.com/qunit/qunit-1.15.0.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="http://code.jquery.com/qunit/qunit-1.15.0.js"></script>
  <script>
  test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});
  </script>
</body>
</html>
```

輸入
```
grunt qunit
```
結果
```
Running "qunit:files" (qunit) task
Testing test/qunit.html .OK
>> 1 assertions passed (24ms)

Done, without errors.
```
成功完成測試的任務!

相關檔案可至qunit 官方網站下載
[qunit 官方網站](http://qunitjs.com/)

***
###grunt-contrib-jshint
用來執行檢查程式碼的任務

1.安裝grunt-contrib-jshint插件並更新到配置

```
npm install grunt-contrib-jshint --save-dev
```
2.修改Gruntfile文件，加入jshint
```
jshint: {
        files: ['src/*.js','build/*.js'],
        options: {
            globals: {
                exports: true
            }
        }
    }
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.registerTask('default', ['jshint']);
```
3.執行jshint
```
grunt jshint
```
出現錯誤
```
Running "jshint:files" (jshint) task

   src\hello.js
      3 |}
          ^ Missing semicolon.
   src\hiConcat.js
      3 |}
          ^ Missing semicolon.
   build\hello.cat.js
      5 |}
          ^ Missing semicolon.
   build\hello.min.js
      2 |var sayHello=function(a){return"Hello "+a};
                                                  ^ Missing semicolon.

>> 4 errors in 5 files
```
是因為分號的問題
忽略錯誤再執行
```
jshint: {
        files: ['gruntfile.js','src/*.js','build/*.js'],
        options: {
            '-W033': true,
            globals: {
                exports: true
            }
        }
    }
```
3.解決錯誤再重新執行

```
C:\Users\anna.AD1\Documents\_Anna-檔案\多奇專案-Anna\EIP_grunt>grunt jshint
Running "jshint:files" (jshint) task
>> 5 files lint free.

Done, without errors.
```

***
##grunt-contrib-watch
是監控指定文件被修改，重新啟動已註冊的任務

1.安裝grunt-contrib-watch
```
npm install grunt-contrib-watch --save-dev
```
2.修改Gruntfile文件，加入watch
```
watch: {
            files: ['src/*.js'],
            tasks: ['uglify','concat','qunit','jshint']
        }
grunt.loadNpmTasks('grunt-contrib-watch');    
```
3.執行watch任務
輸入指令，進入watch狀態
```
grunt watch
```

***
###grunt-contrib-sass

1.安裝grunt-contrib-sass
```
npm install grunt-contrib-sass --save-dev
```

2.修改Gruntfile文件，加入sass
```
sass: {                              
      tocss: {
        options: {       
          style: 'compressed',
          sourcemap:'none' 
        },
        files: [{
          expand:true,
          cwd:'sass',
          src:['**/*.scss','**/*.sass'],
          dest: 'css',
          ext: '.css'
        }]
    }
  }
```
建立一個名稱為sass的資料夾，裡面放sass檔案

* cwd 來源資料夾名稱
* src 來源檔案
* dest 輸出資料夾名稱
* ext 輸出格式

3.執行

```
grunt sass
```
***

### 其他指令

移除GRUNT

```
npm uninstall -g grunt

```

***
### 參考來源

* [grunt讓Nodejs規範起來](http://blog.fens.me/nodejs-grunt-intro/)
* [【grunt整合版】30分鐘學會使用grunt打包前端代碼](http://www.cnblogs.com/yexiaochai/p/3603389.html)
* [[教學] Grunt 學習筆記(2) - 打造更流暢的前端開發流程](http://www.tuicool.com/articles/2u2ENz)
* [Grunt──網站開發的自動化任務執行工具](http://blog.kidwm.net/283)
* [應用Grunt自動化地優化你的項目前端](http://www.cnblogs.com/vajoy/p/3983831.html)
* [Setting up Sass with Grunt](http://culttt.com/2013/11/18/setting-sass-grunt/)


