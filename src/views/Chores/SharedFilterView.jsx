import { Add } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Input,
  Option,
  Select,
  Typography,
} from '@mui/joy'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { ImpersonateUserProvider } from '../../contexts/ImpersonateUserContext.jsx'
import { ChoresGrouper, GROUPING_OPTIONS } from '../../utils/Chores.jsx'
import { applyFilter } from '../../utils/FilterEngine'
import {
  CompleteSharedTask,
  CreateSharedTask,
  GetSharedFilterTasks,
} from '../../utils/ShareApiClient'
import ChoreCard from './ChoreCard'

const GROUP_BY_OPTIONS = [
  { value: GROUPING_OPTIONS.SMART, label: 'Smart' },
  { value: GROUPING_OPTIONS.DUE_DATE, label: 'Due Date' },
  { value: GROUPING_OPTIONS.PRIORITY, label: 'Priority' },
  { value: GROUPING_OPTIONS.ASSIGNEE, label: 'Assignee' },
]

// Chrome-less page rendered at /share/:token, meant to be embedded (e.g. a
// Home Assistant iframe card) and used with no login. Filter matching is done
// client-side with the same FilterEngine the authenticated app uses - the
// share endpoint intentionally returns the raw filter + full chore list
// rather than duplicating condition-matching logic on the backend.
//
// Wrapped in ImpersonateUserProvider because it skips App (see
// RouterContext.jsx) - ChoreCard reads useImpersonateUser() unconditionally,
// and that context is otherwise only provided inside App's tree. The
// provider itself is just local React state seeded from localStorage, so
// it's harmless to mount standalone here.
const SharedFilterView = () => (
  <ImpersonateUserProvider>
    <SharedFilterViewContent />
  </ImpersonateUserProvider>
)

const SharedFilterViewContent = () => {
  const { token } = useParams()
  const queryClient = useQueryClient()
  const [groupBy, setGroupBy] = useState(GROUPING_OPTIONS.SMART)
  const [newTaskName, setNewTaskName] = useState('')
  const [addingTask, setAddingTask] = useState(false)

  const queryKey = ['sharedFilter', token]

  const { data, isError, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await GetSharedFilterTasks(token)
      if (!res.ok) {
        throw new Error('Share link not found or no longer active')
      }
      return res.json()
    },
    retry: false,
  })

  const handleComplete = async chore => {
    const res = await CompleteSharedTask(token, chore.id)
    if (res.ok) {
      queryClient.invalidateQueries(queryKey)
    }
  }

  // Only 'complete' is backed by the share API - the card's overflow menu
  // exposes other actions (approve, nudge, delete, etc.) that this
  // anonymous, no-login view doesn't support, so they're silently ignored
  // rather than wired to a non-existent endpoint.
  const handleChoreAction = (action, chore) => {
    if (action === 'complete') {
      handleComplete(chore)
    }
  }

  const handleAddTask = async e => {
    e.preventDefault()
    if (!newTaskName.trim()) return
    setAddingTask(true)
    try {
      const res = await CreateSharedTask(token, { name: newTaskName.trim() })
      if (res.ok) {
        setNewTaskName('')
        queryClient.invalidateQueries(queryKey)
      }
    } finally {
      setAddingTask(false)
    }
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !data) {
    return (
      <Box sx={{ p: 3, maxWidth: 480, mx: 'auto', mt: 6 }}>
        <Alert color='danger'>
          This link is invalid or has expired. Ask whoever shared it to send a
          new one.
        </Alert>
      </Box>
    )
  }

  const { chores, filter, members } = data
  const filteredChores = applyFilter(chores, filter, {})
  const sections = ChoresGrouper(groupBy, filteredChores, null, members)

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 720, mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography level='h3'>{filter.name}</Typography>
        <Select
          value={groupBy}
          onChange={(_, value) => value && setGroupBy(value)}
          size='sm'
        >
          {GROUP_BY_OPTIONS.map(opt => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>
      </Box>

      <Box
        component='form'
        onSubmit={handleAddTask}
        sx={{ display: 'flex', gap: 1, mb: 3 }}
      >
        <Input
          placeholder='Add a task…'
          value={newTaskName}
          onChange={e => setNewTaskName(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Button
          type='submit'
          startDecorator={<Add />}
          loading={addingTask}
          disabled={!newTaskName.trim()}
        >
          Add
        </Button>
      </Box>

      {sections.every(section => section.content.length === 0) && (
        <Typography level='body-sm' sx={{ color: 'text.tertiary', mb: 2 }}>
          No tasks match this filter right now.
        </Typography>
      )}

      {sections.map(
        section =>
          section.content.length > 0 && (
            <Box key={section.name} sx={{ mb: 3 }}>
              <Typography
                level='title-sm'
                sx={{ mb: 1, color: 'text.secondary' }}
              >
                {section.name}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {section.content.map(chore => (
                  <ChoreCard
                    key={chore.id}
                    chore={chore}
                    performers={members}
                    onAction={handleChoreAction}
                    onChipClick={() => {}}
                    showActions
                    disableProfileFetch
                    hideOverflowMenu
                  />
                ))}
              </Box>
            </Box>
          ),
      )}
    </Box>
  )
}

export default SharedFilterView
