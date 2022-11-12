import TaskItem from './TaskItem';
import './index.scss'
import { useEffect } from 'react';
import axios from 'axios';

const DUMMY_DATA = [
  {
    id: 1,
    name: 'task1',
    assignee: 'joseph',
    dueDate: '2022-02-02',
    detail: 'lorem ipsum...',
  },
  {
    id: 2,
    name: 'task2',
    assignee: 'elton',
    dueDate: '2022-03-02',
    detail: 'lorem ipsum...',
  },
  {
    id: 3,
    name: 'task1',
    assignee: 'ziming',
    dueDate: '2023-02-02',
    detail: 'lorem ipsum...',
  },
];

const Column = () => {
  useEffect(async () => {
    const res = await axios.get('http://localhost:3001/tasks')
    console.log(res)
    
    // await axios.post('http://localhost:3001/tasks', {
    //   id: 4,
    //   name: 'task4',
    //   assignee: 'ziming',
    //   dueDate: '2023-12-02',
    //   detail: 'lorem ipsum...',
    // })
  }, [])
  
  return DUMMY_DATA.map((task) => <TaskItem /* PASS PROPS HERE */ />);
};

export default Column;
