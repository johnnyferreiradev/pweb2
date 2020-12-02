import React from 'react';

import Weak from './components/Weak';
import Caps from './components/Caps';
import { TextBlue, TextRed } from './components/Colors';

import './App.css';

function App() {
  return (
    <div className="App">
      <Weak>Texto fraco</Weak>
      <Caps>Texto em caixa alta</Caps>
      <TextBlue>Text em azul</TextBlue>
      <TextRed>Text em vermelho</TextRed>
    </div>
  );
}

export default App;
