import AdminApp from './admin/AdminApp.jsx';
import MainPage from './Layouts/MainPage/MainPage';
import AddMyJoke from './Layouts/AddMyJoke/AddMyJoke';
import FavoritesJokes from './Layouts/FavoritesJokes/FavoritesJokes';
import RegisterPage from './Layouts/RegisterPage/RegisterPage.jsx';
import LoginPage from './Layouts/LoginPage/LoginPage.jsx';
import TopJokes from './Layouts/TopJokes/TopJokes.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin/*" element={<AdminApp />} />
                    <Route path="/add-joke" element={<AddMyJoke />} />
                    <Route path="/favorites" element={<FavoritesJokes />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/top" element={<TopJokes />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/:id" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
