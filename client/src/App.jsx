import MainPage from './Layouts/MainPage/MainPage';
import AddMyJoke from './Layouts/AddMyJoke/AddMyJoke';
import FavoritesJokes from './Layouts/FavoritesJokes/FavoritesJokes';
import AdminApp from "./admin/AdminApp.jsx";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin/*" element={<AdminApp />} />
                    <Route path="/add-joke" element={<AddMyJoke />} />
                    <Route path="/favorites" element={<FavoritesJokes />} />
                    <Route path="/:id" element={<MainPage />} />
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;