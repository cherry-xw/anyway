// module.exports = {
//     "env": {
//         "browser": true,
//         "commonjs": true,
//         "es6": true
//     },
//     "extends": "eslint:recommended",
//     "parserOptions": {
//         "ecmaVersion": 2015,
//         "sourceType": "module"
//     },
//     "rules": {
//         "indent": [
//             "error",
//             "space"
//         ],
//         "linebreak-style": [
//             "error",
//             "unix"
//         ],
//         "quotes": [
//             "error",
//             "single"
//         ],
//         "semi": [
//             "error",
//             "always"
//         ]
//     }
// };
module.exports = {
    "extends": "eslint:recommended", // 使用eslint的默认规则
    "parser": "babel-eslint", // 指定解析器
    "parserOptions": {
      "ecmaVersion": 2015, // 使用的es6
      "sourceType": "module"
    },
    "globals": {
    //   "window": true
    },
    "env": {
    //   "browser": false, 
      "node": true, // 指定当前环境为nodejs环境，如果是网页环境，则使用brower:true指定
      "es6": true,
      "mocha": true // 测试框架
    },
    "rules": {
        "no-console": ["error", { // 不允许使用log
          "allow": ["warn", "error", "info"] // 同时允许使用"warn", "error", "info"
        }],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
  };
