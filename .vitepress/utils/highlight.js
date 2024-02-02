/*
 * @Author: sunyue
 * @Date: 2024-01-15 16:08:37
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-17 14:24:44
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
 */
// ref https://github.com/vuejs/vitepress/blob/main/src/node/markdown/plugins/highlight.ts
import chalk from 'chalk'
import escapeHtml from 'escape-html'
import prism from 'prismjs'
import consola from 'consola'

function wrap(code, lang) {
    if (lang === 'text') {
        code = escapeHtml(code)
    }
    return `<pre v-pre><code>${code}</code></pre>`
}

export const highlight = (str, lang) => {
    if (!lang) {
        return wrap(str, 'text')
    }
    lang = lang.toLowerCase()
    const rawLang = lang
    if (lang === 'vue' || lang === 'html') {
        lang = 'markup'
    }
    if (lang === 'md') {
        lang = 'markdown'
    }
    if (lang === 'ts') {
        lang = 'typescript'
    }
    if (lang === 'py') {
        lang = 'python'
    }
    if (!prism.languages[lang]) {
        try {
            loadLanguages([lang])
        } catch {
            // eslint-disable-next-line no-console
            consola.warn(
                chalk.yellow(
                    `[vitepress] Syntax highlight for language "${lang}" is not supported.`
                )
            )
        }
    }
    if (prism.languages[lang]) {
        const code = prism.highlight(str, prism.languages[lang], lang)
        return wrap(code, rawLang)
    }
    return wrap(str, 'text')
}
