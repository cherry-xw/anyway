const {cache} = require('../config/defaultConfig');

function refreshRes (stats, res) {
  const {maxAge, expires, cahceControl, lastModified, etag} = cache;

  if (expires) {
    res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString());
  }

  if (cahceControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  }

  if (lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString());
  }

  if (etag) {
    res.setHeader('ETag', `${stats.size}-${stats.mtime}`);
  }
}

module.exports = function isFresh(stats, req, res) {
  refreshRes(stats, res);
  const lastModified = req.headers['if-modified-since'];
  const etag = req.headers['if-none-match'];

  if (!lastModified && !etag) { // 如果没有，说明可能是第一次请求
    return false;
  }

  if (lastModified && lastModified !== res.getHeader('Last-Modified')) { // 如果有值，但是和设置的不一样，说明可能已经失效了
    return false;
  }

  if (etag && etag !== res.getHeader('ETag')) { // 如果有值，但是和设置的不一样，说明可能已经失效了
    return false;
  }

  return true; // 还是使用缓存
};
