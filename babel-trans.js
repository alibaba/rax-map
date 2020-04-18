var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
// var child_process = require('child_process');

var filePath = path.resolve('./api');

console.log('文件路径:', filePath);

// 调用文件遍历方法
fileDisplay(filePath);
// 把readme 加入到 api中
insertReadMe();

/*
* babel 编译单个文件
* */
function babelTrans(dirname) {
  var result = babel.transformFileSync(dirname, {
    'presets': ['es2015', 'stage-0', 'rax']
    // plugins: ['transform-runtime'],
  }, function(err, result) {// { code, map, ast }
    console.log(result);
  });
  var {code} = result;
  return code;
}

/*
* 如果没有文件夹就创建文件夹
* */
var createFolder = function(to) { // 文件写入
  var sep = path.sep;
  var folders = path.dirname(to).split(sep);
  var p = '';
  while (folders.length) {
    p += folders.shift() + sep;
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  }
};


/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  // 根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err);
    } else {
      // 遍历读取到的文件列表
      files.forEach(function(filename) {
        // 获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function(eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile();// 是文件
            var isDir = stats.isDirectory();// 是文件夹
            if (isFile && path.extname(filename) === '.js') {
              console.log(path.extname(filename), filedir.replace('api', 'lib'));
              var code = babelTrans(filedir);
              var newPath = filedir.replace('api', 'lib');
              createFolder(newPath);// 创建文件夹
              var newfile = fs.writeFileSync(newPath, code, 'utf8');//
              console.log('转换完成:', newPath);
            }
            if (isDir) {
              fileDisplay(filedir);// 递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}

function insertReadMe() {
  var headText =
    `---
      \rcategory: Article
      \rtitle: Rax-map 简介
      \rorder: 1
    \r---\n`;
  var rd = fs.readFileSync('./README.md', 'utf8');
  var thx = fs.readFileSync(path.join(__dirname, 'articles/thx.md'), 'utf8');
  if (rd && thx) {
    fs.writeFile(path.join(__dirname, 'articles/about.md'), headText + rd + thx, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('success');
      }
    });
  } else {
    console.log('读取README失败');
  }
}

// fs.writeFileSync('/Users/ryan/work/ali/github/rax-map/lib/modules/DetailSwiper/a.js','aaa');