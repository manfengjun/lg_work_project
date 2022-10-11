import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import tmuiCss from "./src/tmui/tool/vitePlugs/tmuiCss";
import { resolve } from "path"
// import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
export default defineConfig({
	dts: true,
	resolve: {
		alias: [
			{
				find: "@",
				replacement: resolve(__dirname, 'src')
			}
		]
	},
	plugins: [
		uni(),
	],
	// 本地运行配置，及反向代理配置
	server: {
		cors: true, // 默认启用并允许任何源
		open: true, // 在服务器启动时自动在浏览器中打开应用程序
		port: 8080,
		//反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
		proxy: {
			'^/work': {
				target: 'http://120.48.133.248:3000',   //代理接口
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/work/, '')
			}
		}
	}
});
