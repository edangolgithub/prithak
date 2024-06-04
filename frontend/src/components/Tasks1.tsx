import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchTasks, searchTasks } from '../redux/action';
import { Task } from '@/interfaces/Task';
import TaskDetail from './TaskDetail';
import './style.css';
import AddTaskForm from './TaskAdd';
import { Button, Modal } from 'react-bootstrap';

const Tasks1 = () => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const tasksPerPage = 5;
    const [canSearch, setCanSearch] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();
    const tasksState = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks(currentPage, tasksPerPage));
        setCanSearch(searchTerm.trim().length > 0);

    }, [dispatch, currentPage, searchTerm]);

    useEffect(() => {
        if (tasksState.tasks.length > 0 && !selectedTask) {
            setSelectedTask(tasksState.tasks[0]);
        }
    }, [tasksState.tasks, selectedTask]);

    const totalPages = Math.ceil(tasksState.totalTasks / tasksPerPage) || 1;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const filteredTasks = tasksState.tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const reset = () => {
        setSearchTerm('');
    };
    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
    };
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    return (
        <div className={`container mt-4`}>
            <div className="row align-items-center">
                <div className="col-md-2">
                    <h3 className={`text-center ${isEditing ? 'dc' : ''}`}>Task List</h3>
                   
                </div>
                <div className="col-md-2">
                        <Button  className='float-end' variant="primary" onClick={handleShowModal} disabled={isEditing}>
                            Add Task
                        </Button>
                    </div>

                <div className={`col-md-4 m-4 mb-1 searchbox ${isEditing ? 'dc' : ''}`}>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search Tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        disabled={isEditing}
                    />
                </div>
                <div className="col-md-3">
                    <button
                        className="btn btn-primary search-btn"
                        disabled={!canSearch || isEditing}
                        onClick={() => dispatch(searchTasks(searchTerm))}
                    >
                        Search
                    </button>
                    <button
                        className="btn btn-success search-btn mx-2"
                        onClick={reset}
                        disabled={isEditing}
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className={`row`}>
                <div className={`col-md-4 ${isEditing ? 'dc' : ''}`}>
                    {filteredTasks.length > 0 ? (
                        <div>
                            <ul className="list-group">
                                {filteredTasks.map((task: Task) => (
                                    <li
                                        key={task.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                        onClick={() => handleTaskClick(task)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span className="text-gray-700">{task.title}</span>
                                    </li>
                                ))}
                            </ul>
                            <nav className='m-1'>
                                <ul className="pagination justify-content-center custom-pagination">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button onClick={() => paginate(index + 1)} className="page-link" disabled={isEditing}>
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    ) : (
                        <div className="text-center">No data available</div>
                    )}
                </div>

                <div className="col-md-8">
                    {selectedTask && <TaskDetail task={selectedTask} setIsEditing={setIsEditing} />}
                </div>
            </div>


            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddTaskForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Tasks1;
