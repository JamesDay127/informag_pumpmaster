import { Pump, PumpType } from "../../types/pump"
import { Button, Box, Typography, Paper, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { useState } from "react"
import { updatePump, deletePump } from "../../services/pump-serivce"

/**
 * A basic modal for displaying/editing pump details.
 * Has not been styled to design spec, but is a functional example.
 * Also supports deleting pumps.
 */
export const PumpDetailsModal = ({
  pump, 
  setIsModalOpen,
  onPumpUpdated,
  onPumpDeleted
}: { 
  pump: Pump, 
  setIsModalOpen: (isOpen: boolean) => void,
  onPumpUpdated: (updatedPump: Pump) => void,
  onPumpDeleted: (deletedPumpId: number) => void
}) => {
  const [editedPump, setEditedPump] = useState<Pump>({ ...pump })
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const updatedPump = await updatePump(editedPump, pump.userId)
      onPumpUpdated(updatedPump)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to update pump:', error)
      // In a real app, you'd show a toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deletePump(pump.id, pump.userId)
      onPumpDeleted(pump.id)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to delete pump:', error)
      // In a real app, you'd show a toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditedPump({ ...pump })
    setIsModalOpen(false)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={handleCancel}
    >
      <Paper
        sx={{
          padding: 3,
          maxWidth: 600,
          width: '90%',
          maxHeight: '90%',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h4" gutterBottom>
          Edit Pump
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            value={editedPump.name}
            onChange={(e) => setEditedPump({ ...editedPump, name: e.target.value })}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={editedPump.type}
              label="Type"
              onChange={(e) => setEditedPump({ ...editedPump, type: e.target.value as PumpType })}
            >
              {Object.values(PumpType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Area"
            value={editedPump.area}
            onChange={(e) => setEditedPump({ ...editedPump, area: e.target.value })}
            fullWidth
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Latitude"
              value={editedPump.latitude}
              onChange={(e) => setEditedPump({ ...editedPump, latitude: e.target.value })}
              fullWidth
            />
            <TextField
              label="Longitude"
              value={editedPump.longitude}
              onChange={(e) => setEditedPump({ ...editedPump, longitude: e.target.value })}
              fullWidth
            />
          </Box>

          <TextField
            label="Flow Rate"
            value={editedPump.flowRate}
            onChange={(e) => setEditedPump({ ...editedPump, flowRate: parseFloat(e.target.value) || 0 })}
            fullWidth
            slotProps={{
              input: {
                style: {
                  WebkitAppearance: 'none',
                  MozAppearance: 'textfield'
                }
              }
            }}
          />

          <TextField
            label="Offset"
            value={editedPump.offset}
            onChange={(e) => setEditedPump({ ...editedPump, offset: e.target.value })}
            fullWidth
            slotProps={{
              input: {
                style: {
                  WebkitAppearance: 'none',
                  MozAppearance: 'textfield'
                }
              }
            }}
          />

          <TextField
            label="Current Pressure"
            value={editedPump.currentPressure}
            onChange={(e) => setEditedPump({ ...editedPump, currentPressure: parseFloat(e.target.value) || 0 })}
            fullWidth
            slotProps={{
              input: {
                style: {
                  WebkitAppearance: 'none',
                  MozAppearance: 'textfield'
                }
              }
            }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Min Pressure"
              value={editedPump.minPressure}
              onChange={(e) => setEditedPump({ ...editedPump, minPressure: parseFloat(e.target.value) || 0 })}
              fullWidth
              slotProps={{
                input: {
                  style: {
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield'
                  }
                }
              }}
            />
            <TextField
              label="Max Pressure"
              value={editedPump.maxPressure}
              onChange={(e) => setEditedPump({ ...editedPump, maxPressure: parseFloat(e.target.value) || 0 })}
              fullWidth
              slotProps={{
                input: {
                  style: {
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield'
                  }
                }
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button 
            variant="contained" 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="outlined" 
            color="error"
            onClick={handleDelete}
            disabled={isLoading}
            sx={{ ml: 'auto' }}
          >
            Delete Pump
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
