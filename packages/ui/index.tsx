import * as React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTruck as fasTruck,
  faCoffee as fasCoffee,
} from '@fortawesome/pro-solid-svg-icons'
import { faTruck as farTruck } from '@fortawesome/pro-regular-svg-icons'
import { faTruck as falTruck } from '@fortawesome/pro-light-svg-icons'
import { faTruck as fatTruck } from '@fortawesome/pro-thin-svg-icons'
import { faTruck as fadTruck } from '@fortawesome/pro-duotone-svg-icons'
import { faTruck as fassTruck } from '@fortawesome/sharp-solid-svg-icons'

library.add(
  fasTruck,
  farTruck,
  falTruck,
  fatTruck,
  fadTruck,
  fassTruck,
  fasCoffee
)

export * from './Button'
