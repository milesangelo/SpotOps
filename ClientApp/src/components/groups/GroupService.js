import GroupModel from './GroupModel';

class GroupService {

    mockGroups = []

    constructor()
    {
        this.initializeMockData();
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
        return this.getMockData();
    }

    createGroup(fields) {
        console.log('mockGroups.len before ', this.mockGroups.length)
        this.mockGroups.push(new GroupModel({
            id : this.mockGroups.length+1,
            name : fields.groupName,
            dateCreated :  new Date().toISOString()
        }));
        console.log('mockGroups.len after ', this.mockGroups.length)
    }

    updateGroup(id, fields) {
        let groupIndexToUpdate = this.mockGroups
            .findIndex(grp => grp.id === parseInt(id));

        this.mockGroups[groupIndexToUpdate].name = fields.groupName;
        this.mockGroups[groupIndexToUpdate].numMembers = fields.numMembers;
        this.mockGroups[groupIndexToUpdate].numSpots = fields.numSpots;
        this.mockGroups[groupIndexToUpdate].dateModified = new Date().toISOString();

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
