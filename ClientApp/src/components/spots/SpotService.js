import React from 'react';
import fetchwrapper from '../helpers/FetchWrapper';

class SpotService {

    mockData = [{
            id : 0,
            name : 'Love Park'
        },
        {
            id : 1,
            name : 'Denver Skatepark'
        },
        {
            id : 2,
            name : 'High School Rail'
        }
    ]
    url = "api/spots";

    /**
     * 
     * @param {*} id 
     */
    getSpotById(id) {
        console.log('SpotService.getSpotById(): ', id);
        return fetchwrapper.getById(this.url, id);
    }

    getAll() {
        console.log('SpotService.getAll() ')
        //console.log(this.mockData)
        return fetchwrapper.get(this.url);
       // return this.mockData;
    }
}

const spotService = new SpotService();

export default spotService;