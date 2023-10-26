import Gallery from './components/gallery/Gallery';
import Header from './components/header/Header';
import './App.css';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <Gallery />
        </main>
      </>
    );
  }
}

export default App;
