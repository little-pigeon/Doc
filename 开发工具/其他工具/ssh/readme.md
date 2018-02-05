## SSH是什么
SSH 是一种网络协议，用于计算机之间的加密登录。网络协议还有http协议等协议

## SSH基本用法
远程登录
> ssh user@host
如果本地用户名与远程用户名一致，登录时可以省略用户名
> ssh host
ssh默认端口22, 可用 -p 修改端口
> ssh -p 2222 user@host

## SSH登录方式
1、口令登录
> ssh user@host
首次登录，会出现如下的提示语
> The authenticity of host 'host (12.18.429.21)' can't be established.
> RSA key fingerprint is 98:2e:d7:e0:de:9f:ac:67:28:c2:42:2d:37:16:58:4d.
> Are you sure you want to continue connecting (yes/no)?

> 主机(12.18.429.21)的真实性不能确定。
> 主机(12.18.429.21)的RSA key fingerprint（公钥指纹）的指纹为 98:2e:d7:e0:de:9f:ac:67:28:c2:42:2d:37:16:58:4d
> 是否确定继续连接主机？
> (所谓"公钥指纹"，是指公钥长度较长（这里采用RSA算法，长达1024位），很难比对，所以对其进行MD5计算，将它变成一个128位的指纹)

选择yes后
> Are you sure you want to continue connecting (yes/no)? yes
> Warning: Permanently added 'host,12.18.429.21' (RSA) to the list of known hosts.
> Password: (enter password)

> 是否确定继续连接主机？
> 警告：已经永久地将主机(12.18.429.21)添加到认可的主机列表中；
> 输入密码
> (那句警告，表示host主机已经得到认可，无需在意)

> 当远程主机的公钥被接受以后，它就会被保存在文件$HOME/.ssh/known_hosts之中。下次再连接这台主机，系统就会认出它的公钥已经保存在本地了，从而跳过警告部分，直接提示输入密码。

> 每个SSH用户都有自己的known_hosts文件，此外系统也有一个这样的文件，通常是/etc/ssh/ssh_known_hosts，保存一些对所有用户都可信赖的远程主机的公钥。

2、公钥登录

SSH 提供公钥登录，可以省去输入密码的步骤。

所谓"公钥登录"，原理很简单，就是用户将自己的公钥储存在远程主机上。登录的时候，远程主机会向用户发送一段随机字符串，用户用自己的私钥加密后，再发回来。远程主机用事先储存的公钥进行解密，如果成功，就证明用户是可信的，直接允许登录shell，不再要求密码。

这种方法要求用户必须提供自己的公钥。如果没有现成的，可以直接用ssh-keygen生成一个：
> ssh-keygen

运行上面的命令以后，系统会出现一系列提示，可以一路回车。其中有一个问题是，要不要对私钥设置口令（passphrase），如果担心私钥的安全，这里可以设置一个。

运行结束以后，在$HOME/.ssh/目录下，会新生成两个文件：id_rsa.pub和id_rsa。前者是你的公钥，后者是你的私钥。

这时再输入下面的命令，将公钥传送到远程主机host上面：
> ssh-copy-id user@host

好了，从此你再登录，就不需要输入密码了。

如果还是不行，就打开远程主机的/etc/ssh/sshd_config这个文件，检查下面几行前面"#"注释是否取掉。
> RSAAuthentication yes
> PubkeyAuthentication yes
> AuthorizedKeysFile .ssh/authorized_keys

然后，重启远程主机的ssh服务。
> // ubuntu系统
> service ssh restart
> // debian系统
> /etc/init.d/ssh restart

## 查看公钥
> ls -al ~/.ssh

## 创建公钥

> ssh-keygen -t rsa -C "your_email@example.com"

```txt
-a trials
        在使用 -T 对 DH-GEX 候选素数进行安全筛选时需要执行的基本测试数量。
-B      显示指定的公钥/私钥文件的 bubblebabble 摘要。
-b bits
        指定密钥长度。对于RSA密钥，最小要求768位，默认是2048位。DSA密钥必须恰好是1024位(FIPS 186-2 标准的要求)。
-C comment
        提供一个新注释
-c      要求修改私钥和公钥文件中的注释。本选项只支持 RSA1 密钥。
        程序将提示输入私钥文件名、密语(如果存在)、新注释。
-D reader
        下载存储在智能卡 reader 里的 RSA 公钥。
-e      读取OpenSSH的私钥或公钥文件，并以 RFC 4716 SSH 公钥文件格式在 stdout 上显示出来。
        该选项能够为多种商业版本的 SSH 输出密钥。
-F hostname
        在 known_hosts 文件中搜索指定的 hostname ，并列出所有的匹配项。
        这个选项主要用于查找散列过的主机名/ip地址，还可以和 -H 选项联用打印找到的公钥的散列值。
-f filename
        指定密钥文件名。
-G output_file
        为 DH-GEX 产生候选素数。这些素数必须在使用之前使用 -T 选项进行安全筛选。
-g      在使用 -r 打印指纹资源记录的时候使用通用的 DNS 格式。
-H      对 known_hosts 文件进行散列计算。这将把文件中的所有主机名/ip地址替换为相应的散列值。
        原来文件的内容将会添加一个".old"后缀后保存。这些散列值只能被 ssh 和 sshd 使用。
        这个选项不会修改已经经过散列的主机名/ip地址，因此可以在部分公钥已经散列过的文件上安全使用。
-i      读取未加密的SSH-2兼容的私钥/公钥文件，然后在 stdout 显示OpenSSH兼容的私钥/公钥。
        该选项主要用于从多种商业版本的SSH中导入密钥。
-l      显示公钥文件的指纹数据。它也支持 RSA1 的私钥。
        对于RSA和DSA密钥，将会寻找对应的公钥文件，然后显示其指纹数据。
-M memory
        指定在生成 DH-GEXS 候选素数的时候最大内存用量(MB)。
-N new_passphrase
        提供一个新的密语。
-P passphrase
        提供(旧)密语。
-p      要求改变某私钥文件的密语而不重建私钥。程序将提示输入私钥文件名、原来的密语、以及两次输入新密语。
-q      安静模式。用于在 /etc/rc 中创建新密钥的时候。
-R hostname
        从 known_hosts 文件中删除所有属于 hostname 的密钥。
        这个选项主要用于删除经过散列的主机(参见 -H 选项)的密钥。
-r hostname
        打印名为 hostname 的公钥文件的 SSHFP 指纹资源记录。
-S start
        指定在生成 DH-GEX 候选模数时的起始点(16进制)。
-T output_file
        测试 Diffie-Hellman group exchange 候选素数(由 -G 选项生成)的安全性。
-t type
        指定要创建的密钥类型。可以使用："rsa1"(SSH-1) "rsa"(SSH-2) "dsa"(SSH-2)
-U reader
        把现存的RSA私钥上传到智能卡 reader
-v      详细模式。ssh-keygen 将会输出处理过程的详细调试信息。常用于调试模数的产生过程。
        重复使用多个 -v 选项将会增加信息的详细程度(最大3次)。
-W generator
        指定在为 DH-GEX 测试候选模数时想要使用的 generator
-y      读取OpenSSH专有格式的公钥文件，并将OpenSSH公钥显示在 stdout 上。
```