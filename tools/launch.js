var child_process = require('child_process');
var fs = require('fs');
var path = require('path');

/*
* 删除libs
* */
function delDir(dist, cb) {
  //child_process.spawn('rm', ['-rf', dist]);
  child_process.exec('rm -rf ' + dist, () => {
    cb();
  });
}

/*
* 从rax-map 拷贝libs
* */
function copyDir(src, dist, cb) {
  //child_process.spawn('cp', ['-r', src, dist]);
  child_process.exec('cp -r ' + src + ' ' + dist, () => {
    cb();
  });
}

/*
* 给libs里的文件增加,import React from 'rax';
* */
function changeFile(path) {
  fs.readFile(path, 'utf8', function (err, files) {
    if (err) {
      console.log('err:', err);
      return;
    }
    var newContent = "import React from 'rax';\n" + files;
    //console.log(newContent)
    fs.writeFile(path, newContent, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  })
}

function changeFileContent(filepath) {
  fs.stat(filepath, function (err, stats) {
    if (err) {
      console.log('err:', err);
      return;
    }
    if (stats.isFile()) {
      var filename = path.basename(filepath);
      var suffix = (/\.[^\.]+/.exec(filename))[0];
      if (suffix === '.js') {
        changeFile(filepath);
      }
    } else if (stats.isDirectory()) {
      //console.log("============["+filepath+"] isDir===========");
      renameFilesInDir(filepath);
    } else {
      console.log("unknow type of file");
    }
  });
}

function renameFilesInDir(dir) {
  fs.readdir(dir, function (error, files) {
    var len = files.length;
    var file = null;
    for (var i = 0; i < len; i++) {
      file = files[i];
      changeFileContent(dir + "/" + file);
    }
  });
}


delDir('libs', () => {
  console.log('===>','删除成功');
  copyDir('rax-map', 'libs', () => {
    console.log('===>','拷贝成功');
    var myPath = path.resolve(__dirname + '/libs');
    changeFileContent(myPath)
  });
});




