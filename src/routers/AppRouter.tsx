import {Navigate, Route, Routes} from 'react-router-dom'
import PrimarySearchAppBar from '../components/Navbar/NavBar';
import {LoginPage} from '../components/Login/LoginPage';

export const AppRouter = () => {
    return (
        <>
            <PrimarySearchAppBar/>
            <Routes>
                <Route path="login" element={<LoginPage />}/>
                <Route path="/" element={<Navigate to={"/login"} />}/>
            </Routes>
        </>

    )

}