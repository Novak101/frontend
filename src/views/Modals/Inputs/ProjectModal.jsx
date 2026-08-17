import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Typography,
} from '@mui/joy'
import { useEffect, useState } from 'react'

import ModalActions from '../../../components/common/ModalActions'
import { matchIconForTitle } from '../../../constants/choreIcons'
import { useResponsiveModal } from '../../../hooks/useResponsiveModal'
import PROJECT_COLORS, {
  getTextColorFromBackgroundColor,
} from '../../../utils/Colors'
import PROJECT_ICONS, {
  DEFAULT_PROJECT_ICON,
  getIconComponent,
} from '../../../utils/ProjectIcons'
import {
  useCreateProject,
  useUpdateProject,
} from '../../Projects/ProjectQueries'
import IconPickerModal from './IconPickerModal'

const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const { ResponsiveModal } = useResponsiveModal()
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectColor, setProjectColor] = useState(PROJECT_COLORS[0].value)
  const [projectIcon, setProjectIcon] = useState(DEFAULT_PROJECT_ICON)
  const [iconTouched, setIconTouched] = useState(false)
  const [error, setError] = useState('')
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false)

  const createProjectMutation = useCreateProject()
  const updateProjectMutation = useUpdateProject()

  // Initialize form when modal opens or project changes
  useEffect(() => {
    if (isOpen) {
      if (project) {
        // Editing existing project
        setProjectName(project.name || '')
        setProjectDescription(project.description || '')
        setProjectColor(project.color || PROJECT_COLORS[0].value)
        setProjectIcon(project.icon || DEFAULT_PROJECT_ICON)
        setIconTouched(!!project.icon)
      } else {
        // Creating new project
        setProjectName('')
        setProjectDescription('')
        setProjectColor(PROJECT_COLORS[0].value)
        setProjectIcon(DEFAULT_PROJECT_ICON)
        setIconTouched(false)
      }
      setError('')
    }
  }, [isOpen, project])

  // Auto-select an icon from the project name as the user types, unless
  // they've manually picked one via the picker (iconTouched) -- manual
  // choice always wins over the heuristic. Same pattern as task/chore icons.
  useEffect(() => {
    if (!isOpen || iconTouched) return
    const suggested = matchIconForTitle(projectName)
    if (suggested) setProjectIcon(suggested)
  }, [projectName, iconTouched, isOpen])

  const handleSubmit = e => {
    e.preventDefault()

    if (!projectName.trim()) {
      setError('Project name is required')
      return
    }

    setError('')

    const projectData = {
      name: projectName.trim(),
      description: projectDescription.trim(),
      color: projectColor,
      icon: projectIcon,
    }

    if (project) {
      // Update existing project
      updateProjectMutation.mutate(
        { projectId: project.id, projectData },
        {
          onSuccess: updatedProject => {
            onSave(updatedProject)
            onClose()
          },
          onError: error => {
            console.error('Error updating project:', error)
            setError('Failed to update project')
          },
        },
      )
    } else {
      // Create new project
      createProjectMutation.mutate(projectData, {
        onSuccess: newProject => {
          onSave(newProject)
          onClose()
        },
        onError: error => {
          console.error('Error creating project:', error)
          setError('Failed to create project')
        },
      })
    }
  }

  const handleClose = () => {
    const isLoading =
      createProjectMutation.isPending || updateProjectMutation.isPending
    if (!isLoading) {
      onClose()
    }
  }

  const isSubmitting =
    createProjectMutation.isPending || updateProjectMutation.isPending

  const handleIconSelect = iconValue => {
    setProjectIcon(iconValue)
    setIconTouched(true)
    setIsIconPickerOpen(false)
  }

  return (
    <ResponsiveModal
      open={isOpen}
      onClose={handleClose}
      size='md'
      unmountDelay={250}
      fullWidth={true}
      title={project ? 'Edit Project' : 'Create New Project'}
      closeOnBackdrop={!isSubmitting}
      closeOnEscape={!isSubmitting}
      footer={
        <ModalActions
          secondary={{
            label: 'Cancel',
            onClick: handleClose,
            disabled: isSubmitting,
          }}
          primary={{
            label: project ? 'Update' : 'Create',
            type: 'submit',
            form: 'project-form',
            loading: isSubmitting,
            disabled: !projectName.trim() || isSubmitting,
          }}
        />
      }
    >
      <form onSubmit={handleSubmit} id='project-form'>
        <Stack spacing={3}>
          {/* Project Name */}
          <FormControl required>
            <FormLabel>Project Name</FormLabel>
            <Input
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              placeholder='Enter project name...'
              autoFocus
              disabled={isSubmitting}
            />
          </FormControl>

          {/* Project Description */}
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={projectDescription}
              onChange={e => setProjectDescription(e.target.value)}
              placeholder='Optional project description...'
              minRows={2}
              maxRows={4}
              disabled={isSubmitting}
            />
          </FormControl>

          {/* Icon Selection */}
          <FormControl>
            <FormLabel>Project Icon</FormLabel>
            <Button
              variant='outlined'
              onClick={() => setIsIconPickerOpen(true)}
              startDecorator={
                <Avatar
                  size='sm'
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: projectColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& svg': {
                      display: 'block',
                      margin: '0 auto',
                    },
                  }}
                >
                  {(() => {
                    const IconComponent = getIconComponent(projectIcon)
                    return (
                      <IconComponent
                        sx={{
                          fontSize: 14,
                          color: getTextColorFromBackgroundColor(projectColor),
                          display: 'block',
                        }}
                      />
                    )
                  })()}
                </Avatar>
              }
              sx={{ justifyContent: 'flex-start' }}
            >
              {PROJECT_ICONS.find(icon => icon.name === projectIcon)?.label ||
                'Select Icon'}
            </Button>
          </FormControl>

          {/* Color Selection */}
          <FormControl>
            <FormLabel>Project Color</FormLabel>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {PROJECT_COLORS.map(colorOption => (
                <Box
                  key={colorOption.value}
                  title={colorOption.name}
                  onClick={() => setProjectColor(colorOption.value)}
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: colorOption.value,
                    cursor: 'pointer',
                    outline:
                      projectColor === colorOption.value
                        ? '3px solid var(--joy-palette-primary-500)'
                        : '2px solid transparent',
                    outlineOffset: '2px',
                    transition: 'all 0.15s ease',
                    flexShrink: 0,
                    '&:hover': { transform: 'scale(1.2)' },
                  }}
                />
              ))}
            </Box>
          </FormControl>

          {/* Error Message */}
          {error && (
            <Typography color='danger' level='body-sm'>
              {error}
            </Typography>
          )}
        </Stack>
      </form>
      <IconPickerModal
        isOpen={isIconPickerOpen}
        onClose={() => setIsIconPickerOpen(false)}
        onSelect={handleIconSelect}
        currentIcon={projectIcon}
        projectColor={projectColor}
      />
    </ResponsiveModal>
  )
}

export default ProjectModal
