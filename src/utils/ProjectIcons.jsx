import AccountBalance from '@mui/icons-material/AccountBalance'
import BusinessCenter from '@mui/icons-material/BusinessCenter'
import Code from '@mui/icons-material/Code'
import FolderOpen from '@mui/icons-material/FolderOpen'
import Games from '@mui/icons-material/Games'
import Home from '@mui/icons-material/Home'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Restaurant from '@mui/icons-material/Restaurant'
import Science from '@mui/icons-material/Science'
import Yard from '@mui/icons-material/Yard'

import { CHORE_ICONS, ICON_COMPONENTS } from '../constants/choreIcons'

// Projects use the same icon library, search, and name-based auto-select as
// tasks/chores (see constants/choreIcons.js) so the picker behaves
// identically for both. These extra components only cover icon names that
// were selectable in the old, smaller project icon list but aren't part of
// CHORE_ICONS ('Garden' never matched a real @mui/icons-material export --
// it's mapped to Yard here), so existing projects keep rendering their icon.
const LEGACY_ICON_COMPONENTS = {
  FolderOpen,
  Home,
  BusinessCenter,
  Code,
  Restaurant,
  PhotoCamera,
  Games,
  Science,
  AccountBalance,
  Garden: Yard,
}

export const DEFAULT_PROJECT_ICON = 'FolderOpen'

const PROJECT_ICONS = CHORE_ICONS

export default PROJECT_ICONS

export const getIconComponent = iconValue =>
  ICON_COMPONENTS[iconValue] || LEGACY_ICON_COMPONENTS[iconValue] || FolderOpen
