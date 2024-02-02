/*
 * @Author: sunyue
 * @Date: 2024-01-15 15:49:59
 * @LastEditors: sunyue
 * @LastEditTime: 2024-02-02 15:18:41
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
 */
import { defineConfig } from 'vitepress';
import { prismjsPlugin } from 'vite-plugin-prismjs'
import vue from '@vitejs/plugin-vue'
// import Demo from './.vitepress/vitepress/components/Demo.vue'


export default defineConfig({
    plugins: [prismjsPlugin({
        languages: ['markup', 'css', 'javascript'], // 语言
        plugins: ['line-numbers', 'show-language', 'copy-to-clipboard', 'inline-color'],
        theme: 'okaidia',// 主题
        css: true,
    })],
})