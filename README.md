# anyway

### 项目介绍
服务器文件查看器

### 软件架构


### gitignore规则
同步到git仓库忽略规则
1. 匹配模式前有/  ，那么就表示从根目录向后
2. 如果模式的最后有/ ，那么表示是目录
3. 匹配模式前面加 !  ，表示取反
4. *代表任意个字符
5. ?表示匹配任意一个字符
6. **表示匹配多级目录

### npmignore规则
同步（发布）到npm忽略规则
1. 如果文件夹中缺少了npmignore，那么同步到npm时就会使用gitignore的规则
2. 其他规则与gitignore相同
3. [npmignore有默认忽略](https://docs.npmjs.com/misc/developers)

### [editorconfig兼容不同工作环境，代码风格](https://editorconfig.org/)

### [eslintrc.js做代码格式限制](http://eslint.cn/docs/user-guide/configuring)
1. 多行 /* eslint-disable */ 这里写允许的格式 /* eslint-enable */
2. 单行 // Disables no-alert 这个仅在下一行生效
使用ealintignore来指定忽略不需要格式化的代码

### 自动刷新
```
npm i -g supervisor
```
将自动刷新工具安装到全局
```
supervisor xxx.js
```
使用supervisor来启动服务，如果发生修改就自动重启（watch监听模式）

### 制作cli工具
1. 安装
```
npm i -g anyway
```
2. 使用
```
anyway # 把当前（启动路径）文件夹作为静态资源服务器根目录
anyway -p 8000 # 自定义端口号
anyway -h localhost # 设置host为 localhost
anyway -d /usr # 设置根目录为usr
...
```

语义化版本号：
x.y.z
奇数表示不稳定版， 偶数表示稳定版
x表示 新增功能（不保证兼容）
y表示 新增功能（兼容）
z表示 bug fix
nodejs中
1. x.y.* === ~x.y.z只升级z位
2. 1.x === ^1.0.0 表示y，z总是用最新的