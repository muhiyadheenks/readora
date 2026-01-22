import { useAuth } from './AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGuard = ({ children }) => {


    const { user } = useAuth()



    if (!user) return <Navigate to={'/'} />

    return <Outlet />
}

export default AuthGuard
