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
        console.log('create spot: ', fields)
        spotService.createSpot(fields)
            .then(() => {
                console.log('created a spot')
                history.push('.')
            });
        
        setSubmitting(false);
    }

    const updateSpot = (id, fields, setSubmitting) => {
        console.log('updateing spot', id, fields);
        spotService.updateSpot(id, fields);

        setSubmitting(false);
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
                    console.log('setted spot by id: ', spot);
                }
            });
    }

    // const onSubmit = () => {
    //     console.log('SpotForm submit!')
    // }

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
                spot: {}
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


export default SpotForm;
