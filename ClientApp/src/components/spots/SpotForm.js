import React, { useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import * as Yup from 'yup';

import authService from '../api-authorization/AuthorizeService';
import spotService from './SpotService';

import ReactJson from 'react-json-view';
import imageService from '../images/imageService';

const SpotSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    photo: Yup.mixed()
        .required("Take a picture of the spot!") 
        .test("fileSize", "File is too large", (value) => {
            return value && value.size <= 10000000
        })
    //email: Yup.string().email('Invalid email').required('Required'),
  });



const SpotForm = ({ history, match }) => {
    const [user, setUser] = useState('')
    const [spot, setSpot] = useState('')

    const { id } = match.params;
    const isAddMode = !id;

    const createSpot = (fields, setSubmitting) => {
        spotService.createSpot(fields)
            .then((newSpot) => {
                console.log('newSpot response: ', newSpot)
                setSpot(newSpot)
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

    // const onSubmit = (fields, { setStatus, setSubmitting }) => {
    //     setStatus();
    //     if (isAddMode) {
    //         createSpot(fields, setSubmitting);
    //     } else {
    //         updateSpot(id, fields, setSubmitting);
    //     }
    // }

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

    const onSubmit = async (values) => {
        const formData = new FormData();
        //spotService.createSpot(values);
        //var spotId = 1;
        //imageService.uploadImage(spotId, values.photo)
    }

    return ( 
        <Formik 
            enableReinitialize={true}
            initialValues={{ 
                name: (spot && spot.name) || '',
                spot: {
                    name: spot.name
                },
                photo: ''
            }}
            validationSchema={SpotSchema}
            onSubmit={(async (values) => {
                onSubmit(values);
            })}
        >
        {({ values, isSubmitting, errors, handleChange, setFieldValue }) => {
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
                        <ErrorMessage name="name"/>
                    </div>


                    <div className="form-group col-5">
                        <label>Name</label>
                        <Input
                            name="photo"
                            type="file"
                            className={'form-control'} 
                            onChange={async (e) => {
                                handleChange('photo');
                                setFieldValue('photo', e.target.files[0]);
                            }} />
                        <ErrorMessage name="photo" />
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
                    {errors && <ReactJson name="errors" src={errors} theme="monokai" />}
                    {values && <ReactJson name="values" src={values} theme="monokai" />}
                    {user && <ReactJson name="user" src={user} theme="monokai" />}
                </div>
                </Form>
            )}}
            
            </Formik>
    )
}


export default SpotForm;
