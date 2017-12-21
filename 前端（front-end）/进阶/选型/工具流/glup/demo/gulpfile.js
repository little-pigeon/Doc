const gulp = require('gulp');
// 工具
const plumber = require('gulp-plumber'); // 处理任务出错时
const browserSync = require('browser-sync').create() // 服务器
const sourcemaps = require('gulp-sourcemaps'); // sourcemap；这和manifast资源路径匹配表
const clean = require('gulp-clean'); // 清除文件
const changed = require('gulp-changed'); // 每次只打包内容有改变的文件
const rename = require("gulp-rename"); // 重命名文件
const runSequence = require('run-sequence'); // 同步执行任务
const hash = require('gulp-hash'); // 添加hash值
// lint
const gulpStylelint = require('gulp-stylelint');
const gulpTslint = require('gulp-tslint');
// js(webpack)
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const uglify = require('gulp-uglify'); // 压缩js
// sass
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css'); // 压缩css
// html
const inject = require('gulp-inject');
const htmlmin = require('gulp-htmlmin');
// img
const buffer = require('vinyl-buffer');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');
const spritesmith = require('gulp.spritesmith');

// cross-env NODE_ENV=dev gulp
const config = {
	outDir: process.env.NODE_ENV === 'dev' ? './build' : './dist',
	iconPath: 'src/assets/imgs/icons'
}

gulp.task('default', ()=>{
	console.log('env: ', process.env.NODE_ENV);
});

// gulp处理异步流要加return语句，不然会有bug
// 关于return
// 两个作用：1、声明了该task是一个异步task；2、告知了该task什么时候结束
// https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support

// 检查scss
// gulp-stylelint只是stylelint的一个插件，需配合.stylelintrc使用
gulp.task('lint-scss', () => {
  return gulp
    .src('src/styles/*.scss')
    .pipe(gulpStylelint({
			files: gulpStylelint,
			failAfterError: true,
      reportOutputDir: 'reports/lint',
      reporters: [
				{formatter: 'verbose', console: true},
				{formatter: 'json', save: 'report.json'}
      ],
      debug: true
    }));
});

// 检查ts
// 使用gulp-tslint，还需安装tslint和typescript
gulp.task('lint-ts', () => {
	return gulp.src('src/ts/*.ts')
							.pipe(gulpTslint({
									formatter: "verbose"
							}))
							.pipe(gulpTslint.report())
});

// 打包ts
gulp.task('ts', () => {
	return gulp.src('src/ts/index.ts')
			.pipe(plumber())
			.pipe(webpack(webpackConfig))
			.pipe(gulp.dest(config.outDir))
});

// 打包scss
gulp.task('scss', ['sprite'], ()=> {
	// autoprefixer 应在 sass 后
	return gulp.src('src/styles/**/main.scss')
					.pipe(plumber())
					.pipe(sourcemaps.init())
					.pipe(sass())
					.pipe(autoprefixer())
					.pipe(sourcemaps.write('./maps'))
					.pipe(gulp.dest(config.outDir));
});

// 打包图片
gulp.task('sprite', () => {
	// 生成sprite图和sprite样式表
  const spriteData = gulp.src(config.iconPath+'/*.png').pipe(
		spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.scss',
			imgPath: 'assets/imgs/sprite.png'
		})
	);

  // 压缩sprite图
  const imgStream = spriteData.img
    .pipe(gulp.dest('src/assets/imgs'));

  // 压缩css
  const cssStream = spriteData.css
    .pipe(gulp.dest('src/styles'));

  return merge(imgStream, cssStream);
});

gulp.task('img:copy', () => {
	return gulp.src(['src/assets/imgs/**.png', 'src/assets/imgs/**.jpg'])
						.pipe(imagemin())
						.pipe(gulp.dest(config.outDir+'/assets/imgs'))

})

// 打包html
gulp.task('html:copy', () => {
	// 这里的return不能去掉,不然执行html时，注入任务会失败
	return gulp.src('src/html/*.html')
		.pipe(gulp.dest(config.outDir));
});

gulp.task('html', ['html:copy'], () => {
	let dir = config.outDir;
	let vendorsFile = process.env.NODE_ENV === 'pro' ? 'vendors.*.js' : 'vendors.js' ;

	return gulp.src(dir+'/**/*.html')
			.pipe(
				inject(
					gulp.src(
					dir+'/**/'+vendorsFile,
					{read: false}),
					{
						starttag: '<!-- inject:vendors:{{ext}} -->', // 配置植入模板
						relative: true
					}
				)
			)
			.pipe(
				inject(
					gulp.src([dir+'/**/*.css', dir+'/**/*.js', '!'+dir+'/**/'+vendorsFile],
					{read: false}),
					{
						relative: true
					}
				)
			)
			.pipe(gulp.dest(dir));
});

// 监控
gulp.task('watch', () => {
	// 监听src下的文件
	gulp.watch('src/**/*.html',  ['html']);
	gulp.watch('src/**/*.scss',  ['lint-scss', 'scss']);
	gulp.watch('src/**/*.ts',  ['lint-ts', 'ts']);
});

// build
gulp.task('build', (cb) => {
	// 服务要先开，才能开监控
	runSequence(
			'clean', // 第一步：清理目标目录
			['scss', 'ts', 'img:copy'], // 第二步：打包  'minify:html', 'minify:image'
			'html',
			'server', // 第三步：开服务
			'watch', // 第三步：监控
			cb
	);
});

// 生成最终资源
gulp.task('dist',[], (cb) => {
	// 压缩+版本号
	runSequence(
		'clean', // 第一步：清理目标目录
		['ts:manify', 'css:manify'], // 第二步：打包  'minify:html', 'minify:image'
		'html',
		'html:manify',
		cb
	);
});

gulp.task('ts:manify', () => {
	return gulp.src('build/**/*.js')
			.pipe(uglify())
			.pipe(
				hash(
					{
						template: '<%= name %>.<%= hash %><%= ext %>'
					}
				)
			)
			.pipe(gulp.dest('dist/js'));
});

gulp.task('css:manify', () => {
	return  gulp.src('build/**/*.css')
			.pipe(cleanCSS())
			.pipe(
				hash(
					{
						template: '<%= name %>.<%= hash %><%= ext %>'
					}
				)
			)
			.pipe(gulp.dest('dist/css'));
});

gulp.task('html:manify', () => {
	const options = {
		removeComments: true,//清除HTML注释
		collapseWhitespace: true,//压缩HTML
		collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
		minifyJS: true,//压缩页面JS
		minifyCSS: true//压缩页面CSS
	};

	gulp.src('dist/**/*.html')
			.pipe(htmlmin(options))
			.pipe(gulp.dest('dist'));
})

// 开启服务
gulp.task('server', () => {
  browserSync.init({
    open: 'external',
    host: 'localhost',
		port: 3000,
		server: {
			baseDir: "build",
			index: "index.html"
		}
	})
	// 监听HTML更改事件并重新加载
	browserSync.watch("build/*.html").on("change", browserSync.reload);
	// 监听css更改事件并重新加载
	browserSync.watch("build/*.css").on("change", browserSync.reload);
	// 监听js更改事件并重新加载
	browserSync.watch("build/*.js").on("change", browserSync.reload);
});

// 清空文件
gulp.task('clean', () => {
	return gulp.src(config.outDir).pipe(clean())
});




