import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Column from '../components/Column';
import { fetchTasks, toggleAddTaskModal } from '../reducers';
import { Row, Col, Button, Input } from 'antd';
import AddTaskModal from '../components/AddTaskModal';

const Kanban = () => {
  const kanbanState = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <Row style={{ padding: 40 }}>
        {kanbanState.columns.map((col, index) => {
          return (
            <Col key={col.name} span={6}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 10,
                  textAlign: 'center',
                }}
              >
                {col.name}
              </div>
              <Column index={index} data={col.tasks} />
            </Col>
          );
        })}
        <Col>
          <div style={{ textAlign: 'center' }}>
            <Input placeholder="column name" style={{ marginBottom: 10 }} />
            <Button>Add Col</Button>
          </div>
        </Col>
      </Row>
      <AddTaskModal
        isModalOpen={kanbanState.isAddTaskModalOpen}
        setIsModalOpen={() => {
          dispatch(toggleAddTaskModal());
        }}
      />
    </>
  );
};

export default Kanban;
