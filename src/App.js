import React, {Component} from 'react';
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

class App extends Component {
  constructor(){
    super();
      global.port = process.env.PORT || 3000;
    }
  render(){
  return (
    <BrowserRouter>
      <div>
        <div className="App">
        <h2 className="m-3 d-inline-block justify-content-center">Yoga & Meditation.........</h2>
        <h5 className="d-inline-block justify-content-center">Namaste Yogis <img src={process.env.PUBLIC_URL + "/images/namaste.png"}/> </h5>
        </div>
        <Navigation />
        <p> </p>
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
}

export default App;
