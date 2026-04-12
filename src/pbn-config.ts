export const SITE_CONFIG = {
  name: 'Avast For Windows',
  description: 'Expert guides on Windows security, antivirus protection, malware removal, and system optimization. Keep your PC safe and running smoothly.',
  url: 'https://avastforwindows.co',
  language: 'en-US',
  defaultAuthor: 'Security Tech Team',
  organization: {
    name: 'Avast For Windows',
    email: 'support@avastforwindows.co',
    logo: '/logo.png',
    sameAs: [],
  },
} as const;

export type LayoutVariant = 'grid' | 'list' | 'magazine' | 'minimal';
export type SidebarPosition = 'left' | 'right' | 'none';
export type HeaderStyle = 'standard' | 'centered' | 'minimal';
export type FooterStyle = 'standard' | 'compact' | 'none';

const getPrefixedClass = (className: string): string => {
  return `${LAYOUT_CONFIG.htmlStructure.prefix}-${className}`;
};

export const LAYOUT_CONFIG = {
  homeVariant: 'list' as LayoutVariant,
  sidebarPosition: 'left' as SidebarPosition,
  headerStyle: 'standard' as HeaderStyle,
  footerStyle: 'compact' as FooterStyle,
  showSidebar: true,
  showTags: true,
  showAuthor: true,
  showDates: true,
  showReadingTime: true,
  showRelatedPosts: true,
  showBreadcrumbs: true,
  showSearch: true,
  postsPerPage: 10,
  postsPerRow: 1,
  relatedPostsCount: 3,
  maxTagsInCloud: 20,
  htmlStructure: {
    mainId: 'avast-main',
    wrapperClass: 'avast-wrapper',
    articleClass: 'avast-card',
    headingClass: 'avast-heading',
    prefix: 'avast',
  },
  colors: {
    headerBg: 'bg-gradient-to-r from-emerald-900 to-slate-900',
    headerBorder: 'border-b border-emerald-700/50',
    sidebarBg: 'bg-slate-900/50',
    footerBg: 'bg-slate-950',
    footerText: 'text-slate-400',
    cardBg: 'bg-slate-900/30',
    cardBorder: 'border border-emerald-800/30',
    linkColor: 'text-emerald-400',
    linkHover: 'hover:text-emerald-300',
  },
  getPrefixedClass,
} as const;

export const SEO_CONFIG = {
  defaultTitle: '%s | Avast For Windows',
  titleTemplate: '%s',
  defaultOgImage: '/og-default.jpg',
  twitterHandle: '@avastforwindows',
  twitterCardType: 'summary_large_image',
  googleSiteVerification: '',
  bingSiteVerification: '',
  yandexVerification: '',
  robotsDefault: 'index, follow',
  trailingSlash: true,
} as const;

export function getFullUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = SITE_CONFIG.url.endsWith('/') ? SITE_CONFIG.url.slice(0, -1) : SITE_CONFIG.url;
  return `${baseUrl}${cleanPath}`;
}

export function getPaginationPath(page: number): string {
  if (page === 1) return '/';
  return `/page/${page}/`;
}
