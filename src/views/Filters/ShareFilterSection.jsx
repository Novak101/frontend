import { ContentCopy, Refresh } from '@mui/icons-material'
import { Box, Button, IconButton, Input, Switch, Typography } from '@mui/joy'
import { useState } from 'react'

import { useAlerts } from '../../service/AlertsProvider'
import {
  useDisableFilterShare,
  useEnableFilterShare,
  useFilter,
  useRegenerateFilterShare,
} from './FilterQueries'

// Lets a saved filter be shared as an anonymous, no-login URL (e.g. for
// embedding in a Home Assistant iframe card). Reads the filter from the
// query cache via useFilter rather than trusting the editingFilter prop
// snapshot, since the share mutations below update that cache directly.
const ShareFilterSection = ({ filterId }) => {
  const { data: filter } = useFilter(filterId)
  const { showAlert } = useAlerts()
  const enableShare = useEnableFilterShare()
  const disableShare = useDisableFilterShare()
  const regenerateShare = useRegenerateFilterShare()
  const [confirmingRegenerate, setConfirmingRegenerate] = useState(false)

  if (!filter) return null

  const shareUrl = filter.shareToken
    ? `${window.location.origin}/share/${filter.shareToken}`
    : null

  const handleToggle = () => {
    if (filter.shareEnabled) {
      disableShare.mutate(filterId)
    } else {
      enableShare.mutate(filterId)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    showAlert({ message: 'Link copied to clipboard', color: 'success' })
  }

  const handleRegenerate = () => {
    if (!confirmingRegenerate) {
      setConfirmingRegenerate(true)
      return
    }
    regenerateShare.mutate(filterId, {
      onSuccess: () => setConfirmingRegenerate(false),
    })
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Box>
          <Typography
            level='body-xs'
            sx={{ color: 'text.secondary', fontWeight: 600 }}
          >
            Share link
          </Typography>
          <Typography level='body-xs' sx={{ color: 'text.tertiary' }}>
            Anyone with the link can view and check off these tasks without
            logging in. There&apos;s no attribution, so avoid conditions like
            &quot;assigned to me&quot; - they&apos;ll never match for a
            visitor.
          </Typography>
        </Box>
        <Switch
          checked={filter.shareEnabled}
          onChange={handleToggle}
          disabled={enableShare.isPending || disableShare.isPending}
        />
      </Box>

      {filter.shareEnabled && shareUrl && (
        <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
          <Input value={shareUrl} readOnly sx={{ flex: 1 }} />
          <IconButton variant='outlined' onClick={handleCopy}>
            <ContentCopy sx={{ fontSize: 18 }} />
          </IconButton>
          <Button
            variant={confirmingRegenerate ? 'solid' : 'outlined'}
            color={confirmingRegenerate ? 'danger' : 'neutral'}
            size='sm'
            startDecorator={<Refresh sx={{ fontSize: 16 }} />}
            onClick={handleRegenerate}
            loading={regenerateShare.isPending}
          >
            {confirmingRegenerate ? 'Confirm regenerate?' : 'Regenerate'}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default ShareFilterSection
