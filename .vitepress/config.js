// .vitepress/config.js
import { withMermaid } from "vitepress-plugin-mermaid";
import container from 'markdown-it-container';
import { mdPlugin } from './config/mdPlugin';

export default withMermaid({
    // your existing vitepress config...
    markdown: {
        config(md) { mdPlugin(md) }
    },
    title: "openlayers-doc",
    description: "openlayers入门文档",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'api', link: '/examples/quickstart' },
            { text: 'demo展示', link: '/demos/demo' }
        ],

        sidebar: [
            {
                text: 'api',
                items: [
                    { text: '快速入门', link: '/examples/quickstart' },
                    { text: 'Map', link: '/examples/map' },
                    { text: 'Layer', link: '/examples/layer' },
                    { text: 'Source', link: '/examples/source' },
                    { text: 'Feature', link: '/examples/feature' },
                    { text: 'Style', link: '/examples/style' }
                ]
            },
            {
                text: 'demos',
                items: [
                    { text: 'layer', link: '/demos/layer' },
                    { text: 'feature', link: '/demos/feature' },
                    { text: 'style', link: '/demos/style' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    },
    // optionally, you can pass MermaidConfig
    mermaid: {
        // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    },
    // optionally set additional config for plugin itself with MermaidPluginConfig
    mermaidPlugin: {
        class: "mermaid my-class", // set additional css classes for parent container 
    },
    outDir: 'openlayers'
});