```js
// 供node环境下使用
const webpack = require('webpack'); // import webpack from 'webpack';
// path是node的一个用于路径处理的模块，它可以解决因为操作系统不同导致的路径分隔符不同的问题。
// __dirname是node的一个全局变量，存储的是当前文件所在目录的完整目录名
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(options) {
	return {
		entry: {
			app: './src/index.ts',
			// 框架库代码与项目自身的代码分开打包，生成一个独立的打包文件，缩减单个文件体积，浏览器不用每次都进行加载
			// vendor: ''
		},
		output: {
			// resolve，格式化\react\demo1/dev 为 \react\demo1\dev
			path: path.resolve(__dirname, 'dev'), // The provided value "./dev" is not an absolute path!
			filename: '[name].js' // '[name].[chunkHash:5].js'加上hash，避免服务器缓存
		},
		module: {
			loaders: [
				// 使用ts，需要安装ts-loader和typescript，配置tsconfig.json
				{ 
					test: /\.(ts|tsx)$/,
					/*
					对于include，更精确指定要处理的目录，这可以减少不必要的遍历，从而减少性能损失。
					同样，对于已经明确知道的，不需要处理的目录，则应该予以排除，从而进一步提升性能。
					*/
					include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          loader: 'ts-loader'
				}
			]
		},
		resolve: {
			/*
			import 'react' 这样不是相对、也不是绝对路径的写法时，会去 node_modules 目录下找。
			但是默认的配置，会采用向上递归搜索的方式去寻找，
			但通常项目目录里只有一个 node_modules，且是在项目根目录，为了减少搜索范围，
			可以直接写明 node_modules 的全路径
			*/
			modules: [
        'node_modules/'
			],
			// 别名的处理的目的和上方一致，减少搜索范围
			alias: {
				Components: path.resolve(__dirname, 'src/components/')
			},
			// 减少匹配的后缀
			// npm包里面有模块用了js，所以这里不能去掉'.js'
			extensions: ['.ts', '.tsx', '.js', '.jsx']
		},
		plugins: [
			new HtmlWebpackPlugin({ // 将打包的资源注入到html文档中
				template: './src/index.html',
				inject: 'body'
			}),
			new webpack.optimize.CommonsChunkPlugin({
				names: ['common', 'vendor', 'webpack'], 
				minChunks: 2 // 如果模块的引用次数为>=2,那么会被抽离打包到common模块中
			})
		],
		// externals:["React","jQuery"] 和 vendor 相似，区别在于是否需要打包第三方库
	}
}

/*
module.exports = function(options) {
	return {
		entry: {},
		output: {},
		module: {},
		resolve: {},
		plugins: [],
		externals: {},
	}
}
*/

// manifest 又叫runtime，又叫manifest，又叫helpers代码，作用类似于require.js，解析各个包的关系
// 比如说 r.js是require.js的打包工具，使用require.js规范写的js模块，用r.js打包，生成的文件，要先在页面引入require.js，然后再引入r.js打包的文件，浏览器才能解析读取
// 那么wepack就类似于r.js，manifest就类似于require.js

// 提取共用模块
// 默认两个chunk引用同一个模块，如果在names: ['common', 'vendor', 'manifest']配置了common，那么就会被提取到common.js，如果没有那么就会被提取到vendor.js
// minChunks: 4 那么如果是两个chunk引用，也不会被提取出来打包

// chunk的数量，得看entry，entry: {chunk1: '', chunk2: [子chunk1, 子chunk2]}
```