import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

import navbar from './configs/navbar'
import sidebar from './configs/sidebar'

export default defineUserConfig<DefaultThemeOptions>({
  base: '/axios-http/',
  lang: 'zh-CN',
  title: 'Axios HTTP',
  description: '基于 Axios 拓展的 HTTP 模块',
  head: [
    ['link', { rel: 'manifest', href: '/axios-http/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#1e72ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/axios-http/apple-touch-icon.png'
      }
    ],
    [
      'link',
      { rel: 'mask-icon', href: '/axios-http/safari-pinned-tab.svg', color: '#1e72ff' }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/axios-http/favicon-16x16.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/axios-http/favicon-32x32.png'
      }
    ],
    ['link', { rel: 'icon', type: 'image/png', href: '/axios-http/favicon.png' }]
  ],

  themeConfig: {
    navbar: navbar,
    sidebar: sidebar,
    sidebarDepth: 0,

    repo: 'zhengxs2018/axios-http',
    docsDir: 'docs',
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',
    editLinkText: '在 GitHub 上编辑此页'
  },
  plugins: [['@vuepress/search'], ['@vuepress/pwa'], ['@vuepress/pwa-popup']]
})
