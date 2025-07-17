import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
    setIsMenuOpen(false)
  }

  // Use usernames first letter as a placeholder for the user icon
  const userNameFirstLetter = user?.name?.[0]?.toUpperCase() || '?'

  return (
    <nav style={{
      backgroundColor: 'white',
      padding: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: '2rem' }}>
          PumpMaster
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Dashboard</Link>
          <Link to="/pumps" style={{ textDecoration: 'none', color: '#333' }}>Pumps</Link>
          <Link to="/reports" style={{ textDecoration: 'none', color: '#333' }}>Reports</Link>
          <Link to="/alerts" style={{ textDecoration: 'none', color: '#333' }}>Alerts</Link>
        </div>
      </div>
      
      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #333',
            background: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}
        >
          {userNameFirstLetter}
        </button>
        
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            minWidth: '150px'
          }}>
            <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #eee' }}>
              {user?.name}
            </div>
            <button 
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                textAlign: 'left',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: '#333'
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}