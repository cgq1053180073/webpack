#webpack 

### npm run develop or npm run publish

> 只要运行 npm run develop 打开浏览器127.0.0.1:8080 写修改了app.js文件以后,可以进行重新构建 


##文件结构

webpack.develop.config.js : 这是开发配置文件  webpack --config webpack.develop.config.js 即可运行 

webpack.publish.config.js : 这是发布配置文件 


### 修改了配置文件要重新启动才行

### eslintignore.js 

> 这个文件是默认过滤文件,文件中有的不会受到eslint的影响

### eslintrc.js 

>　"rules"　所有的校验规范都在这个属性里面写,0表示无效 1 表示警告,但是可以执行 2表示报错  

### template.html 

> 运行npm run publish 的时候 可以在dist 文件下根据template.html 快速生成 index.html 