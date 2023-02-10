import { useContext } from 'react';
import { Navigate} from 'react-router-dom'
import AuthContext from '../context';

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    
    if(!user) {
        return <Navigate to={'/'} replace/>
    }else {
        return children
    }
}

export default PrivateRoute