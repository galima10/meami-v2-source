import type { TransformOptions } from "@babel/core";

module.exports = function (api: any): TransformOptions {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".js", ".ts", ".tsx", ".json"],
          alias: {
            "@app": "./app",
            "@assets": "./assets",
            "@components": "./components",
            "@constants": "./constants",
            "@contexts": "./contexts",
            "@hooks": "./hooks",
            "@services": "./services",
            "@stores": "./stores",
            "@types": "./types",
            "@utils": "./utils",
            "@themes": "./themes",
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
  };
};
