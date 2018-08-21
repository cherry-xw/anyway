module.exports = {
  root: process.cwd(), // 根路径
  hostname: '127.0.0.1', // 启动IP
  port: 6400, // 启动端口号
  compress: /\.(html|js|css|md)/,  // 配置压缩规则
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
};
