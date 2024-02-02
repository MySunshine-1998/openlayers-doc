/*
 * @Author: sunyue
 * @Date: 2024-01-15 14:39:05
 * @LastEditors: sunyue
 * @LastEditTime: 2024-01-16 14:35:43
 * @Description: 描述
 * Copyright (c) 2024 by 中国科学院软件研究所, All Rights Reserved. 
 */
import { resolve } from 'path'
import fs from 'fs'
import mdContainer from 'markdown-it-container'
import MarkdownIt from 'markdown-it'
import tag from './tag'
import { highlight } from '../utils/highlight'
// import Demo from '../vitepress/components/Demo.vue'

const localMd = MarkdownIt().use(tag)
export const projRoot = resolve(__dirname, '..', '..')
export const docsDirName = 'docs'
export const docRoot = resolve(projRoot, docsDirName)

export const mdPlugin = function (md) {
    md.use(mdContainer, 'demo', {
        validate(params) {
            return !!params.trim().match(/^demo\s*(.*)$/)
        },
        render(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
            if (tokens[idx].nesting === 1) {
                const description = m && m.length > 1 ? m[1] : ''
                const sourceFileToken = tokens[idx + 2]
                let source = ''
                const sourceFile = sourceFileToken?.children?.[0].content ?? ''

                if (sourceFileToken.type === 'inline') {
                    source = fs.readFileSync(
                        resolve(docRoot, 'examples', `${sourceFile}.vue`),
                        'utf-8'
                        )
                }
                if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
                return `<Demo :demos="demos" source="${encodeURIComponent(
            highlight(source, 'vue')
            )}" path="${sourceFile}" raw-source="${encodeURIComponent(
                source
                )}" description="${encodeURIComponent(localMd.render(description))}">`
            } else {
                return '</Demo>'
            }
        },
    })
}