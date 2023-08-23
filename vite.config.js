import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from "vite-plugin-singlefile"
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
const pathResolve = (dir) => {  
  return resolve(__dirname, ".", dir)          
}

const alias = {
  '@': pathResolve("src")
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // viteSingleFile(),
    vueJsx(),
  ],
  base:'./',
  resolve:{
    alias
  },
  server:{
    port:8089,
    // host:'192.168.1.48',
    open:true,
    proxy:{
      "/server1":{
        target:"https://yjqyphm377.us.aircode.run",
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite:(path) => path.replace(/^\/server1/, '')
      },
      "/server2":{
        target:"https://2n8gkwwm28.us.aircode.run/",
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite:(path) => path.replace(/^\/server2/, '')
      }
    }
  }
})
