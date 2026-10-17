import placeholderA from '../assets/projects/preview-placeholder-a.svg'
import placeholderB from '../assets/projects/preview-placeholder-b.svg'

/*
 * Portfolio projects. Single source of truth for the home page folders and the project
 * detail pages. Edit names, categories, previews, posts and destinations here.
 */

export type ProjectPreview = {
  src: string
  alt: string
  /** True while the image is a placeholder awaiting Luciana's real content. */
  provisional: boolean
}

/** Format of a featured social post; sets the media proportions. */
export type SocialPostFormat = 'image' | 'reel' | 'carousel'

export type SocialMedia = {
  /** Image URL, or the video URL for a reel. */
  src: string
  alt: string
  /** Optional still frame shown before a reel plays. */
  poster?: string
}

export type SocialPost = {
  id: string
  format: SocialPostFormat
  /**
   * The brand account that published the post. Null until confirmed: the header then
   * shows a clearly provisional state instead of an invented account.
   */
  account: {
    name: string
    /** Brand avatar or logo. */
    avatar?: string
    /** Only true when the account really is verified on the platform. */
    verified: boolean
  } | null
  /**
   * The real media. Empty means the post is still pending and a "Vista previa
   * pendiente" state is shown in its exact proportions.
   */
  media: SocialMedia[]
  /** The real caption, or null to omit the caption area. */
  caption: string | null
}

export type Project = {
  /** Stable identifier; also the detail page path, /proyectos/<slug>. */
  slug: string
  name: string
  category: string
  /** True when the category is a temporary label that still needs confirmation. */
  categoryProvisional: boolean
  /** Confirmed short context, or null until it is provided. */
  description: string | null
  previews: [ProjectPreview, ProjectPreview]
  /** Featured posts on the detail page; replace the pending ones with real content. */
  posts: SocialPost[]
  /** Detail page URL. */
  href: string | null
}

// Provisional previews shared by every project until real images are provided.
function placeholderPreviews(name: string): [ProjectPreview, ProjectPreview] {
  return [
    {
      src: placeholderA,
      alt: `Vista previa pendiente de ${name}`,
      provisional: true,
    },
    {
      src: placeholderB,
      alt: `Vista previa pendiente de ${name}`,
      provisional: true,
    },
  ]
}

// A pending featured post: no account, media or caption until the real ones arrive.
function pendingPost(slug: string): SocialPost {
  return {
    id: `${slug}-post-1`,
    format: 'image',
    account: null,
    media: [],
    caption: null,
  }
}

// Neutral temporary label for projects whose category isn't confirmed yet.
const PENDING_CATEGORY = 'Proyecto creativo'

const projectPath = (slug: string) => `/proyectos/${slug}`

export const PROJECTS: Project[] = [
  {
    slug: 'cliquea-excel-studio',
    name: 'Cliquea Excel Studio',
    category: PENDING_CATEGORY,
    categoryProvisional: true,
    description: null,
    previews: placeholderPreviews('Cliquea Excel Studio'),
    posts: [pendingPost('cliquea-excel-studio')],
    href: projectPath('cliquea-excel-studio'),
  },
  {
    slug: 'universidad-del-norte',
    name: 'Universidad del Norte',
    category: 'Asistente de comunicaciones',
    categoryProvisional: false,
    description:
      'Asistente de comunicaciones del programa de Comunicación Social.',
    previews: placeholderPreviews('Universidad del Norte'),
    posts: [pendingPost('universidad-del-norte')],
    href: projectPath('universidad-del-norte'),
  },
  {
    slug: 'das-parfum',
    name: 'Das Parfum',
    category: PENDING_CATEGORY,
    categoryProvisional: true,
    description: null,
    previews: placeholderPreviews('Das Parfum'),
    posts: [pendingPost('das-parfum')],
    href: projectPath('das-parfum'),
  },
  {
    slug: 'que-lee-bookclub',
    name: 'Que Lee Bookclub',
    category: PENDING_CATEGORY,
    categoryProvisional: true,
    description: null,
    previews: placeholderPreviews('Que Lee Bookclub'),
    posts: [pendingPost('que-lee-bookclub')],
    href: projectPath('que-lee-bookclub'),
  },
  {
    slug: 'andila-group',
    name: 'Andila Group',
    category: PENDING_CATEGORY,
    categoryProvisional: true,
    description: null,
    previews: placeholderPreviews('Andila Group'),
    posts: [pendingPost('andila-group')],
    href: projectPath('andila-group'),
  },
]

export const findProject = (slug: string | undefined) =>
  PROJECTS.find((project) => project.slug === slug)
