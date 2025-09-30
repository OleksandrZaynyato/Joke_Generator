import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import Line from '../../UI/Line/Line';
import Button from '../../UI/Button/Button';
import JokeTemplate from '../../UI/JokeTemplate/JokeTemplate';
import { useAuthStore } from '../../Store/useAuthStore';
import { useTelegram } from './hooks/useTelegram';
import { UserWelcome } from '../../admin/components/UserWelcome';      
import { JokeDisplay } from '../../admin/components/JokeDisplay';        
import { NavigationButtons } from '../../admin/components/NavigationButtons'; 
export default function MainPage() {
    //& constants
    const { setUser, user } = useAuthStore();

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { tg, user } = useTelegram();

    const API_URL = import.meta.env.VITE_API_URL;

    const [randomjoke, setRandomjoke] = useState(null);
    const [favoriteJokes, setFavoriteJokes] = useState(() => {
        const saved = localStorage.getItem('favoriteJokes');
        return saved ? JSON.parse(saved) : [];
    });
    const [likeJoke, setLikeJoke] = React.useState(false);
    const [showLikeButton, setShowLikeButton] = React.useState(false);

    useEffect(() => {
        if (tg && tg.BackButton) {
            const handleBackButton = () => {
                navigate(-1);
            };

            if (location.pathname === '/') {
                tg.BackButton.hide();
            } else {
                tg.BackButton.show();
            }

            tg.BackButton.onClick(handleBackButton);

            return () => {
                tg.BackButton.offClick(handleBackButton);
            };
        }
    }, [tg, navigate, location.pathname]);

    //? functions
    async function getJokeById(jokeId) {
        try {
            const response = await fetch(`${API_URL}/jokes/${jokeId}`);
            if (!response.ok) throw new Error('Joke not found');
            const data = await response.json();
            setRandomjoke(data);
            setLikeJoke(favoriteJokes?.some((j) => j?._id === data?._id) || false);
        } catch (error) {
            console.error('Error fetching joke:', error);
            getRandomJoke();
        }
    }

    async function getRandomJoke() {
        try {
            const response = await fetch(`${API_URL}/jokes/random`);
            if (!response.ok) throw new Error('Failed to fetch random joke');
            const data = await response.json();

            if (!data || !data._id) {
                throw new Error('Invalid joke data received');
            }

            setRandomjoke(data);
            const isFavorite = favoriteJokes?.some((j) => j?._id === data?._id) || false;
            setLikeJoke(isFavorite);
            navigate(`/${data._id}`);
        } catch (error) {
            console.error('Error fetching random joke:', error);
        }
    }

    function toggleFavorite() {
        if (!randomjoke || !randomjoke._id) return;

        setFavoriteJokes((prev) => {
            const exists = prev?.find((j) => j?._id === randomjoke._id);
            const updated = exists 
                ? prev?.filter((j) => j?._id !== randomjoke._id) 
                : [...(prev || []), randomjoke];
            return updated || [];
        });
        setLikeJoke((prev) => !prev);
    }

    async function logout() {
        try {
            const response = await fetch(`${API_URL}/user/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Не вдалося вийти. Спробуйте ще раз.');
        }
    }

    function handleLogout() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to logout!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
            theme: 'dark',
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire({
                    title: 'Logout successful!',
                    text: 'You have been logged out.',
                    icon: 'success',
                    theme: 'dark',
                });
            }
        });
    }

       const openAdminPanel = () => {
        navigate('/admin');
    };

    async function sendRaiting(jokeId, userId, action) {
        try {
            const response = await fetch(`${API_URL}/jokes/${jokeId}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, action: action.action }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Raiting response:', data);
        } catch (error) {
            console.error(error);
        }
    }

    //

    //^ side effects
    React.useEffect(() => {
        localStorage.setItem('favoriteJokes', JSON.stringify(favoriteJokes));
    }, [favoriteJokes]);

    useEffect(() => {
        if (id) {
            getJokeById(id);
            setShowLikeButton(true);
        } else {
            getRandomJoke();
        }
    }, [id]);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            fetch(`${API_URL}/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
                cache: 'no-store',
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser(data.safeUser);
                })
                .catch(console.error);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-between gap-[50px] min-h-screen bg-[#2B2B2B]">
            <div className="flex gap-[30px] items-center sm:flex-row flex-col absolute top-6 right-[10%]">
                {user ? (
                    <>
                        <Button bg="bg-[#F8D57E]" onClick={handleLogout}>
                            Logout
                        </Button>
                        <h2 className="text-[28px] font-bold text-white">{user.username}</h2>
                    </>
                ) : (
                    <>
                        <Button bg="bg-[#F8D57E]" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                        <Button bg="bg-[#BFAFF2]" onClick={() => navigate('/register')}>
                            Register
                        </Button>
                    </>
                )}
            </div>
            <Line />
            
            <UserWelcome user={user} />
            
            <h1 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold text-white text-center">
                Jokes Generator
            </h1>

            <JokeTemplate
                randomjoke={randomjoke}
                likeJoke={likeJoke}
                toggleFavorite={toggleFavorite}
                showLikeButton={showLikeButton}
                sendRaiting={sendRaiting}
            />

            <Button
                bg="bg-[#F8D57E] hover:bg-[#E8C56E]"
                onClick={() => {
                    getRandomJoke();
                    setShowLikeButton(true);
                }}
            >
                Generate New Joke
            </Button>

            <div className="flex gap-[30px] sm:flex-row flex-col">
                <Link to="/add-joke">
                    <Button bg="bg-[#BFAFF2]">Add my Joke</Button>
                </Link>
                <Link to={'/favorites'}>
                    <Button bg="bg-[#A8F38D]">Favorites</Button>
                </Link>
                <Link to={'/top'}>
                    <Button bg="bg-[#AFD8F2]">Best Jokes</Button>
                </Link>
            </div>
            <NavigationButtons
                user={user}
                favoriteJokes={favoriteJokes}
                onAdminClick={openAdminPanel}
            />
            
            <Line />
        </div>
    );
}