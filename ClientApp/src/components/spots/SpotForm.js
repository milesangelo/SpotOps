import React, { useState, useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import authService from '../api-authorization/AuthorizeService'
import ReactJson from 'react-json-view'
import spotService from './SpotService';
import { Link } from 'react-router-dom'

const SpotForm = ({ history, match }) => {
    const [user, setUser] = useState('')
    const [spot, setSpot] = useState('')

    const { id } = match.params;
    const isAddMode = !id;

    const createSpot = (fields, setSubmitting) => {
        spotService.createSpot(fields)
            .then(() => {
                setSubmitting(false);
                history.push('.')
            });
    }

    const updateSpot = (id, fields, setSubmitting) => {
        spotService.updateSpot(id, fields)
            .then(() => {
                setSubmitting(false);
                history.push('..');
            });
    }

    const onSubmit = (fields, { setStatus, setSubmitting }) => {
        setStatus();
        if (isAddMode) {
            createSpot(fields, setSubmitting);
        } else {
            updateSpot(id, fields, setSubmitting);
        }
    }

    const getUser = async() => {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        if (isAuthenticated) {
            setUser(user);
        }
    }

    const getSpotById = async(id) => {
        await spotService.getSpotById(id)
            .then(spot => {
                if (spot) {
                    setSpot(spot);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        if (!isAddMode) {
            getSpotById(id);
        }
        if (!user){
            getUser();
        }
    }, []);

    return ( 
        <Formik 
            enableReinitialize={true}
            initialValues={{ 
                name: (spot && spot.name) || '',
                spot: {
                    name: spot.name
                }
            }}
            onSubmit={onSubmit}
        >
        {({ values, isSubmitting, errors, touched }) => {
            return (
                <Form>
                <div>
                    <h1>{isAddMode ? 'Add Spot' : 'Edit Spot'}</h1>
                    <div className="form-group col-5">
                        <label>Name</label>
                        <Field
                            name="name"
                            type="text"
                            className={'form-control'} />
                    </div>

                    <div className="form-row">
                        <div className="form-group col-5">
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


export default SpotForm;
