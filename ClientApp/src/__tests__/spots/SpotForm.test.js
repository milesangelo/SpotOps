import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import SpotForm from "../../components/spots/SpotForm";
import { shallow } from 'enzyme';
import { Router } from 'react-router';

describe('SpotForm', () => {
    
    const router = {
        history: new BrowserRouter().history,
        route: {
          location: {},
          match: {},
        },
      };


    const testValues = {
        match :  {
            params: { id : 1 }, 
            isExact: true, 
            path: "", 
            url: "",
            id: 0,
            location: ""
        },
        name: 'Denver Skatepark',
        id: '1',
        handleSubmit: jest.fn(),
        path: 'spots/add'
    };

    it('submits form data with spot name', () => {
        const component = shallow(
            <Router {...router}>
                <SpotForm {...testValues} />
            </Router>
        );

        console.log(component.debug())
        component.find('#submitButton');//.simulate('click');
        expect(testValues.handleSubmit).toHaveBeenCalledTimes(1);
        expect(testValues.handleSubmit).toBeCalledWith({ name: testValues.name, id: testValues.id });
    })
})
