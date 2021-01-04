class GroupModel {

    constructor(properties)
    {
        
        this.id = properties.id;
        this.name = properties.name;
        this.dateCreated = properties.dateCreated;
        this.numMembers = properties.numMembers;
        this.numSpots = properties.numSpots;
    }
}

export default GroupModel ;