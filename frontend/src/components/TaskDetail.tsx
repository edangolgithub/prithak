import React, { useState, useEffect } from 'react';
import { Task } from '../interfaces/Task';
import { deleteTask, updateTask } from '../redux/action';
import { useDispatch } from 'react-redux';

const TaskDetail = ({ task, setIsEditing }: { task: Task, setIsEditing: (isEditing: boolean) => void }) => {
  const [isEditingLocal, setIsEditingLocal] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const dispatch = useDispatch();
  useEffect(() => {
    setEditedTask({ ...task });
  }, [task]);

  const handleEdit = () => {
    setIsEditingLocal(true);
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateTask(editedTask));
    setIsEditingLocal(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditingLocal(false);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');
    if (isConfirmed) {
      dispatch(deleteTask(task.id));
      //window.location.reload();
    }

  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditedTask(prevTask => ({ ...prevTask, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          {isEditingLocal ? (
            <div className="shadow-box" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)', padding: '20px' }}>
              <input
                type="text"
                className="form-control mb-2"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control mb-2"
                name="description"
                value={editedTask.description}
                onChange={handleChange}
              />
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isCompleted"
                  checked={editedTask.isCompleted}
                  onChange={handleChange}
                  id="isCompleted"
                />
                <label className="form-check-label" htmlFor="isCompleted">
                  Completed
                </label>
              </div>
              <button className="btn btn-success m-2" onClick={handleSave}>Save</button>
              <button className="btn btn-danger m-2" onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              <p><strong>Title:</strong> {task.title}</p>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Completed? :</strong> {task.isCompleted ? 'Completed' : 'Not Completed'}</p>
              <button className="btn btn-primary m-2" onClick={handleEdit}>Edit</button>
              <button className="btn btn-danger m-2" onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
