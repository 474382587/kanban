import { Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addTask } from '../reducers';

const Item = Form.Item;
const { Option } = Select;

const AddTaskModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = useForm();
  const dispatch = useDispatch();

  const onSubmit = () => {
    console.log(form.getFieldsValue());

    // get the new Task values
    const newTask = {
      ...form.getFieldsValue(),
      id: uuidv4(),
    };

    // adding task
    dispatch(addTask(newTask));

    //  clear the form
    form.resetFields();
  };

  return (
    <Modal
      title="add a new task"
      open={isModalOpen}
      onOk={() => {
        onSubmit();
      }}
      onCancel={() => setIsModalOpen()}
    >
      <Form form={form}>
        <Item label="Name" name="name">
          <Input />
        </Item>
        <Item label="Assignee" name="assignee">
          <Input />
        </Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>
        <Item label="Due date" name="dueDate">
          <Input />
        </Item>
        <Item label="Detail" name="detail">
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;

// "assignee": "ziming",
// "dueDate": "2023-02-02",
// "detail": "lorem ipsum..."
