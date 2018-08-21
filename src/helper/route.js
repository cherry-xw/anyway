const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const mine = require('./mine');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache');

const tplPath = path.join(__dirname, '../template/dir.tpl');
/**
 * 这里使用同步方法的原因：
 * 1. 当前后续 使用的操作都是依托于当前执行结束之后
 * 2. 类似单例模式，在启动项目的时候就把这个模板文件启动好，后期就不需要每次加载了
**/
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = async function (req, res, filePath, config) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      const contentType = mine(filePath);
      res.setHeader('Content-Type', `${contentType}; charset=utf-8`);
      if (isFresh(stats, req, res)) { // 首先判断是否使用缓存
        res.statusCode = 304;
        res.end();
        return;
      }
      let rs;
      const {code, start, end} = range(stats.size, req, res);
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206; // 部分内容
        rs = fs.createReadStream(filePath, {start, end});
      }
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      const dir = path.relative(config.root, filePath);
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file: file,
            icon: mine(file)
          };
        })
      };
      res.end(template(data));
    }
  } catch (error) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} is not a directory or file \n${error.toString()}`);
    console.error(error.toString());
  }
};
