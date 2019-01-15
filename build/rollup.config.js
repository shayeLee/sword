import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const path = require("path");
const resolvePath = function(filePath) {
  return path.join(__dirname, "..", filePath);
};

const src = {
  index: resolvePath("src/index.js"),
  arrTool: resolvePath("src/arrTool.js"),
  crypto: resolvePath("src/crypto.js"),
  dateTool: resolvePath("src/dateTool.js"),
  domTool: resolvePath("src/domTool.js"),
  fileTool: resolvePath("src/fileTool.js"),
  objTool: resolvePath("src/objTool.js"),
  strTool: resolvePath("src/strTool.js"),
  variables: resolvePath("src/variables.js")
}

const esDest = {
  index: resolvePath("es/index.js"),
  arrTool: resolvePath("es/arrTool.js"),
  crypto: resolvePath("es/crypto.js"),
  dateTool: resolvePath("es/dateTool.js"),
  domTool: resolvePath("es/domTool.js"),
  fileTool: resolvePath("es/fileTool.js"),
  objTool: resolvePath("es/objTool.js"),
  strTool: resolvePath("es/strTool.js"),
  variables: resolvePath("es/variables.js")
}

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

const external = function (name) {
  return (
    /crypto-js/.test(name) ||
    /core-js/.test(name)
  )
};

export default [
  {
    input: src.arrTool,
    output: {
      file: esDest.arrTool,
			format: "es"
    },
    plugins,
    external
  },
  {
    input: src.crypto,
    output: {
      file: esDest.crypto,
			format: "es"
    },
    plugins,
    external
  },
  {
    input: src.dateTool,
    output: {
      file: esDest.dateTool,
			format: "es"
    },
    plugins,
    external
  },
  {
    input: src.domTool,
    output: {
      file: esDest.domTool,
			format: "es"
    },
    plugins,
    external
  },
  {
    input: src.fileTool,
    output: {
      file: esDest.fileTool,
			format: "es"
    },
    plugins,
    external
  },
  {
    input: src.objTool,
    output: {
      file: esDest.objTool,
			format: "es"
    },
    plugins,
    external
  },
  {
    input: src.strTool,
    output: {
      file: esDest.strTool,
			format: "es"
    },
    plugins,
    external
  },
  {
    input: src.variables,
    output: {
      file: esDest.variables,
			format: "es"
    },
    plugins,
    external
  }
];
