import './App.css';
import ExerciseBoard from './components/ExerciseBoard/ExerciseBoard';
import RestBoard from './components/ExerciseBoard/RestBoard/RestBoard';
import React from 'react';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        Chronomuscu
      </header>
      <ExerciseBoard></ExerciseBoard>
    </div>
  );
}

export default App;
