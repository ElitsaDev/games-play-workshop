import { Suspense} from 'react';
import { Route, Routes} from 'react-router-dom';

//import  uniqid from 'uniqid'; може да кажем npm remove uniqid

import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Logout } from './components/Logout/Logout';


import { CreateGame } from './components/CreateGame/CreateGame';
import { EditGame } from './components/EditGame/EditGame';
import { Catalog } from './components/Catalog/Catalog';
import { Details } from './components/Details/Details';
import './App.css';

import Register from './components/Register/Register';


//const Register = lazy(() => import('./components/Register/Register')); // връща Promise когато бъде поискано
function App() {
    
    return (
        <AuthProvider>
            <div id="box">
                < Header />
                {/* Main Content */}
                <GameProvider>
                <main id="main-content">
                    <Routes>
                        <Route path="/" element={< Home />}/>
                        <Route path="/login" element={< Login />}/>
                        <Route path="/register" element={<Suspense callback={<span>Loading...</span>}>
                                                            < Register />
                                                        </Suspense>}/>
                        <Route path="/logout" element={< Logout />}/>                                
                        <Route path="/create" element={< CreateGame />}/>
                        <Route path="/games/:gameId/edit" element={< EditGame />}/>
                        <Route path="/catalog" element={< Catalog />}/>
                        <Route path="/catalog/:gameId" element={< Details />}/>
                    </Routes>
                </main>
                </GameProvider>
                
                {/* Login Page ( Only for Guest users ) */}
                
                {/* Register Page ( Only for Guest users ) */}
                
                {/* Create Page ( Only for logged-in users ) */}
                
                {/* Edit Page ( Only for the creator )*/}
                
                {/*Details Page*/}
                
                {/* Catalogue */}
                
            </div>
        </AuthProvider>
    );
}

export default App;
