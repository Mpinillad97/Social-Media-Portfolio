/*
 * Contact channels. None are configured yet: fill these in with Luciana's real details.
 * A channel left as null is shown as "Próximamente" and never rendered as a link.
 */
export const CONTACT = {
  /** Email address, e.g. "nombre@dominio.com". Opens the visitor's mail client. */
  email: null as string | null,
  /** Full LinkedIn profile URL, e.g. "https://www.linkedin.com/in/usuario". */
  linkedin: null as string | null,
  /** WhatsApp number in international format, digits only, e.g. "573001234567". */
  whatsapp: null as string | null,
  /** Full Instagram profile URL, e.g. "https://www.instagram.com/usuario". */
  instagram: null as string | null,
}

export type FooterLink = {
  label: string
  /** Null until the real address is configured above; then rendered as a link. */
  href: string | null
  external: boolean
}

// "Encuéntrame en" links in the footer.
export const FOOTER_LINKS: FooterLink[] = [
  { label: 'Instagram', href: CONTACT.instagram, external: true },
  { label: 'LinkedIn', href: CONTACT.linkedin, external: true },
  {
    label: 'Correo',
    href: CONTACT.email ? `mailto:${CONTACT.email}` : null,
    external: false,
  },
]

export type ContactChannel = {
  id: 'email' | 'linkedin' | 'whatsapp'
  label: string
  /** Visible value or action text; null when the channel isn't configured. */
  display: string | null
  href: string | null
  external: boolean
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'email',
    label: 'Correo',
    display: CONTACT.email,
    href: CONTACT.email ? `mailto:${CONTACT.email}` : null,
    external: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    display: CONTACT.linkedin ? 'Ver perfil' : null,
    href: CONTACT.linkedin,
    external: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    display: CONTACT.whatsapp ? 'Escribir un mensaje' : null,
    href: CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}` : null,
    external: true,
  },
]

/** Main call-to-action target: the first configured channel, preferring email. */
export const PRIMARY_CONTACT_HREF =
  CONTACT_CHANNELS.find((channel) => channel.href)?.href ?? null
