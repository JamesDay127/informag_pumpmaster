import {useState, useEffect} from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { Pump } from '../../types/pump'
import { PumpService } from '../../services'
import { useAuth } from '../../contexts/AuthContext'

type Order = 'asc' | 'desc'
type OrderBy = keyof Pump

/**
 * A table for displaying all pumps.
 * Has not been styled to design spec, but is a functional example. 
 * Allows sorting by any column.
 * 
 */
export const PumpsTable = ({ 
  setSelectedPump, 
  setIsModalOpen,
  onPumpDeleted
}: { 
  setSelectedPump: (pump: Pump) => void, 
  setIsModalOpen: (isOpen: boolean) => void,
  onPumpDeleted: (deletedPumpId: number) => void
}) => {
  const [pumps, setPumps] = useState<Pump[]>([])
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<OrderBy>('name')
  const { user } = useAuth()

  useEffect(() => {
    const fetchPumps = async () => {
      const pumps = await PumpService.listAllPumps(user!.id)
      setPumps(pumps)
    }
    fetchPumps()
  }, [])

  const handlePumpClick = (pump: Pump) => {
    setSelectedPump(pump)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const fetchPumps = async () => {
      const pumps = await PumpService.listAllPumps(user!.id)
      setPumps(pumps)
    }
    fetchPumps()
  }, [onPumpDeleted])

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedPumps = [...pumps].sort((a, b) => {
    if (order === 'desc') {
      return a[orderBy] < b[orderBy] ? 1 : -1
    }
    return a[orderBy] > b[orderBy] ? 1 : -1
  })

  const renderSortLabel = (property: OrderBy, label: string) => (
    <TableSortLabel
      active={orderBy === property}
      direction={orderBy === property ? order : 'asc'}
      onClick={() => handleRequestSort(property)}
    >
      {label}
    </TableSortLabel>
  )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="sortable table">
        <TableHead>
          <TableRow>
            <TableCell>{renderSortLabel('name', 'Pump Name')}</TableCell>
            <TableCell>{renderSortLabel('type', 'Type')}</TableCell>
            <TableCell>{renderSortLabel('area', 'Area/Block')}</TableCell>
            <TableCell>{renderSortLabel('latitude', 'Latitude')}</TableCell>
            <TableCell>{renderSortLabel('longitude', 'Longitude')}</TableCell>
            <TableCell>{renderSortLabel('flowRate', 'Flow Rate')}</TableCell>
            <TableCell>{renderSortLabel('offset', 'Offset')}</TableCell>
            <TableCell>{renderSortLabel('currentPressure', 'Current Pressure')}</TableCell>
            <TableCell>{renderSortLabel('minPressure', 'Min Pressure')}</TableCell>
            <TableCell>{renderSortLabel('maxPressure', 'Max Pressure')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPumps.map((pump) => (
            <TableRow
              key={pump.id}
              onClick={() => handlePumpClick(pump)}
              sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
            >
              <TableCell component="th" scope="row">
                {pump.name}
              </TableCell>
              <TableCell>{pump.type}</TableCell>
              <TableCell>{pump.area}</TableCell>
              <TableCell>{pump.latitude}</TableCell>
              <TableCell>{pump.longitude}</TableCell>
              <TableCell>{pump.flowRate} GPM</TableCell>
              <TableCell>{pump.offset}</TableCell>
              <TableCell>{pump.currentPressure} psi</TableCell>
              <TableCell>{pump.minPressure} psi</TableCell>
              <TableCell>{pump.maxPressure} psi</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
