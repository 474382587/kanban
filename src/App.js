import Column from './components/Column';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from './reducers';
import Kanban from './pages/Kanban';



function App() {
  const [state, setState] = useState([])

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/474382587/kanban/tasks').then(res => {
      console.log({ res })

      // 拿到data 更新state
      setState(res.data)
    })
  }, [])

  const columns = useSelector(state => state.kanban)
  const dispatch = useDispatch()


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
