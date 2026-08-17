import {
  Avatar,
  Box,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Typography,
} from '@mui/joy'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import ModalActions from '../../../components/common/ModalActions'
import { searchChoreIcons } from '../../../constants/choreIcons'
import { useResponsiveModal } from '../../../hooks/useResponsiveModal'
import { getTextColorFromBackgroundColor } from '../../../utils/Colors'
import { getIconComponent } from '../../../utils/ProjectIcons'

const IconPickerModal = ({
  currentIcon,
  isOpen,
  onClose,
  onSelect,
  projectColor,
}) => {
  const { t } = useTranslation('projects')
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
      title={t('iconPicker.chooseIcon')}
      footer={
        <ModalActions
          secondary={{ label: t('common:cancel'), onClick: onClose }}
        />
      }
    >
      <FormControl sx={{ mb: 2 }}>
        <FormLabel>{t('iconPicker.searchIcons')}</FormLabel>
        <Input
          autoFocus
          placeholder={t('iconPicker.searchPlaceholder')}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          {t('iconPicker.availableIcons')} ({results.length})
        </FormLabel>
        <Grid
          container
          spacing={1}
          sx={{ maxHeight: '300px', overflowY: 'auto', mb: 2 }}
        >
          {results.map(iconData => {
            const IconComponent = getIconComponent(iconData.name)
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
                      borderColor: isCurrentIcon
                        ? 'primary.600'
                        : 'neutral.300',
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
                      bgcolor: projectColor,
                      mb: 0.5,
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 16,
                        color: getTextColorFromBackgroundColor(projectColor),
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
            {t('iconPicker.noResults', { query })}
          </Typography>
        )}
      </FormControl>
    </ResponsiveModal>
  )
}

export default IconPickerModal
