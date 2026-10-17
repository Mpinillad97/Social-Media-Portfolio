import placeholderA from '../assets/projects/preview-placeholder-a.svg'
import placeholderB from '../assets/projects/preview-placeholder-b.svg'

/*
 * Portfolio projects. Single source of truth for the home page folders and, later,
 * the project detail pages. Edit names, categories, previews and destinations here.
 */

export type ProjectPreview = {
  src: string
  alt: string
  /** True while the image is a placeholder awaiting Luciana's real content. */
  provisional: boolean
}

export type Project = {
  /** Stable identifier; also the future detail page path, e.g. /proyectos/<slug>. */
  slug: string
  name: string
  category: string
  /** True when the category is a temporary label that still needs confirmation. */
  categoryProvisional: boolean
  /** Confirmed short context, or null until it is provided. */
  description: string | null
  previews: [ProjectPreview, ProjectPreview]
  /**
   * Detail page URL. Null until that page exists: the folder then only opens its
   * preview instead of linking somewhere that doesn't exist yet.
   */
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

// Neutral temporary label for projects whose category isn't confirmed yet.
const PENDING_CATEGORY = 'Proyecto creativo'

export const PROJECTS: Project[] = [
  {
    slug: 'cliquea-excel-studio',
    name: 'Cliquea Excel Studio',
    category: PENDING_CATEGORY,
    categoryProvisional: true,
    description: null,
    previews: placeholderPreviews('Cliquea Excel Studio'),
    href: null,
  },
  {
    slug: 'universidad-del-norte',
    name: 'Universidad del Norte',
    category: 'Asistente de comunicaciones',
    categoryProvisional: false,
    description:
      'Asistente de comunicaciones del programa de Comunicación Social.',
    previews: placeholderPreviews('Universidad del Norte'),
    href: null,
  },
  {
    slug: 'das-parfum',
    name: 'Das Parfum',
    category: PENDING_CATEGORY,
    categoryProvisional: true,
    description: null,
    previews: placeholderPreviews('Das Parfum'),
    href: null,
  },
  {
    slug: 'que-lee-bookclub',
    name: 'Que Lee Bookclub',
    category: PENDING_CATEGORY,
    categoryProvisional: true,
    description: null,
    previews: placeholderPreviews('Que Lee Bookclub'),
    href: null,
  },
  {
    slug: 'andila-group',
    name: 'Andila Group',
    category: PENDING_CATEGORY,
    categoryProvisional: true,
    description: null,
    previews: placeholderPreviews('Andila Group'),
    href: null,
  },
]
