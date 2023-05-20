import {
  faCalendarAlt,
  faHomeBlank,
  faQuestionCircle,
} from '@fortawesome/sharp-solid-svg-icons'

export const ValhallaLink = [
  {
    label: 'Accueil',
    href: '/',
    icon: faHomeBlank,
    shortcut: true,
  },
  {
    label: 'Calendrier',
    href: '/calendrier',
    icon: faCalendarAlt,
    shortcut: true,
  },
  {
    label: 'Défi Quotidien',
    href: '/question',
    icon: faQuestionCircle,
  },
]
