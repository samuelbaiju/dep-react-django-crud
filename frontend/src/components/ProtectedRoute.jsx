import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants'
import {useState,useEffect} from 'react'

function ProtectedRoute({children}) {
    const [isAuthorized, setAuthorized] = useState(null)

    useEffect(() => {
        checkAuthorization().catch(() =>
            setAuthorized(false))
        },)

    const refreshToken= async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const response = await api.post('/refresh-token', {refresh: refreshToken});
            if (response.status === 200) {
                const {access} = response.data
                localStorage.setItem(ACCESS_TOKEN, access)
                setAuthorized(true)
            }else {
                console.error('Failed to refresh token:', response.statusText)
                setAuthorized(false)
            }
        }catch (error) {
            console.error('Error refreshing token:', error)
            setAuthorized(false)
        }
    };

    const checkAuthorization = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setAuthorized(false)
            return
        }
        const decodedToken = jwtDecode(token)
        const tokenExpiration = decodedToken.exp * 1000
        const currentTime = Date.now()/ 1000
        if (tokenExpiration < currentTime) 
            {
                await refreshToken()
            }else  {
                setAuthorized(true)
                return
            }
        }

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? (
        children
    ) : (
        <Navigate to="/login" replace />
    );
}
    export default ProtectedRoute;