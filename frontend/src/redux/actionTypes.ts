import { Task } from "@/interfaces/Task";
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';


export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export interface FetchTasksRequestAction {
  type: typeof FETCH_TASKS_REQUEST;
}

export interface FetchTasksSuccessAction {
  type: typeof FETCH_TASKS_SUCCESS;
  payload: {
    tasks: Task[];
    totalTasks: number;
  };
}

export interface FetchTasksFailureAction {
  type: typeof FETCH_TASKS_FAILURE;
  payload: string;
}




interface AddTaskRequestAction {
  type: typeof ADD_TASK_REQUEST;
}

interface AddTaskSuccessAction {
  type: typeof ADD_TASK_SUCCESS;
  payload: Task;
}

interface AddTaskFailureAction {
  type: typeof ADD_TASK_FAILURE;
  payload: string;
}


type UpdateTaskRequest = {
  type: typeof UPDATE_TASK_REQUEST;
};

type UpdateTaskSuccess = {
  type: typeof UPDATE_TASK_SUCCESS;
  payload: Task;
};

type UpdateTaskFailure = {
  type: typeof UPDATE_TASK_FAILURE;
  payload: string;
};

type DeleteTaskRequest = {
  type: typeof DELETE_TASK_REQUEST;
};

type DeleteTaskSuccess = {
  type: typeof DELETE_TASK_SUCCESS;
  payload: number; // Assuming payload is the ID of the deleted task
};

type DeleteTaskFailure = {
  type: typeof DELETE_TASK_FAILURE;
  payload: string;
};



export type TaskActionTypes =
  | FetchTasksRequestAction
  | FetchTasksSuccessAction
  | FetchTasksFailureAction
  | AddTaskRequestAction | AddTaskSuccessAction | AddTaskFailureAction
  | UpdateTaskRequest
  | UpdateTaskSuccess
  | UpdateTaskFailure
  | DeleteTaskRequest
  | DeleteTaskSuccess
  | DeleteTaskFailure;