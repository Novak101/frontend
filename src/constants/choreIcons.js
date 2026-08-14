import Alarm from '@mui/icons-material/Alarm'
import Bathtub from '@mui/icons-material/Bathtub'
import Bed from '@mui/icons-material/Bed'
import Book from '@mui/icons-material/Book'
import Brush from '@mui/icons-material/Brush'
import Cake from '@mui/icons-material/Cake'
import CalendarToday from '@mui/icons-material/CalendarToday'
import Chair from '@mui/icons-material/Chair'
import Checkroom from '@mui/icons-material/Checkroom'
import CleanHands from '@mui/icons-material/CleanHands'
import CleaningServices from '@mui/icons-material/CleaningServices'
import Countertops from '@mui/icons-material/Countertops'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DirectionsBike from '@mui/icons-material/DirectionsBike'
import DirectionsCar from '@mui/icons-material/DirectionsCar'
import DirectionsWalk from '@mui/icons-material/DirectionsWalk'
import DoorFront from '@mui/icons-material/DoorFront'
import Draw from '@mui/icons-material/Draw'
import EmojiEmotions from '@mui/icons-material/EmojiEmotions'
import Fastfood from '@mui/icons-material/Fastfood'
import FitnessCenter from '@mui/icons-material/FitnessCenter'
import Grass from '@mui/icons-material/Grass'
import Icecream from '@mui/icons-material/Icecream'
import Kitchen from '@mui/icons-material/Kitchen'
import LocalCarWash from '@mui/icons-material/LocalCarWash'
import LocalDining from '@mui/icons-material/LocalDining'
import LocalFlorist from '@mui/icons-material/LocalFlorist'
import LocalLaundryService from '@mui/icons-material/LocalLaundryService'
import MenuBook from '@mui/icons-material/MenuBook'
import MusicNote from '@mui/icons-material/MusicNote'
import Palette from '@mui/icons-material/Palette'
import Pets from '@mui/icons-material/Pets'
import Recycling from '@mui/icons-material/Recycling'
import School from '@mui/icons-material/School'
import SelfImprovement from '@mui/icons-material/SelfImprovement'
import Shower from '@mui/icons-material/Shower'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import SportsEsports from '@mui/icons-material/SportsEsports'
import Star from '@mui/icons-material/Star'
import Timer from '@mui/icons-material/Timer'
import Toys from '@mui/icons-material/Toys'
import WaterDrop from '@mui/icons-material/WaterDrop'
import Wc from '@mui/icons-material/Wc'
import Weekend from '@mui/icons-material/Weekend'
import Window from '@mui/icons-material/Window'
import Yard from '@mui/icons-material/Yard'

// Curated icon set for chores/tasks. Kept intentionally small (rather than
// importing all of @mui/icons-material, which is thousands of components)
// so the picker's bundle stays reasonable while still covering common
// household tasks. Each entry's `name` is the exact @mui/icons-material
// export name -- this is what gets stored on chore.icon and must stay in
// sync with the ICON_COMPONENTS map below.
export const CHORE_ICONS = [
  { name: 'Wc', label: 'Potty', keywords: ['potty', 'toilet', 'bathroom', 'pee'] },
  { name: 'Shower', label: 'Shower', keywords: ['shower', 'bath', 'wash', 'rinse'] },
  { name: 'Bathtub', label: 'Bath', keywords: ['bath', 'tub', 'bathe'] },
  { name: 'CleanHands', label: 'Brush Teeth', keywords: ['brush', 'teeth', 'hygiene', 'wash hands'] },
  { name: 'Checkroom', label: 'Get Dressed', keywords: ['dress', 'clothes', 'outfit', 'pajamas', 'pajama'] },
  { name: 'Bed', label: 'Make Bed', keywords: ['bed', 'sleep', 'nap', 'make the bed'] },
  { name: 'LocalLaundryService', label: 'Laundry', keywords: ['laundry', 'wash clothes', 'washer', 'dryer'] },
  { name: 'CleaningServices', label: 'Clean', keywords: ['clean', 'chore', 'tidy', 'vacuum', 'sweep', 'mop'] },
  { name: 'DeleteOutline', label: 'Trash', keywords: ['trash', 'garbage', 'bin', 'rubbish'] },
  { name: 'Recycling', label: 'Recycling', keywords: ['recycle', 'recycling'] },
  { name: 'Kitchen', label: 'Kitchen', keywords: ['kitchen', 'dishes', 'dishwasher'] },
  { name: 'LocalDining', label: 'Dinner', keywords: ['dinner', 'eat', 'meal', 'lunch', 'breakfast', 'food', 'table'] },
  { name: 'Fastfood', label: 'Snack', keywords: ['snack', 'food'] },
  { name: 'Icecream', label: 'Dessert', keywords: ['dessert', 'treat', 'ice cream'] },
  { name: 'Cake', label: 'Baking', keywords: ['bake', 'baking', 'cake'] },
  { name: 'Countertops', label: 'Counters', keywords: ['counter', 'countertop', 'wipe'] },
  { name: 'Chair', label: 'Tidy Room', keywords: ['tidy', 'room', 'clean up', 'pick up', 'organize'] },
  { name: 'Weekend', label: 'Living Room', keywords: ['living room', 'couch', 'tidy'] },
  { name: 'DoorFront', label: 'Door', keywords: ['door', 'lock'] },
  { name: 'Window', label: 'Windows', keywords: ['window', 'windows'] },
  { name: 'Pets', label: 'Pet Care', keywords: ['pet', 'dog', 'cat', 'feed pet', 'walk dog'] },
  { name: 'Grass', label: 'Yard', keywords: ['yard', 'lawn', 'mow', 'grass'] },
  { name: 'LocalFlorist', label: 'Garden', keywords: ['garden', 'plant', 'water plants', 'flowers'] },
  { name: 'WaterDrop', label: 'Water', keywords: ['water', 'plants', 'hydrate'] },
  { name: 'DirectionsCar', label: 'Car', keywords: ['car', 'drive'] },
  { name: 'LocalCarWash', label: 'Wash Car', keywords: ['wash car', 'car wash'] },
  { name: 'ShoppingCart', label: 'Shopping', keywords: ['shop', 'shopping', 'groceries', 'store', 'buy'] },
  { name: 'School', label: 'School', keywords: ['school', 'homework', 'study', 'class'] },
  { name: 'MenuBook', label: 'Reading', keywords: ['read', 'reading', 'book'] },
  { name: 'Book', label: 'Book', keywords: ['book', 'homework'] },
  { name: 'Draw', label: 'Art', keywords: ['draw', 'art', 'coloring', 'color'] },
  { name: 'Palette', label: 'Art', keywords: ['paint', 'art', 'craft'] },
  { name: 'Toys', label: 'Toys', keywords: ['toy', 'toys', 'play', 'clean up toys'] },
  { name: 'SportsEsports', label: 'Games', keywords: ['game', 'games', 'video game', 'screen time'] },
  { name: 'MusicNote', label: 'Music', keywords: ['music', 'practice', 'instrument', 'piano'] },
  { name: 'FitnessCenter', label: 'Exercise', keywords: ['exercise', 'workout', 'gym'] },
  { name: 'DirectionsWalk', label: 'Walk', keywords: ['walk', 'walking'] },
  { name: 'DirectionsBike', label: 'Bike', keywords: ['bike', 'bicycle', 'ride'] },
  { name: 'SelfImprovement', label: 'Relax', keywords: ['relax', 'calm', 'quiet time', 'meditate'] },
  { name: 'EmojiEmotions', label: 'Mood', keywords: ['mood', 'feelings', 'check in'] },
  { name: 'Brush', label: 'Paint', keywords: ['paint', 'brush'] },
  { name: 'Alarm', label: 'Wake Up', keywords: ['wake', 'alarm', 'morning'] },
  { name: 'Timer', label: 'Timer', keywords: ['timer', 'time'] },
  { name: 'CalendarToday', label: 'Schedule', keywords: ['schedule', 'calendar', 'plan'] },
  { name: 'Star', label: 'Reward', keywords: ['reward', 'star', 'good job'] },
]

export const ICON_COMPONENTS = {
  Alarm,
  Bathtub,
  Bed,
  Book,
  Brush,
  Cake,
  CalendarToday,
  Chair,
  Checkroom,
  CleanHands,
  CleaningServices,
  Countertops,
  DeleteOutline,
  DirectionsBike,
  DirectionsCar,
  DirectionsWalk,
  DoorFront,
  Draw,
  EmojiEmotions,
  Fastfood,
  FitnessCenter,
  Grass,
  Icecream,
  Kitchen,
  LocalCarWash,
  LocalDining,
  LocalFlorist,
  LocalLaundryService,
  MenuBook,
  MusicNote,
  Palette,
  Pets,
  Recycling,
  School,
  SelfImprovement,
  Shower,
  ShoppingCart,
  SportsEsports,
  Star,
  Timer,
  Toys,
  WaterDrop,
  Wc,
  Weekend,
  Window,
  Yard,
}

/**
 * Live-filter the icon list against a free-text query, matching against
 * both the display label and the keyword list.
 */
export function searchChoreIcons(query) {
  const q = query.trim().toLowerCase()
  if (!q) return CHORE_ICONS
  return CHORE_ICONS.filter(
    icon =>
      icon.label.toLowerCase().includes(q) ||
      icon.name.toLowerCase().includes(q) ||
      icon.keywords.some(k => k.includes(q)),
  )
}

/**
 * Best-effort auto-select: picks the first icon whose keyword appears
 * as a whole word in the task title. Returns null if nothing matches,
 * so callers can leave the icon unset rather than force a bad guess.
 */
export function matchIconForTitle(title) {
  if (!title) return null
  const words = title.toLowerCase().match(/[a-z0-9']+/g) || []
  if (words.length === 0) return null
  const wordSet = new Set(words)
  for (const icon of CHORE_ICONS) {
    for (const keyword of icon.keywords) {
      const keywordWords = keyword.split(' ')
      if (keywordWords.length === 1) {
        if (wordSet.has(keywordWords[0])) return icon.name
      } else if (title.toLowerCase().includes(keyword)) {
        return icon.name
      }
    }
  }
  return null
}
