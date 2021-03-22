class SpotModel {

    constructor(spot)
    {
        console.log('new SpotModel(): ', spot)
        this.id = spot.id;
        this.name = spot.name;
        this.dateCreated = spot.dateCreated;
        this.dateModified = spot.dateModified;
    }

}

export default SpotModel;