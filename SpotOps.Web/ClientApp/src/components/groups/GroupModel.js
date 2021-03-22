class GroupModel {
    constructor(grp)
    {
        console.log('new GroupModel(): ', grp)
        this.id = grp.id;
        this.name = grp.name;
        this.owner = grp.name;
        this.dateCreated = grp.dateCreated;
        this.dateModified = grp.dateModified;
        this.numMembers = grp.numMembers;
        this.numSpots = grp.numSpots;
    }
}

export default GroupModel ;