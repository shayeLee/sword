import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

const plugins = [
  babel({
    exclude: "node_modules/**"
  }),
  nodeResolve({
    jsnext: true
  }),
  commonjs({
    extensions: [".js"],
    ignoreGlobal: false
  })
];

const external = function(name) {
  return (
    /crypto-js/.test(name) ||
    /core-js/.test(name) ||
    (/src/.test(name) && !/observables/.test(name))
  );
};

const fs = require("fs");
const path = require("path");
const getAbsPath = function() {
  const _args = [].slice.call(arguments);
  return path.join(..._args);
};
const fileArr = [];
const targetDir = path.resolve("src");
getFile(targetDir);
function getFile(targetDir) {
  fs.readdirSync(targetDir).forEach(function(filedir) {
    const filepath = getAbsPath(targetDir, filedir);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      getFile(filepath);
    } else {
      if (filepath.indexOf(".DS_Store") < 0) fileArr.push(filepath);
    }
  });
}

export default fileArr
  .map(file => {
    return {
      input: file,
      output: {
        file: file.replace(/src/, "es"),
        format: "es"
      },
      plugins,
      external
    };
  })
  .concat(
    fileArr.map(file => {
      return {
        input: file,
        output: {
          file: file.replace(/src/, "lib"),
          format: "cjs"
        },
        plugins,
        external
      };
    })
  )
  .concat([
    {
      input: getAbsPath(__dirname, "..", "src/index.js"),
      output: {
        file: getAbsPath(__dirname, "..", "dist/sword.js"),
        name: "sword",
        format: "umd"
      },
      plugins: plugins.concat([uglify()])
    }
  ]);
