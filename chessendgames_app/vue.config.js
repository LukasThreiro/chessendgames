const { defineConfig } = require("@vue/cli-service")
define: {
  global: {}
}
module.exports = defineConfig({
  devServer: {
    port: 8081,
  },
  transpileDependencies: true,
})
