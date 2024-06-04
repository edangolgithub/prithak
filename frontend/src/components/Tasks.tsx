 import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState, useAppDispatch } from '../redux/store';
// import { fetchTasks } from '../redux/action';
// import { Task } from '@/interfaces/Task';
// import TaskDetail from './TaskDetail';

// const Tasks = () => {
//     const dispatch = useAppDispatch();
//     const tasksState = useSelector((state: RootState) => state.tasks);

//     const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const tasksPerPage = 10;

//     useEffect(() => {
//         dispatch(fetchTasks(currentPage, tasksPerPage));
//     }, [dispatch, currentPage]);

//     const handleTaskClick = (task: Task) => {
//         setSelectedTask(task);
//     };

//     const handleBackClick = () => {
//         setSelectedTask(null);
//     };

//     const totalPages = Math.ceil(tasksState.totalTasks / tasksPerPage);

//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//     return (
//         <div className="container mt-4">
//             <div className="row">
//                 <div className="col-md-3">
//                     <h1 className="text-center mb-4">Task List</h1>
//                 </div>
//             </div>

//             <div className="row">
//                 <div className="col-md-3">
//                     <ul className="list-group">
//                         {tasksState.tasks.map((task:Task) => (
//                             <li
//                                 key={task.id}
//                                 className="list-group-item d-flex justify-content-between align-items-center"
//                                 onClick={() => handleTaskClick(task)}
//                                 style={{ cursor: 'pointer' }}
//                             >
//                                 <span className="text-gray-700">{task.title}</span>
//                             </li>
//                         ))}
//                     </ul>
//                     <nav>
//                         <ul className="pagination justify-content-center">
//                             {[...Array(totalPages)].map((_, index) => (
//                                 <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
//                                     <button onClick={() => paginate(index + 1)} className="page-link">
//                                         {index + 1}
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     </nav>
//                 </div>
//                 <div className="col-md-9">
//                     {selectedTask && <TaskDetail task={selectedTask}  />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tasks;