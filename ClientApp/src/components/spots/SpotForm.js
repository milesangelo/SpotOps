import React, { useState, useEffect} from 'react';
import { Formik, Form } from 'formik';
import authService from '../api-authorization/AuthorizeService'

function SpotForm({ history, match }) {
    const [user, setUser] = useState('')

    const getUser = async() => {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        if (isAuthenticated) {
            setUser(user);
        }
    }

    const onSubmit = () => {
        console.log('SpotForm submit!')
    }

    useEffect(() => {
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
                    <h1>Your Spots</h1>
                </div>
                </Form>
            )}}
            </Formik>
    )
}


export default SpotForm;
