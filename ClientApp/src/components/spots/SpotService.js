import fetchWrapper from '../helpers/FetchWrapper';
import SpotModel from './SpotModel'


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
        return fetchWrapper.getById(this.url, id);
    }

    getAll() {
        console.log('SpotService.getAll() ')
        //console.log(this.mockData)
        return fetchWrapper.get(this.url);
       // return this.mockData;
    }

    createSpot(fields) {
        console.log('posting new spot ', fields)
        return fetchWrapper.post(this.url, fields);
    }

    deleteSpot(id) {
        return fetchWrapper.delete(this.url, id);
    }

    updateSpot(id, fields) {
        return fetchWrapper.put(this.url, id, fields);
    }

}

const spotService = new SpotService();

export default spotService;