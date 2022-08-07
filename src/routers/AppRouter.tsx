import {Navigate, Route, Routes} from 'react-router-dom'
import PrimarySearchAppBar from '../components/Navbar/NavBar';
import {LoginPage} from '../components/Login/LoginPage';
import ProductPage from "../components/Product/ProductPage";

export const AppRouter = () => {
    return (
        <>
            <PrimarySearchAppBar/>
            <Routes>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="product" element={<ProductPage/>}/>
                <Route path="/" element={<Navigate to={"/product"}/>}/>
            </Routes>
        </>

    )

}