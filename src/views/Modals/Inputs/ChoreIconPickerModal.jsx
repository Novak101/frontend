import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Typography,
} from '@mui/joy'
import { useEffect, useState } from 'react'
import { useResponsiveModal } from '../../../hooks/useResponsiveModal'
import { ICON_COMPONENTS, searchChoreIcons } from '../../../constants/choreIcons'

// Same UI pattern as IconPickerModal (used for Projects), with a live
// search box added on top -- Project icons don't need search since the
// list is small/fixed, but the chore icon set is search-first per the
// intended UX (auto-select from title, with manual override via search).
const ChoreIconPickerModal = ({ isOpen, onClose, onSelect, currentIcon }) => {
  const { ResponsiveModal } = useResponsiveModal()
  const [query, setQuery] = useState('')
  const results = searchChoreIcons(query)

  useEffect(() => {
    if (isOpen) setQuery('')
  }, [isOpen])

  const handleIconClick = iconName => {
    onSelect(iconName)
    onClose()
  }

  return (
    <ResponsiveModal
      open={isOpen}
      onClose={onClose}
      size='lg'
      fullWidth={true}
      unmountDelay={250}
      title='Choose Task Icon'
    >
      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Search Icons</FormLabel>
        <Input
          autoFocus
          placeholder='e.g. laundry, trash, homework...'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          {results.length} icon{results.length === 1 ? '' : 's'}
        </FormLabel>
        <Grid
          container
          spacing={1}
          sx={{ maxHeight: '300px', overflowY: 'auto', mb: 2 }}
        >
          {results.map(iconData => {
            const IconComponent = ICON_COMPONENTS[iconData.name]
            const isCurrentIcon = currentIcon === iconData.name
            return (
              <Grid key={iconData.name} xs={3} sm={2}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 'sm',
                    border: '2px solid',
                    borderColor: isCurrentIcon ? 'primary.500' : 'transparent',
                    '&:hover': {
                      borderColor: isCurrentIcon ? 'primary.600' : 'neutral.300',
                    },
                    transition: 'border-color 0.2s',
                  }}
                  onClick={() => handleIconClick(iconData.name)}
                >
                  <Avatar
                    size='sm'
                    sx={{
                      width: 32,
                      height: 32,
                      mb: 0.5,
                      bgcolor: isCurrentIcon ? 'primary.500' : 'neutral.200',
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 16,
                        color: isCurrentIcon ? '#fff' : 'inherit',
                      }}
                    />
                  </Avatar>
                  <Typography
                    level='body-xs'
                    sx={{
                      textAlign: 'center',
                      fontSize: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    {iconData.label}
                  </Typography>
                </Box>
              </Grid>
            )
          })}
        </Grid>
        {results.length === 0 && (
          <Typography level='body-sm' sx={{ textAlign: 'center', py: 2 }}>
            No icons match "{query}"
          </Typography>
        )}
      </FormControl>

      <Box display='flex' justifyContent='center' mt={3}>
        <Button variant='outlined' onClick={onClose} fullWidth size='lg'>
          Cancel
        </Button>
      </Box>
    </ResponsiveModal>
  )
}

export default ChoreIconPickerModal
