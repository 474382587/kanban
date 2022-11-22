import TaskItem from './TaskItem';
import './index.scss';
import Task from './Task';
// import { useEffect } from 'react';
// import axios from 'axios';
import styles from './css.module.css';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setActiveColIndex, toggleAddTaskModal } from '../reducers';

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

// const {data} = props
const Column = ({ data, index }) => {
  const dispatch = useDispatch();

  const addNewTask = () => {
    dispatch(toggleAddTaskModal());
    dispatch(setActiveColIndex(index));
  };

  return (
    <>
      {data &&
        data.map((task) => (
          <TaskItem key={task.id} task={task} colIndex={index} />
        ))}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Button onClick={() => addNewTask()}>Add Task</Button>
      </div>
    </>
  );
};

export default Column;
