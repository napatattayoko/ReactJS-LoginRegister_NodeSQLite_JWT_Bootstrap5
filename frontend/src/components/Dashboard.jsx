import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 ">
          <div className="card">
            <div className="card-body text-center">
              <h2 className="card-title">Welcome to your dashboard!</h2>
              <p>You have successfully login.</p>
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
