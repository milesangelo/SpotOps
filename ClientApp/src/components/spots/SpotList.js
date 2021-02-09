import React, { useState, useEffect } from 'react'
import ReactJson from 'react-json-view';
import { Link } from 'react-router-dom';
import DeleteButton from '../buttons/DeleteButton';
import SubmitButton from '../buttons/SubmitButton'
import spotService from './SpotService'

const SpotList = (props) => {

    const [spots, setSpots] = useState([])
    const [deletingSpot, setDeletingSpot] = useState({
        isDeleting: false,
        id: 0
    })

    const { path } = props

    useEffect(() => {
        if (!spots) {
            getAllSpots()
        }
        spotService.getAll()
            .then(spots => {
                console.log('got all spots ', spots)
                setSpots(spots);
            })
       console.log('Calling spotService to get spots available.');
    }, []);

    const getAllSpots = () => {
        const spots = spotService.getAll();
        if (spots) {
            setSpots(spots)
        }
    }


    const deleteSpot = (id) => {
        setDeletingSpot({
            isDeleting: true,
            id: id
        })
    }

    const testMethod = () => {
        console.log('SpotList.testMethod!');
        getAllSpots()
    }

    console.log('Spots: ', spots)
    return (
        <div>
        <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2" >Add Group</Link>
        <p>Testing the spot list.</p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '5%'  }}>Id</th>
                        <th style={{ width: '65%' }}>Name</th>
                        <th style={{ width: '30%' }}>Added</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {spots && spots.map(spot =>
                        <tr key={spot.id}>
                            <td>{spot.id}</td>
                            <td>{spot.name}</td>
                            <td>{spot.dateCreated}</td>
                            <td style={{whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${spot.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <DeleteButton
                                    name="Remove"
                                    onClick={deleteSpot}
                                    index={spot.id}
                                    isDeleting={deletingSpot.isDeleting} />
                            </td>
                        </tr>
                    )}
                    {!spots &&
                        <tr>
                            <td colSpan="7" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {spots && !spots.length &&
                        <tr>
                            <td colSpan="7" className="text-center">
                                <div className="p-2">No Spots to Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            {spots && <ReactJson src={spots} theme="monokai" />}
        </div>
    )
}

export default SpotList