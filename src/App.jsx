import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Layouts/MainPage/MainPage';
import AdminApp from './admin/AdminApp';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/admin/*" element={<AdminApp />} />
            </Routes>
        </Router>
    );
}

export default App;