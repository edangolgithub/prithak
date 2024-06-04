// src/redux/actions.ts
import { ThunkAction } from 'redux-thunk';
import { FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE, TaskActionTypes, ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE } from './actionTypes';
import { AppDispatch, RootState } from './store';
import { Task } from '../interfaces/Task';
import { Action } from 'redux';
import { logout } from './auth/authActions';
import { toast } from 'react-toastify';

export const fetchTasksRequest = (): TaskActionTypes => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks: Task[], totalTasks: number): TaskActionTypes => ({
  type: FETCH_TASKS_SUCCESS,
  payload: { tasks, totalTasks },
});

export const fetchTasksFailure = (error: string): TaskActionTypes => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

export const fetchTasks = (page: number, tasksPerPage: number): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetchTasksRequest());
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/tasks?page=${page}&limit=${tasksPerPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        dispatch(logout());
        toast.error("Please login agian")
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      console.log(data);

      dispatch(fetchTasksSuccess(data.tasks, data.totalTasks));
    } catch (error: any) {
      dispatch(fetchTasksFailure(error.message));
    }
  };
};
export const searchTasks = (
  searchTerm: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetchTasksRequest());
    try {
      console.log(searchTerm);
      const token = getState().auth.token || localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/tasks/search?searchTerm=${searchTerm}`
        , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();

      console.log("le", data);

      dispatch(fetchTasksSuccess(data.tasks, data.totalTasks));
    } catch (error: any) {
      dispatch(fetchTasksFailure(error.message));
    }
  };
};
export const addTaskRequest = (): TaskActionTypes => ({
  type: ADD_TASK_REQUEST,
});

export const addTaskSuccess = (task: Task): TaskActionTypes => ({
  type: ADD_TASK_SUCCESS,
  payload: task,
});

export const addTaskFailure = (error: string): TaskActionTypes => ({
  type: ADD_TASK_FAILURE,
  payload: error,
});
export const createTask = (task: { title: string, description: string }): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(addTaskRequest());
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      const data = await response.json();
      dispatch(addTaskSuccess(data));
    } catch (error: any) {
      dispatch(addTaskFailure(error.message));
    }
  };
};

export const updateTaskRequest = (): TaskActionTypes => ({
  type: UPDATE_TASK_REQUEST,
});

export const updateTaskSuccess = (task: Task): TaskActionTypes => ({
  type: UPDATE_TASK_SUCCESS,
  payload: task,
});

export const updateTaskFailure = (error: string): TaskActionTypes => ({
  type: UPDATE_TASK_FAILURE,
  payload: error,
});

export const deleteTaskRequest = (): TaskActionTypes => ({
  type: DELETE_TASK_REQUEST,
});

export const deleteTaskSuccess = (taskId: number): TaskActionTypes => ({
  type: DELETE_TASK_SUCCESS,
  payload: taskId,
});

export const deleteTaskFailure = (error: string): TaskActionTypes => ({
  type: DELETE_TASK_FAILURE,
  payload: error,
});

export const updateTask = (task: Task): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(updateTaskRequest());
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      const data = await response.json();
      dispatch(updateTaskSuccess(data));
    } catch (error: any) {
      dispatch(updateTaskFailure(error.message));
    }
  };
};


export const deleteTask = (taskId: number): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(deleteTaskRequest());
    try {
      console.log('local storage', localStorage.getItem('token'));

      const token = getState().auth.token || localStorage.getItem('token');
      console.log("ju");
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message) {
          toast.error(errorData.message)
          console.log(errorData.message);
          dispatch(deleteTaskFailure(errorData.message));
          throw new Error(errorData.message || 'Failed to delete task');
        }
      }
      dispatch(deleteTaskSuccess(taskId));
    } catch (error: any) {
      dispatch(deleteTaskFailure(error.message));
    }
  };
};