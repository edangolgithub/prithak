import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/action';

const AddTaskForm = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(50, 'Title must be 50 characters or less')
                .required('Title is required'),
            description: Yup.string()
                .max(200, 'Description must be 200 characters or less')
                .required('Description is required')
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(createTask(values));
            resetForm();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...formik.getFieldProps('title')}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="text-danger">{formik.errors.title}</div>
                ) : null}
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    {...formik.getFieldProps('description')}
                ></textarea>
                {formik.touched.description && formik.errors.description ? (
                    <div className="text-danger">{formik.errors.description}</div>
                ) : null}
            </div>
            <button type="submit" className="btn btn-primary mt-2">Add Task</button>
        </form>
    );
};

export default AddTaskForm;
