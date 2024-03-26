// vue.config.js
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      plugins: [
        new MyAwesomeWebpackPlugin()
      ],
      rules: [
        {
          test: /\.(mp3)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/music/',
            publicPath: 'assets/music/'
          }
        }
      ]
    }
  }
});