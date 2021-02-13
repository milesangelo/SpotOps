import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import groupService from './GroupService';
import authService from '../api-authorization/AuthorizeService'
import ReactJson from 'react-json-view';

const GroupForm = ({ history, match }) => {
    const [user, setUser] = useState('')
    const [group, setGroup] = useState('')

    const { id } = match.params;
    const isAddMode = !id;

    const createGroup = (fields, setSubmitting) => {
        groupService.createGroup(fields)
            .then(() => {
                setSubmitting(false)
                history.push('.')
            })
    }

    const updateGroup = (id, fields, setSubmitting) => {
        groupService.updateGroup(id, fields)
            .then(() => {
                setSubmitting(false);
                history.push('..');
            });
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
        await groupService.getGroupById(id)
            .then(grp => {
                setGroup(grp);
            })
    }

    useEffect(() => {
        if (!isAddMode) {
            getGroupById(id);
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
                name : (group && group.name) || '',
                group : {
                    dateCreated: group.dateCreated,
                    name : group.name
                }
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
                            <label>Name</label>
                            <Field 
                                name="name" 
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
                                placeholder={values.group.dateCreated}
                                value={new Date(values.group.dateCreated).toUTCString()} 
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
                    {values && <ReactJson src={values} theme="monokai" />}
                    {user && <ReactJson src={user} theme="monokai" />}
                </div>
                </Form>
            )}}
            </Formik>
    )
}


export default GroupForm;
