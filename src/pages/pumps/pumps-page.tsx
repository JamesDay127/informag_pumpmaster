import { PumpsTable } from './pumps-table'
import { Pump } from '../../types/pump'
import { useState } from 'react'
import { PumpDetailsModal } from './pump-details-modal'
import { Typography } from '@mui/material'

/**
 * The pumps page.
 * Has not been styled to design spec, but is a functional example.
 * Currently used to host the pumps table and pump details modal.
 */
export const PumpsPage = () => {
  const [selectedPump, setSelectedPump] = useState<Pump | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePumpUpdated = (updatedPump: Pump) => {
    setSelectedPump(updatedPump)
  }

  const handlePumpDeleted = () => {
    setSelectedPump(undefined)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Pumps</Typography>

      <PumpsTable 
        setSelectedPump={setSelectedPump} 
        setIsModalOpen={setIsModalOpen} 
        onPumpDeleted={handlePumpDeleted}
      />

      {selectedPump && isModalOpen ? (
        <PumpDetailsModal 
          pump={selectedPump} 
          setIsModalOpen={setIsModalOpen}
          onPumpUpdated={handlePumpUpdated}
          onPumpDeleted={handlePumpDeleted}
        />
      ) : undefined}
    </div>
  )
}