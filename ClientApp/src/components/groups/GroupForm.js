import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import groupService from './GroupService';
import authService from '../api-authorization/AuthorizeService'

// const MyTextInput = ({ label, ...props }) => {
//     // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//     // which we can spread on <input> and alse replace ErrorMessage entirely.
//     const [field, meta] = useField(props);
//     return (
//         <>
//         <label htmlFor={props.id || props.name}>{label}</label>
//         <input className="text-input" {...field} {...props} />
//         {meta.touched && meta.error ? (
//             <div className="error">{meta.error}</div>
//         ) : null}
//         </>
//     );
// }

function GroupForm({ history, match }) {
    const [user, setUser] = useState('')
    const [group, setGroup] = useState('')

    const { id } = match.params;
    const isAddMode = !id;

    const createGroup = (fields, setSubmitting) => {
        console.log('createGroup: ', fields)
        groupService.createGroup(fields)
        history.push('.')
        setSubmitting(false)
    }

    const updateGroup = (id, fields, setSubmitting) => {
        groupService.updateGroup(id, fields)
        history.push('..')
        setSubmitting(false)
    }

    const onSubmit = (fields, {setStatus, setSubmitting}) => {
        setStatus();
        if (isAddMode) {
            createGroup(fields, setSubmitting);
        } else {
            updateGroup(id, fields, setSubmitting);
        }
    }

    const getUser = async() => {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        if (isAuthenticated) {
            setUser(user);
        }
    }

    const getGroupById = async(id) => {
        const grp = await groupService.getGroupById(id);
        if (grp)
        {
            setGroup(grp);
        }
    }

    useEffect(() => {
        if (!isAddMode) {
            getGroupById(id);
            
            // groupService.getById(id).then(grp => {
            //     const fields = ['groupName', 'dateCreated', 'owner'];
            //     fields.forEach(field => {
            //         //setFieldValue
            //     })
            // });
        }
        if (!user){
            getUser();
        }
    }, []);


    return ( 
        <Formik 
            enableReinitialize={true}
            initialValues={{ 
                owner : user.name || '',
                groupName : (group && group.name) || ''
            }}
            onSubmit={onSubmit}
        >
        {({ values, isSubmitting, errors, touched }) => {
            return (
                <Form>
                <div>
                    <h1>{isAddMode ? 'Add Group' : 'Edit Group'}</h1>
                    <div className="form-row">
                        <div className="form-group col-5">
                            <label>Group Name</label>
                            <Field 
                                name="groupName" 
                                type="text" 
                                className={'form-control'} />
                        </div>
                    </div>
                
                    <div className="form-row">
                        <div className="form-group col-5">
                            <label>Owner</label>
                            <Field 
                                className={'form-control-plaintext'} 
                                text='text'
                                name='owner' 
                                placeholder='the owner of group...'
                                value={values.owner} 
                                readOnly 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-5">
                            <label>Date Created</label>
                            <Field 
                                className={'form-control-plaintext'} 
                                text='date'
                                name='dateCreated' 
                                placeholder='when was this made?'
                                value={values.dateCreated} 
                                readOnly 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Save
                            </button>
                            
                            <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                        </div>
                    </div>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
                </Form>
            )}}
            </Formik>
    )
}


export default GroupForm;
