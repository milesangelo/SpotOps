import GroupModel from './GroupModel';
import fetchWrapper from '../helpers/FetchWrapper'

class GroupService {

    /**
     * 
     */
    url = 'api/groups'

    /**
     * 
     */
    getGroupsList() {
        return fetchWrapper.get(this.url)
    }

    /**
     * 
     */
    getAll() {
        return fetchWrapper.get(this.url)
    }

    /**
     * 
     * @param {*} fields 
     */
    createGroup(fields) {
        const group = new GroupModel(fields)
        return fetchWrapper.post(this.url, fields)
    }

    /**
     * 
     * @param {*} id 
     * @param {*} fields 
     */
    updateGroup(id, fields) {
        return fetchWrapper.put(this.url, id, fields);
    }

    /**
     * 
     * @param {*} id 
     */
    deleteGroup(id) {
        return fetchWrapper.delete(this.url, id);
    }

    /**
     * 
     * @param {*} id 
     */
    getGroupById(id) {
        return fetchWrapper.getById(this.url, id);

    }
}

const groupService = new GroupService();

export default groupService;
