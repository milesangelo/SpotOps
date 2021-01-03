import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';

class GroupForm extends Component {

    constructor(props) {

        super(props);
        console.log("props ", props)

        const { id } = props.match.params
        console.log("id ", id)

        this.state = {
            isAdding: !id,
        }
    }

    render() {

        const { path } = this.props.match

        return (
            
            <Formik 
                initialValues={{ groupName : ""}}
                onSubmit={console.log("submitting!")}
                >
            <Form>
            <div>
                <p> TESTTTTING GROUPS FORM</p>
                <h1>{this.state.isAdding ? 'Add Group' : 'Edit Group'}</h1>
                <div className="form-row">
                    <div className="form-group col-5">
                        <label>Group Name</label>
                        <Field name="groupName" type="text" className={'form-control'} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-5">
                        <label>Group Name</label>
                        <Field name="groupName" type="text" className={'form-control'} />
                    </div>
                </div>
            </div>
            </Form>
            </Formik>
           
        )
    }
}

export default GroupForm;
