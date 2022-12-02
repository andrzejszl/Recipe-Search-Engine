const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  configureWebpack: {
    plugins: [new MiniCssExtractPlugin()],
  }
};