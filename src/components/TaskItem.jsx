import { Avatar, Button, Card, DatePicker, Space, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './TaskItem.module.scss';

const TaskItem = () => {
  // const clickEventHandler = () => {
  //   console.log('clicked!');
  // };

  return (
    <Card
      title={
        <div>
          <CheckCircleOutlined className={styles.checkmark} />
          <span>Task1</span>
        </div>
      }
      bordered
      extra={<Button type="primary">click me</Button>}
      style={{
        width: 300,
        marginBottom: 20
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <Tag color="warning">Low</Tag>
      </div>
      <Space direction="horizontal">
        <Avatar>JJ</Avatar>
        <DatePicker
          style={{ border: 'none' }}
          suffixIcon={null}
          defaultValue={moment()}
        />
      </Space>
    </Card>
  );
};

export default TaskItem;
