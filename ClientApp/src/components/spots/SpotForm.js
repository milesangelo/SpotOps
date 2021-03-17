import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import authService from '../api-authorization/AuthorizeService';
import spotService from './SpotService';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Link } from 'react-router-dom'
// import { Input } from 'reactstrap'
// import * as Yup from 'yup';

// import authService from '../api-authorization/AuthorizeService';
// import spotService from './SpotService';

// import ReactJson from 'react-json-view';
// import imageService from '../images/imageService';

// const SpotSchema = Yup.object().shape({
//     name: Yup.string()
//       .min(2, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Required'),
//     photo: Yup.mixed()
//         .required("Take a picture of the spot!") 
//         .test("fileSize", "File is too large", (value) => {
//             return value && value.size <= 10000000
//         })
//     //email: Yup.string().email('Invalid email').required('Required'),
//   });


export const SpotForm = ({ 
    name, 
    type, 
    imageSource,
    selectableTypes,
    match: {params},
    //location
}) => {

    //console.log('SpotForm match: ', match);
    //console.log('SpotForm location: ', location);

    const { id } = params;
    const createMode = useRef(!(name && type) && !id);

    const [ imageFile, setImageFile ] = useState();
    const [ preview, setPreview ] = useState(); 
    const fileInputRef = useRef();
    const [spot, setSpot] = useState({ 
        name: name || '',
        type: type || ''
    });
  
    useEffect(() => {
        if (!createMode.current) {
            getSpotById(id);
        }

    }, []);

    const getSpotById = async(id) => {
        await spotService.getSpotById(id)
            .then(({name, id}) => {
                setSpot({
                    name: name,
                    type: "Rail"
                });
            });
    
            // .then(spot => {
            //     if (spot) {
            //         setSpot(spot);
            //     }
            // })
            // .catch(err => {
            //     console.error(err);
            // });
    }

    // Create previews as a side effect of when selected file is changed.
    useEffect(() => {
        if (imageFile){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(imageFile);
        }
    }, [imageFile]);

    const handleChange = ({ target }) => {
        setSpot(spot => ({
            ...spot,
            [target.name]: target.value
        }));
    };

    const handleImageChange = ({ target }) => {
        const file = target.files[0];
        if (file) {
            setImageFile(file);
        } else {
            setImageFile(null);
        }
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', spot.name);
        formData.append('type', spot.type);
        formData.append("formFile", imageFile || '');
        formData.append("fileName", (imageFile && imageFile.name) || '');

        if (createMode.current)
        {
            spotService.createSpot(formData);
        }
        else {
            axios.post('api/spots', { 
                data: formData
            });
        }
    }

    return (
        <form 
            id="spot" 
            data-testid="spot-form"
            onSubmit={handleSubmit}
        >
            <div className="form-group col-5">
                <label htmlFor="name">Spot Name</label>
                <input
                    id="name"
                    name="name"
                    data-testid="spot-name"
                    type="text"
                    value={spot.name}
                    className="form-control"
                    onChange={handleChange}
                />
            </div>

            <div className="form-group col-5">
                <label htmlFor="type" >Spot Type</label>
                <select 
                    id="type"
                    name="type"
                    data-testid="spot-type"
                    value={spot.type}
                    className="form-control"
                    onChange={handleChange}
                  
                >
                    <option />
                    {selectableTypes.map(t => (
                        <option key={t}>{t}</option>
                    ))}
                </select>
            </div>
        
            <div className="form-group col-5">
                <button  
                    data-testid="spot-add-image"
                    className="btn btn-primary"
                    onClick={(event) => {
                        event.preventDefault();
                        fileInputRef.current.click();
                    }}
                >Add Image </button>

                <label htmlFor="image" >Image</label>
                
                <input
                    name="image"
                    data-testid="spot-file"
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    aria-label="image"
                    accept="image/*"
                    className="form-control"
                    onChange={handleImageChange}
                />
                {(preview || imageSource) &&
                    <img 
                        data-testid="spot-img"
                        alt="preview"
                        src={preview || imageSource} 
                    />
                }
            </div>

            <div className="form-row">
                <div className="form-group col-5">
                    <button data-testid="spot-submit" type="submit" className="btn btn-primary">Add</button>
                </div>
            </div>

        </form>
    )
};

SpotForm.defaultProps = {
    selectableTypes: [
        'Park',
        'Rail',
        'Dirt',
        'Ledge'
    ],
    //fetch: async () => {}
};



// const SpotForm = ({ history, match }) => {
//     const [user, setUser] = useState('')
//     const [spot, setSpot] = useState('')

//     const { id } = match.params;
//     const isAddMode = !id;

//     const createSpot = (fields, setSubmitting) => {
//         spotService.createSpot(fields)
//             .then((newSpot) => {
//                 console.log('newSpot response: ', newSpot)
//                 setSpot(newSpot)
//                 setSubmitting(false);
//                 history.push('.')
//             });
//     }

//     const updateSpot = (id, fields, setSubmitting) => {
//         spotService.updateSpot(id, fields)
//             .then(() => {
//                 setSubmitting(false);
//                 history.push('..');
//             });
//     }

//     // const onSubmit = (fields, { setStatus, setSubmitting }) => {
//     //     setStatus();
//     //     if (isAddMode) {
//     //         createSpot(fields, setSubmitting);
//     //     } else {
//     //         updateSpot(id, fields, setSubmitting);
//     //     }
//     // }

//     const getUser = async() => {
//         const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
//         if (isAuthenticated) {
//             setUser(user);
//         }
//     }

//     const getSpotById = async(id) => {
//         await spotService.getSpotById(id)
//             .then(spot => {
//                 if (spot) {
//                     setSpot(spot);
//                 }
//             })
//             .catch(err => {
//                 console.error(err);
//             });
//     }

//     useEffect(() => {
//         if (!isAddMode) {
//             getSpotById(id);
//         }
//         if (!user){
//             getUser();
//         }
//     }, []);

//     const onSubmit = async (values) => {
//         const formData = new FormData();
//         //spotService.createSpot(values);
//         //var spotId = 1;
//         //imageService.uploadImage(spotId, values.photo)
//     }

//     return ( 
//         <Formik 
//             enableReinitialize={true}
//             initialValues={{ 
//                 name: (spot && spot.name) || '',
//                 spot: {
//                     name: spot.name
//                 },
//                 photo: ''
//             }}
//             validationSchema={SpotSchema}
//             onSubmit={(async (values) => {
//                 onSubmit(values);
//             })}
//         >
//         {({ values, isSubmitting, errors, handleChange, setFieldValue }) => {
//             return (
//                 <Form>
//                 <div>
//                     <h1>{isAddMode ? 'Add Spot' : 'Edit Spot'}</h1>

//                     <div className="form-group col-5">
//                         <label>Name</label>
//                         <Field
//                             name="name"
//                             type="text"
//                             className={'form-control'} />
//                         <ErrorMessage name="name"/>
//                     </div>


//                     <div className="form-group col-5">
//                         <label>Name</label>
//                         <Input
//                             name="photo"
//                             type="file"
//                             className={'form-control'} 
//                             onChange={async (e) => {
//                                 handleChange('photo');
//                                 setFieldValue('photo', e.target.files[0]);
//                             }} />
//                         <ErrorMessage name="photo" />
//                     </div>


//                     <div className="form-row">
//                         <div className="form-group col-5">
//                             <button type="submit" disabled={isSubmitting} className="btn btn-primary">
//                                 {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
//                                     Save
//                             </button>
//                             <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
//                         </div>
//                     </div>
//                     {errors && <ReactJson name="errors" src={errors} theme="monokai" />}
//                     {values && <ReactJson name="values" src={values} theme="monokai" />}
//                     {user && <ReactJson name="user" src={user} theme="monokai" />}
//                 </div>
//                 </Form>
//             )}}
            
//             </Formik>
//     )
// }


//export default SpotForm;
