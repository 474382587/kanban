import { Avatar, Button, Card, DatePicker, Space, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './TaskItem.module.scss';

import cs from './css2.module.css';
import { useDispatch } from 'react-redux';
import { removeTask } from '../reducers';

const TaskItem = ({ task, colIndex }) => {
  const dispatch = useDispatch();
  const onRemove = () => {
    dispatch(
      removeTask({
        colIndex,
        taskId: task.id,
      })
    );
  };

  return (
    <Card
      className={styles.card}
      title={
        <div>
          <CheckCircleOutlined className={styles.checkmark} />
          <span>{task.name}</span>
        </div>
      }
      bordered
      extra={
        <div onClick={() => onRemove()}>
          <CloseCircleOutlined />
        </div>
      }
      style={{
        width: 300,
        marginBottom: 20,
      }}
    >
      <div className={cs.container}>container2</div>
      <div style={{ marginBottom: 20 }}>
        <Tag color="warning">{task.priority}</Tag>
      </div>
      <Space direction="horizontal">
        <Avatar>JJ</Avatar>
        {task.dueDate}
        {/* <DatePicker
          style={{ border: 'none' }}
          suffixIcon={null}
          defaultValue={moment()}
        /> */}
      </Space>
    </Card>
  );
};

export default TaskItem;
