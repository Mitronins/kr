import dataBase from '../Root'
import { SINGS_TABLE } from '../constans'

export class SingService {
    static getUsersList() {
        return dataBase.queryAll(SINGS_TABLE);
    }

    static addNewSing(newSingData) {
        const singGateway = new SingGateway(
            newSingData.name,
            newSingData.author,
            newSingData.description,
            newSingData.album,
        );

        return singGateway.addNewSing();
    }

    static editSing = (newSingData) => {
        const singGateway = new SingGateway(
            newSingData.name,
            newSingData.author,
            newSingData.description,
            newSingData.album,
            newSingData.ID,
        );

        return singGateway.editSing(newSingData.ID);
    };

    static deleteSing = (singId) => {
        return new SingGateway(
            null,
            null,
            null,
            null,
            singId,
        ).deleteSing();
    }
}
