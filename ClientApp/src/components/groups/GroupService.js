import GroupList from './GroupList';
import GroupModel from './GroupModel';
import authService from '../api-authorization/AuthorizeService';
import fetchWrapper from '../helpers/fetchwrapper'


class GroupService {

    mockGroups = []
    url = 'api/groups'

    constructor()
    {
        this.initializeMockData()
    }

    initializeMockData() {
        for (var i = 0; i < 10; ++i) {
            var newGroup = new GroupModel({
                id : i,
                name : `group ${i}`, 
                dateCreated : new Date().toISOString(), 
                dateModified : new Date().toISOString(), 
                numMembers : `${5%i*i}`, 
                numSpots : `${16*i%37+i*6}` 
            });

            this.mockGroups.push(newGroup)
        }
    }

    getGroupsList() {
        return fetchWrapper.get(this.url)
        
        //eturn this.getMockData()
    }

    getAll() {
        //const token = await authService.getAccessToken();
        return fetchWrapper.get(this.url)
        
    }

    // async populateGroupData() {   
    //     console.log("Group: getting authorization"); 
    //     const token = await authService.getAccessToken();
    //     const response = await fetch('api/groups', {
    //         headers: 
    //              !token ? 
    //              {} : 
    //              { 'Authorization': `Bearer ${token}` }
    //     });
    //     const data = await response.json();
    //       if (data) {
    //         this.setState({ groups: data, loading: false });
    //     }
    // }    

    createGroup(fields) {
        const group = new GroupModel(fields)
        console.log('Service.createGroup')
        return fetchWrapper.post(this.url, fields)

        // const token = await authService.getAccessToken();

        // const requestOptions = {
        //     method: 'POST',
        //     headers: (!token) ? 
        //         {} : { 
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${token}`
        //         },
        //     body: JSON.stringify(group)
        // }

        // console.log('requestOpts: ', requestOptions)

        // const response = await fetch('api/groups/test',
        //     requestOptions).then(response => {
        //         response.json()
        //         console.log('fetched post')
        //     }).then(data => {
        //         console.log(data)
        //     }).catch(err => {
        //         console.log('error: ' , err)
        //     });


        // const data = await response.json().then(() => {
        //     console.log('response.json ')
        // }).catch(err => {
        //     console.log('error: ' , err)
        // });

        // const token = await authService.getAccessToken();
        // const response = await fetch('api/groups', {
        //     headers: 
        //          !token ? 
        //          {} : 
        //          { 'Authorization': `Bearer ${token}` }
        // });
        // const data = await response.json();



        this.mockGroups.push(new GroupModel({
            id : this.mockGroups.length+1,
            name : fields.name,
            dateCreated :  new Date().toISOString()
        }));
        console.log('mockGroups.len after ', this.mockGroups.length)
    }

    updateGroup(id, fields) {
        let groupIndexToUpdate = this.mockGroups
            .findIndex(grp => grp.id === parseInt(id));

        this.mockGroups[groupIndexToUpdate].name = fields.name;
        this.mockGroups[groupIndexToUpdate].numMembers = fields.numMembers;
        this.mockGroups[groupIndexToUpdate].numSpots = fields.numSpots;
        this.mockGroups[groupIndexToUpdate].dateModified = new Date().toISOString();
    }

    deleteGroup(id) {
        let grpToDelete = this.mockGroups.find(grp => grp.id === parseInt(id))
        console.log('Deleting grp #', id, ': ', grpToDelete);
        this.mockGroups = this.mockGroups.filter(grp => grp.id != parseInt(id));
        console.log()
    }


    getMockData() {
        return this.mockGroups;
    }

    addNewMockData() {
        let sz = this.mockGroups.length;

        this.mockGroups.push(

            new GroupModel({
                id: sz,
                name: `group ${sz}`, 
                dateCreated: `${1+sz}/${11+sz}/2021`, 
                numMembers: `${5%sz*sz}`, 
                numSpots: `${16*sz%37+sz*6}`
            })
        )
    }

    getGroupById(id) {
        //console.log('GroupService.getGroupById: ', id, ' ', typeof id)
        //console.log('mockGroups.len ', this.mockGroups.length)
        //console.log('find: ', this.mockGroups.find(grp => grp.id === parseInt(id)))
        //this.mockGroups.forEach(grp => console.log(typeof grp.id));
        return this.mockGroups.find(grp => grp.id === parseInt(id))
    }
}

const groupService = new GroupService();

export default groupService;
