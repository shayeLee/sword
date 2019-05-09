var gulp = require("gulp"),
	gulpSequence = require("gulp-sequence"),
	del = require("del"),
	rollup = require("rollup"),
	json = require("rollup-plugin-json"),
	babel = require("rollup-plugin-babel"),
	nodeResolve = require("rollup-plugin-node-resolve"),
	commonJs = require("rollup-plugin-commonjs"),
	replace = require("rollup-plugin-replace");

var rollupConfig = {
	plugins: [
    babel({
			exclude: "node_modules/**"
		}),
		nodeResolve({
			jsnext: true
		}),
		commonJs({
			extensions: [".js"],
			ignoreGlobal: false
		})
  ]
};

gulp.task("rollup-dev", function() {
  rollupConfig.input = "./example/index.js";
  rollupConfig.watch = {
    include: ["./example/**/*.js", "src/**/*.js"]
  }
  rollupConfig.output = [{
    file: "dist/example.js",
    format: "iife",
    sourcemap: true
  }]
  const watcher = rollup.watch(rollupConfig);
  watcher.on('event', event => {
    //   event.code 会是下面其中一个：
    //   START        — 监听器正在启动（重启）
    //   BUNDLE_START — 构建单个文件束
    //   BUNDLE_END   — 完成文件束构建
    //   END          — 完成所有文件束构建
    //   ERROR        — 构建时遇到错误
    //   FATAL        — 遇到无可修复的错误
    console.log(event.code);
    if (event.code === 'FATAL' || event.code === 'ERROR') {
      console.log(event)
    }
  });
});

//清除
gulp.task("clean", function(cb) {
	del.sync("dist/");
	cb();
});

gulp.task("dev", gulpSequence("clean", "rollup-dev"));
