## 1、缓存策略
![缓存策略](https://github.com/little-pigeon/assets/blob/master/images/http/cache-control.jpg)

## 2、缓存的启用和关闭
    A、Expires（期限）

    说明：可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。

    用法：<meta http-equiv="expires" content="Fri,12 Jan 2001 18:18:18 GMT">

    注意：必须使用GMT的时间格式。

    B、Pragma(cache模式）
    说明：禁止浏览器从本地计算机的缓存中访问页面内容。

    用法：<meta http-equiv="Pragma" content="no-cache">

    注意：这样设定，访问者将无法脱机浏览。

    C、Cache-Control（缓存控制）

    说明：常见的取值有private、no-cache、max-age、must-revalidate等，默认为private,其作用根据不同的重新浏览方式分为以下几种情况：

        1） 打开新窗口 值为private、no-cache、must-revalidate，那么打开新窗口访问时都会重新访问服务器。 而如果指定了max-age值，那么在此值内的时间里就不会重新访问服务器，例如： Cache-control: max-age=5(表示当访问此网页后的5秒内再次访问不会去服务器) 

        2） 在地址栏回车 值为private或must-revalidate则只有第一次访问时会访问服务器，以后就不再访问。 值为no-cache，那么每次都会访问。 值为max-age，则在过期之前不会重复访问。

        3） 按后退按扭 值为private、must-revalidate、max-age，则不会重访问， 值为no-cache，则每次都重复访问 
        
        4） 按刷新按扭 无论为何值，都会重复访问 Cache-control值为“no-cache”时，访问此页面不会在Internet临时文件夹留下页面备份。
        <meta http-equiv="expires" content="0"> ,指定Expires值为一个早已过去的时间，那么访问此网时若重复在地址栏按回车，那么每次都会重复访问： Expires: Fri, 31 Dec 1999 16:00:00 GMT 比如：禁止页面在IE中缓存 http响应消息头部设置： CacheControl = no-cache Pragma=no-cache Expires = -1 Expires是个好东东，如果服务器上的网页经常变化，就把它设置为0，表示立即过期。 

    用法：<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />

    D、Refresh（刷新）

    说明：自动刷新并转到新页面。

    用法：<meta http-equiv="Refresh" content="2;URL">；（注意后面的分号，分别在秒数的前面和网址的后面，URL可为空）

## 3、缓存使用

    使用缓存，使用过期缓存，不使用缓存

## 4、缓存存放的位置
    1、memory （内存--你找不到找不到）
    
    2、disk（硬盘--即时浏览器的缓存文件夹，谷歌可通过chrome://version/查看，一般派生资源都会存放于此处）

    3、服务器或代理服务器

## 5、关于Etag和Last-Modified

    请求报文中 If-Modified-Since If-None-Match

    响应报文中 Last-Modified ETag

    如果ETag!=If-None-Match，那么文件过期

    如果Last-Modified!=If-Modified-Since，那么文件过期

## 6、关于个别字段的一些历史

    a、Expires（用于说明文件的过期时间）

    出现时间：HTTP1.0

    缺点：客户端时间与服务器时间不一致就会引发很多缓存问题

    b、Cache-Control

    出现时间：HTTP 1.1（弥补Expires缺点而出现）

    作用：实现了更优雅的文件过期声明，比如max-age配置，是一个timestamp,告知客户端这个文件多长时间不会过期而不是直接告知过期时间

    c、Last-Modified

    出现时间：HTTP 1.0

    作用：判断文件变动；表示文件最后一次修改的时间，精确到秒级

    缺点：
        
        1、一旦内容是动态生成的，这个时间在服务器端不一定可以正确的生成

        2、如果在一秒内有一次以上的文件修改，这样的缓存就会造成额外的问题

    d、ETag

    出现时间：HTTP1.1

    作用：判断文件变动；对于动态内容，常规做法是对动态内容做HASH计算，作为ETAG返回，对于静态资源，一般是使用inode+mtime进行计算。

    缺点：

        1、同一个文件在不同物理机上的inode是不同的，这就导致了在分布式的Web系统中，当访问落在不同的物理机上时会返回不同的ETag，进而导致304失效，降级为200请求

    解决方法：

        1、从ETag算法中剥离inode，只是使用mtime，但是这样实际上和Last-Modified就一样了。

        2、使ETag对静态资源的算法也是通过hash计算的

    （注意：由于一般我们会使用CDN技术，因此集群部署中的ETag问题并不会造成太大的影响，所以折腾的人也不太是很多）





