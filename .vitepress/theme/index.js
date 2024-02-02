/*
 * @Author: sunyue
 * @Date: 2024-01-09 14:20:47
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-31 17:25:01
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
 */
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { VPdemo, toast } from '../vitepress/index'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.config.globalProperties.$toast = toast
    app.component('Demo', VPdemo)
  }
}
