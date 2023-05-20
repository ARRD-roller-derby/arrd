import * as React from 'react'
export * from '@fortawesome/react-fontawesome'
export { faBarsFilter } from '@fortawesome/sharp-solid-svg-icons'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import fr from 'dayjs/locale/fr'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.locale(fr)
dayjs.tz.guess()
dayjs.tz.setDefault('Europe/Paris')

export { dayjs }

export * from './buttons'
export * from './icons'
export * from './col/col'
export * from './flex/flex'
export * from './grid-box/grid-box'
export * from './img-bubble/img-bubble'
export * from './wallet/wallet'
export * from './menu-links'
