import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { CreateGame } from './components/CreateGame/CreateGame';
import { EditGame } from './components/EditGame/EditGame';

import './App.css';
import { Catalog } from './components/Catalog/Catalog';
import { Details } from './components/Details/Details';

function App() {
    return (
        <div id="box">
            < Header />
            {/* Main Content */}
            <main id="main-content">
                <Routes>
                    <Route path="/" element={< Home />}/>
                    <Route path="/login" element={< Login />}/>
                    <Route path="/register" element={< Register />}/>
                    <Route path="/create" element={< CreateGame />}/>
                    <Route path="/create" element={< EditGame />}/>
                    <Route path="/details" element={< Details />}/>
                    <Route path="/catalog" element={< Catalog />}/>
                </Routes>
            </main>
            
            
            {/* Login Page ( Only for Guest users ) */}
            
            {/* Register Page ( Only for Guest users ) */}
            
            {/* Create Page ( Only for logged-in users ) */}
            
            {/* Edit Page ( Only for the creator )*/}
            
            {/*Details Page*/}
            
            {/* Catalogue */}
            
        </div>
    );

}

export default App;
