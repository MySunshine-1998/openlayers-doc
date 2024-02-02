<!--
 * @Author: sunyue
 * @Date: 2024-02-02 11:18:13
 * @LastEditors: sunyue
 * @LastEditTime: 2024-02-02 11:24:17
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
-->
### 部署说明
项目部署在172.16.10.95机器中，采用的是docker部署，每次打完包后需要替换
```js
/opt/software/nginx/nginx/html/opnlayers
```
并重启nginx,命令如下:
```linux
docker restart mynginx
```

### 开发说明
如果不使用在md中写vue或其他代码的方法，可使用:::demo语法即可映射/docs/examples下文件，参考/examples文件夹下的layer.md #示例，但是目前只可映射vue文件
