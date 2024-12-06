
import './App.css'
import NotesGet from './Components/NotesGet/NotesGet'
import Notespost from './Components/NotesPost/Notespots'

function App() {



  return (
    <div className="notes-app m-10 ">
      
      <Notespost/>
      <NotesGet/>
      
    </div>
  )
}

export default App
