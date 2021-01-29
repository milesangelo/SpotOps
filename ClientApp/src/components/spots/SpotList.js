import React, { useState, useEffect } from 'react'
import ReactJson from 'react-json-view';
import SubmitButton from '../buttons/SubmitButton'
import spotService from './SpotService'

const SpotList = () => {

    const [spots, setSpots] = useState('')

    useEffect(() => {
        if (!spots) {
            getAllSpots()
        }
       console.log('Calling spotService to get spots available.');
    }, []);

    const getAllSpots = () => {
        const spots = spotService.getAll();
        if (spots) {
            setSpots(spots)
        }
    }

    const testMethod = () => {
        console.log('SpotList.testMethod!');
        getAllSpots()
    }


    return (
        <div>
       <SubmitButton 
            isSubmitting={false}
            onClick={testMethod}
            index={1}
            name="test!"
       />
        <p>Testing the spot list.</p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>Id</th>
                        <th style={{ width: '65%'}}>Name</th>
                        <th style={{ width: '30%'}}>Added</th>
                    </tr>
                </thead>
                <tbody>
                    {spots && spots.map(spot =>
                        <tr key={spot.id}>
                            <td>{spot.id}</td>
                            <td>{spot.name}</td>
                            <td>{spot.dateCreated}</td>
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