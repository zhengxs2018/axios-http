const sidebar = [
  {
    text: '新手指南',
    children: [
      {
        text: '介绍',
        link: '/guide/'
      },
      {
        text: '快速上手',
        link: '/guide/getting-started'
      },
      {
        text: '贡献指南',
        link: '/guide/contributing'
      }
    ]
  },
  {
    text: '基础',
    children: [
      {
        text: '使用插件',
        link: '/basics/plugin'
      }
    ]
  },
  {
    text: '进阶',
    children: [
      {
        text: '插件开发',
        link: '/advanced/plugin'
      }
    ]
  }
]


export default {
  '/guide': sidebar,
  '/basics': sidebar,
  '/advanced': sidebar,
  '/tutorials/': [
    {
      text: '第三方集成',
      children: [
        {
          text: '与 pont 和 swagger 搭配',
          link: '/tutorials/oidc-client'
        },
        {
          text: '与 oidc-client 联动',
          link: '/tutorials/oidc-client'
        }
      ]
    },
  ]
}
