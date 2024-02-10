import {Route, Routes} from 'react-router-dom'

//Components
import HomePage from './components/HomePage'
import JoinRoomPage from './components/JoinRoomPage'
import CreateRoomPage from './components/CreateRoomPage'
import EditPage from './components/EditPage'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'
import JoinFullIcon from '@mui/icons-material/JoinFull'

const routes = [
    { path: '/', name: 'Home', element: <HomePage />, icon: <HomeIcon />},
    { path: '/join', name: 'Join', element: <JoinRoomPage />, icon: <AddIcon />},
    { path: '/create', name: 'Create', element: <CreateRoomPage />, icon:  <JoinFullIcon />},

]

const AppRoutes = () => {
    return (
        <Routes>
            {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
    )
}

export {routes, AppRoutes}