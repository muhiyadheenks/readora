import { useAuth } from './AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const AuthGuard = ({ children }) => {


    const { user } = useAuth()


    if (!user) return <Navigate to={'/'} />

    return <Outlet />
}

export default AuthGuard

// export const AdminAuth = () => {
//     const { user } = useAuth()
//     console.log(user);

//     if (!user || user.role !== 'admin') return <Navigate to={'/login'} />

//     return <Outlet />
// }
