import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home  from './components/Home';
import Instructors from './components/Instructors';
import Yogas from './components/Yogas';
import Classes from './components/Classes';
import Packages from './components/Packages';
import Contact from './components/Contact';
import SignIn from './components/SignIn';
import Navigation from './components/Navigation';
import Admin from './components/Admin';

import { BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
        <h1 className="m-3 d-flex justify-content-center">Yoga & Meditation</h1>
        </div>
        <Navigation />

        <Switch>
        <Route path="/" component={ Home } exact/>
        <Route path="/yogas" component={ Yogas } />
        <Route path="/instructors" component={ Instructors } />
        <Route path="/classes" component={ Classes } />
        <Route path="/packages" component={ Packages } />
        <Route path="/contact" component={ Contact } />
        <Route path="/signin" component={ SignIn } />
        <Route path="/admin" component={ Admin } />
        </Switch>
      </div>
    </BrowserRouter>
  );

}

export default App;
