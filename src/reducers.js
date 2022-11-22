import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  columns: [{
    name: 'todo',
    tasks: []
  }, {
    name: 'in_progress',
    tasks: []
  }, {
    name: 'done',
    tasks: [{
      id: 1231,
      name: 'task1',
      assignee: 'joseph',
      dueDate: '2022-02-02',
      detail: 'lorem ipsum...',
    },
    {
      id: 211,
      name: 'task2',
      assignee: 'elton',
      dueDate: '2022-03-02',
      detail: 'lorem ipsum...',
    },
    {
      id: 31234,
      name: 'task1',
      assignee: 'ziming',
      dueDate: '2023-02-02',
      detail: 'lorem ipsum...',
    },]
  }],
  isAddTaskModalOpen: false,
  activeColIndex: 0
}

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    updateFirstCol: (state, action) => {
      console.log(state, action)
      state.columns[0].tasks = action.payload
    },

    setActiveColIndex: (state, action) => {
      const { payload } = action

      state.activeColIndex = payload
    },
    toggleAddTaskModal: (state) => {
      state.isAddTaskModalOpen = !state.isAddTaskModalOpen
    },
    addTask: (state, action) => {
      const { payload } = action
      console.log(payload)

      state.columns[state.activeColIndex].tasks.push(payload)
      state.isAddTaskModalOpen = false
    },
    removeTask: (state, action) => {
      console.log(action)
      const { payload: {
        colIndex,
        taskId
      } } = action
      state.columns[colIndex].tasks = state.columns[colIndex].tasks.filter(task => task.id !== taskId)
    }
  }
})

console.log(kanbanSlice.actions)

export const { addTask, toggleAddTaskModal, setActiveColIndex, removeTask, updateFirstCol } = kanbanSlice.actions
export const fetchTasks = () => async dispatch => {
  console.log('asdadasdas')
  const { data } = await axios.get('https://my-json-server.typicode.com/474382587/kanban/tasks')
  dispatch(updateFirstCol(data))
}

export default kanbanSlice.reducer