## node包管理工具
1、npm;
    > 1、使用npm shrinkwrap生成一个版本锁文件npm-shrinkwrap.json；更新版本锁文件npm-shrinkwrap.json，需再次使用npm shrinkwrap指令
    > 2、npm是按顺序一个一个安装依赖
    > 3、每次安装第三方包，都需要下载

关于npm包的一些常用的指令
a. npm view 包名 version // 可查看该包的历史版本
    
2、yarn;
    > 1、每次添加或更新安装库包时，Yarn 都会创建（或更新）yarn.lock 文件
    > 2、Yarn支持并行加载安装多个三方库包
    > 3、安装第三包后，会将第三方包缓存到本地磁盘，下次安装相同的包时，则不再需要下载