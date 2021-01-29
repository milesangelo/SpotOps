class SpotModel {

    constructor(spot)
    {
        console.log('new SpotModel(): ', spot)
        this.id = spot.id;
        this.name = spot.name;
        this.owner = spot.name;
        this.dateCreated = spot.dateCreated;
        this.dateModified = spot.dateModified;
        this.numMembers = spot.numMembers;
        this.numSpots = spot.numSpots;
    }

}

export default SpotModel;