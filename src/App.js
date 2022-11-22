
import { useSelector } from 'react-redux'
import Kanban from './pages/Kanban';



function App() {

  const columns = useSelector(state => state.kanban)


  console.log({ columns })

  return (
    // <div className="App" style={{ padding: 20 }}>
    //   <Column data={state} />
    //   <button
    //     onClick={() => {
    //       dispatch(addTask())
    //     }}

    //   >add</button>
    // </div>
    <Kanban />
  );
}

export default App;
