import AdminPanel from './Layouts/AdminPanel/AdminPanel';
import MainPage from './Layouts/MainPage/MainPage';
import AddMyJoke from './Layouts/AddMyJoke/AddMyJoke';
import FavoritesJokes from './Layouts/FavoritesJokes/FavoritesJokes';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/add-joke" element={<AddMyJoke />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/favorites" element={<FavoritesJokes />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
