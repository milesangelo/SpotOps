import React from 'react'
import { SpotForm } from "../../SpotForm";
import { render, fireEvent, waitFor, screen, getByText, queryByDisplayValue } from '@testing-library/react';
import { createContainer } from '../../../helpers/DomManipulators';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import mockAxios from '../../../../__mocks__/axios';

jest.mock('axios');

const spy = () => {
    let receivedArgs;
    let returnValue;
    return {
        fn: (...args) => {
            receivedArgs = args;
            return returnValue;
        },
        stubReturnValue: value => returnValue = value,
        receivedArgs: () => receivedArgs,
        receivedArg: n => receivedArgs[n],
    };
}

const fetchResponseOk = body => {
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(body)
    });
}

expect.extend({
    toHaveBeenCalled(received) {
        if (received.receivedArgs() === undefined) {
            return {
                pass: false,
                message: () =>'Spy was not called.'
            };
        }

        return { pass: true, message: () => 'Spy was called.' };
    }
})

describe('SpotForm', () => {
    let renderform, container;
    let fetchSpy;

    const originalFetch = window.fetch;

    const form = id => container.querySelector(`form[id="${id}"]`);

    const field = name => form('spot').elements[name];

    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);
    
    const getFormData = data => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('type', data.type);
        formData.append('formFile', data.formFile || '');
        formData.append('fileName', data.fileName || '');
        return formData;
    }

    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    const filePath = '/Users/milesvendetti/Projects/SpotOps/ClientApp/src/components/spots/__tests__/rainbow.jpg';

    const getTestImageSource = () => {
        const fileInBase64 =  require('fs')
            .readFileSync(filePath, { 
                encoding: 'base64'
            });
        return "data:image/jpeg;base64," + fileInBase64;
    }

    const findOption = (dropDownNode, textContent) => {
        const options = Array.from(dropDownNode.childNodes);
        return options.find(
            option => option.textContent === textContent
        );
    };

    beforeEach(() => {
        ({renderform, container} = createContainer());
        fetchSpy = spy();
        window.fetch = fetchSpy.fn;
    });

    afterEach(() => {
        window.fetch = originalFetch;
        mockAxios.reset();
    });

    it('renders a form', () => {
        renderform(<SpotForm />);
        expect(
            form('spot')
        ).not.toBeNull();
    });

    it('has a submit button', () => {
        const { getByRole } = render(<SpotForm />);
        const submitButton = getByRole('button', {name: 'Add' });
        expect(submitButton).not.toBeNull();
    });

    it.skip('calls fetch with the right properties when submitting data', async () => {
        renderform(<SpotForm />);

        await ReactTestUtils.Simulate.submit(form('spot'));

        expect(fetchSpy).toHaveBeenCalled();
        expect(fetchSpy.receivedArg(0)).toEqual('api/spots');
        
        const fetchOpts = fetchSpy.receivedArg(1);
        expect(fetchOpts.method).toEqual('POST');
        expect(fetchOpts.headers).toEqual({
            'Content-Type': 'application/json'
        });
    });

    it('calls post request with right properties on submit', async () => {
        let getByTestId;
        const imageSource = getTestImageSource();

        await waitFor(() => {
            ({getByTestId} = render(<SpotForm name="Denver Skatepark" type="Park" imageSource={imageSource} />));
        });

        const submitButton = getByTestId('spot-submit');

        fireEvent.submit(submitButton);

        await waitFor(() => {
            expect(mockAxios.post).toHaveBeenCalledTimes(1);
        });
        
        const expectedData = {
            name: "Denver Skatepark",
            type: "Park",
            fileName: '',
            formFile: ''
        };

        expect(mockAxios.post).toHaveBeenCalledWith('api/spots', {
            data: getFormData(expectedData)
        });
    });

    it.skip('sends a post request when modifiying an existing spot', () => {
        
    });

    it('sends a post request when adding a new spot', async () => {
        const { getByTestId, getByLabelText} = render(<SpotForm />);

        await act(async()=> {
            fireEvent.change(getByTestId('spot-name'), {
                target : { value : 'Denver Skatepark', name: 'name' }
            });
        });

        await expect(getByTestId('spot-name').value).toEqual('Denver Skatepark');

        // Set the type.
        await ReactTestUtils.Simulate.change(getByTestId('spot-type'), {
            target : { value : 'Park', name: 'type' }
        });

        await expect(getByTestId('spot-type').value).toEqual('Park');

        // set an image
        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
        const imageInput = getByLabelText('image');

        fireEvent.change(imageInput, { target: { files: [file] } });

        await waitFor(() => {
            expect(getByTestId('spot-img')).toBeInTheDocument();
            expect(getByTestId('spot-img').src).toContain('image/png');
        });

        //submit
        await act(async() => {
            fireEvent.submit(getByTestId('spot-form'));
        });

        //Assert put content matches expected form data.
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toBeCalledWith('api/spots', {
            data: getFormData({
                name: 'Denver Skatepark',
                type: 'Park',
                formFile: file,
                fileName: file.name
            }),
            headers: {
                'Authentication Token': 'Bearer'
            }
        });
    })

    it.skip('notifies onSave when form is submitted', async () => {
        const spot = { name: 'FDR', type: 'Park' }
    });

    describe('Spot Name Field', () => {

        it('renders as a text box', () => {
            renderform(<SpotForm />);
            expectToBeInputFieldOfTypeText(field('name'));
        });

        it('includes the existing value', () => {
            renderform(<SpotForm name='value' />);
            expect(field('name').value).toEqual('value');
        });
        
        it('renders a label', () => {
            const { getByLabelText } = render(<SpotForm />);
            expect(getByLabelText('Spot Name')).toBeInTheDocument();
        });

        it('assigns an id that matches the label id', () => {
            renderform(<SpotForm />);
            expect(field('name').id).toEqual('name');
        });

        it('saves existing value when submitted', async () => {
            const { getByTestId } = render(<SpotForm name="value" />);
            const submitButton = getByTestId('spot-submit');

            fireEvent.submit(submitButton);
            expect(mockAxios.post).toHaveBeenCalledWith('api/spots', {
                data: getFormData({
                    name: 'value',
                    type: ''
                })
            });
        });

        it('saves new value when submitted', async () => {  
            const { getByTestId } = render(<SpotForm name='value' />);

            await fireEvent.change(getByTestId('spot-name'), {
                target : { value : 'new value', name: 'name' }
            });

            await fireEvent.submit(getByTestId('spot-form'));

            expect(mockAxios.post).toHaveBeenCalledTimes(1);
            expect(mockAxios.post).toHaveBeenCalledWith('api/spots', {
                data: getFormData({
                    name : 'new value',
                    type : ''
                })
            });
        });
        
    });

    describe('Spot Type Dropdown', () => {
        it('renders as a select box', () => {
            renderform(<SpotForm />);
            expect(field('type')).not.toBeNull();
            expect(field('type').tagName).toEqual('SELECT');
        });

        it('renders a label', () => {
            renderform(<SpotForm />);
            expect(labelFor('type').textContent).toEqual("Spot Type");
        });

        it('initally has a blank option', () => {
            renderform(<SpotForm />);
            const firstNode = field('type').childNodes[0];

            expect(firstNode.value).toEqual('');
            expect(firstNode.selected).toBeTruthy();
        });

        it('renders blank option when types list is empty', () => {
            renderform(<SpotForm selectableTypes={[]} />);
            const optionNodes = Array.from(field('type').childNodes);
            expect(optionNodes[0].value).toEqual('');
            expect(optionNodes.length).toEqual(1);
        });

        it('lists all spot types', () => {
            const selectableSpotTypes = ['park', 'rail'];
            renderform(
                <SpotForm 
                    selectableTypes={selectableSpotTypes} 
                />
            );
            const optionNodes = Array.from(field('type').childNodes);
            const renderedTypes = optionNodes.map(node => node.textContent);
            expect(renderedTypes).toEqual(
                expect.arrayContaining(selectableSpotTypes)
            );
        });

        it('pre-selects the existing value', () => {
            const types = ['Rail', 'Park'];
            renderform(
                <SpotForm 
                    selectableTypes={types}
                    type={'Rail'}
                />
            );

            const option = findOption(
                field('type'),
                'Rail'
            );

            expect(option.selected).toBeTruthy();
        });

        it('saves initial value when submitted', async () => {
            const { getByTestId } = render(<SpotForm />);
            await fireEvent.submit(getByTestId('spot-form'));

            expect(mockAxios.post).toHaveBeenCalledTimes(1);
            expect(mockAxios.post).toHaveBeenCalledWith('api/spots', {
                data : getFormData({
                    name: '',
                    type: ''
                })
            });
        });

        it('saves new value when submitted', async () => {  
            const { getByTestId, getByText } = 
                render(
                    <SpotForm 
                        selectableTypes={['value', 'new value']} 
                        type='value' 
                    />
                );

            expect(getByText('value')).toBeInTheDocument();

            let option = findOption(getByTestId('spot-type'), 'value')
            expect(option.selected).toBeTruthy();

            await fireEvent.change(getByTestId('spot-type'), {
                target : { value : 'new value' }
            });

            option = findOption(getByTestId('spot-type'), 'new value')
            expect(option.selected).toBeTruthy();

            await fireEvent.submit(getByTestId('spot-form'));

            expect(mockAxios.post).toHaveBeenCalledTimes(1);
            expect(mockAxios.post).toHaveBeenCalledWith('api/spots', {
                data: getFormData({
                    name: '',
                    type: 'new value'
                })
            });
        });

        it('saves existing value when submitted', async () => {
            const { getByTestId } = render(<SpotForm type='Park' />);    
            const submitButton = getByTestId('spot-submit');

            const option = findOption(getByTestId('spot-type'), 'Park')
            expect(option.selected).toBeTruthy();

            fireEvent.submit(submitButton);
            
            expect(mockAxios.post).toHaveBeenCalledWith('api/spots', {
                data: getFormData({
                    name: '',
                    type: 'Park'
                }) 
            });
        });
    });
    
    describe('Spot Image Field', () => {

        it('renders as file input box', () => {
            renderform(<SpotForm />);
            expect(field('image')).toBeDefined();
            expect(field('image').tagName).toEqual("INPUT");
            expect(field('image').type).toEqual("file");
        });

        it('renders a label', () => {
            renderform(<SpotForm />);
            expect(labelFor('image')).not.toBeNull();
            expect(labelFor('image').textContent).toEqual("Image");
        });

        it('removes img tag if src path is empty', () => {
            render(<SpotForm />);
            expect(document.querySelector('img')).toBeNull();
        });

        it('renders an existing image as base64 img src={}', async () => {
            const filePath = '/Users/milesvendetti/Projects/SpotOps/ClientApp/src/components/spots/__tests__/rainbow.jpg';

            const fileInBase64 =  require('fs')
                .readFileSync(filePath, { 
                    encoding: 'base64'
                });
            const imageAsSource = "data:image/jpeg;base64," + fileInBase64;

            await waitFor(() => {
                render(<SpotForm name="Rainbow road" type="rail" imageSource={imageAsSource} />);
            });
                
            await waitFor(() => {
                expect(screen.getByTestId('spot-img')).not.toBeNull();
                expect(screen.getByTestId('spot-img').src).toEqual(imageAsSource);
            })
        });

        it('renders an image on file change', async () => {

            const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
            const { getByTestId, getByLabelText } = render(<SpotForm />);
            const imageInput = getByLabelText('image');

            fireEvent.change(imageInput, { target: { files: [file] } });
            
            await waitFor(() => {
                expect(getByTestId('spot-img'));
            });

            const img = getByTestId('spot-img');
            expect(img.src).toContain('image/png');
            
        });

        it.skip('submits an image as form data', () => {

        });
    });
})
