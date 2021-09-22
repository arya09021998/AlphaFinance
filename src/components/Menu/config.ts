import { MenuEntry } from 'penguinfinance-uikit2'

export const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Buy $ALPHA',
    icon: 'TradeIcon',
    href: 'https://app.pangolin.exchange/#/swap?outputCurrency=0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
  },
  {
    label: 'Farms',
    icon: 'PoolIcon',
    href: '/farms',
  },
  {
    label: 'Hunting Grounds',
    icon: 'IfoIcon',
    href: '/farms',
  },
  {
    label: 'Compounder',
    icon: 'SunIcon',
    href: '/compounder',
  },
  {
    label: "Wolf's Den",
    icon: 'MoonIcon',
    href: '/den',
  },
  {
    label: 'Yield Strategies',
    icon: 'GroupsIcon',
    href: '/strategies',
  },
  {
    label: 'NFT Yield',
    icon: 'LogoIcon',
    href: '/nftyield',
  },
  {
    label: 'Hall of fame (NFTs)',
    icon: 'CrownIcon',
    href: '/hall',
  },
  // {
  //   label: 'Club Penguin',
  //   icon: 'BattleIcon',
  //   href: '/club',
  // },
  // {
  //   label: 'Penguin lottery',
  //   icon: 'NftIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'Collectibles',
  //   icon: 'NftIcon',
  //   href: '/collectibles',
  // },
  // {
  //   label: 'Penguin teams',
  //   icon: 'NftIcon',
  //   href: '/teams',
  // },
  {
    label: 'Learn More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/Penguin-Finance',
      },
      {
        label: 'Docs',
        href: 'https://www.penguinfinance.io/b',
      },
      {
        label: 'Medium Articles',
        href: 'https://penguin-finance.medium.com/',
      },
    ],
  },
  // {
  //   label: 'Audited by CertiK',
  //   icon: 'AuditIcon',
  //   href: 'https://www.certik.org/projects/penguinfinance',
  // },
]

export const socials = [
  {
    label: 'Discord',
    icon: 'DiscordIcon',
    href: '/socials'// 'https://discord.gg/',
  },
  {
    label: 'Telegram',
    icon: 'TelegramIcon',
    href: '/socials'// 'https://t.me/',
  },
  {
    label: 'Twitter',
    icon: 'TwitterIcon',
    href: 'https://twitter.com/avax_alphafi',
  },
]
