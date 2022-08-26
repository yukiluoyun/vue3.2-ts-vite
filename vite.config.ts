import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//如果报错，是因为vite.config.ts 是一个ts文件，node 默认不支持ts，所以需要下载ts环境：npm install @types/node -D
// https://vitejs.dev/config/
// import { resolve } from 'path'
import path from 'path'
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://106.52.235.252:8101/',
        changeOrigin: true,
        rewrite:(path) => path.replace(/^\/api/,"")
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "com": path.resolve(__dirname, "src/components"),
    }
  },
  plugins: [
    vue(),
      AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    // css预处理器--添加全局css变量
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "./src/assets/style/variables.scss";',
      },
    },
  },

})

