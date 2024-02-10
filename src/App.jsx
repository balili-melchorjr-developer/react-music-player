import { BrowserRouter as Router } from 'react-router-dom'
import {AppRoutes, routes} from './Routes'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  
  return (
    
      <div>
        <Router>
          <Navbar routes={routes} />
          <AppRoutes />
                    
        </Router>
      </div>   
  )
}

export default App