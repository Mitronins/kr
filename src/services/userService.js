import dataBase from '../Root'
import { MUSICS_TABLE } from '../constans'

export class SingService {
    static getUsersList() {
        return dataBase.queryAll(MUSICS_TABLE);
    }

    static addNewUser(newSingData) {
        const newSingId = dataBase.insert(MUSICS_TABLE, {
            name: this.name,
            author: this.author,
            description: this.description,
            album: this.album,
        });
        dataBase.commit();

        return SingFinder.getSing( { query: { ID: newSingId }})[0];
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
