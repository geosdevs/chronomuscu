import './App.css';
import ExerciseBoard from './components/ExerciseBoard/ExerciseBoard';
import RestBoard from './components/RestBoard/RestBoard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Chronomuscu
      </header>
      <section>
        <ExerciseBoard></ExerciseBoard>
      </section>
      <aside>
        <RestBoard></RestBoard>
      </aside>
    </div>
  );
}

export default App;
