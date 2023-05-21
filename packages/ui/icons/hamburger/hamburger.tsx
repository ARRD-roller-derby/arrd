import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/sharp-solid-svg-icons'

interface HamburgerProps {
  onClick?: () => void
  close?: boolean
}
export const Hamburger: React.FC<HamburgerProps> = ({ onClick, close }) => (
  <FontAwesomeIcon
    onClick={() => onClick?.()}
    icon={close ? faTimes : faBars}
  />
)
