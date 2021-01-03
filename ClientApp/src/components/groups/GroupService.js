import GroupModel from './GroupModel';

class GroupService {

    getGroupsList() {

        return this.getMockData();
    }

    getMockData() {

        this.mockGroups = [];

        for (var i = 0; i < 10; ++i) {

            var newGroup = new GroupModel({

                id:i,
                name: `group ${i}`, 
                dateCreated: `${1+i}/${11+i}/2021`, 
                numMembers: `${5%i*i}`, 
                numSpots: `${16*i%37+i*6}` 
            });

            this.mockGroups.push(newGroup)
        }

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
}

const groupService = new GroupService();

export default groupService;
