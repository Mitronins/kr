import {GET_ALL_SINGS, ADD_NEW_SING, EDIT_SING, DELETE_SING} from "../constans";
import { SingService } from "../services/singService";

export const getAllSings = () => {
  return {
      type: GET_ALL_SINGS,
      data: SingService.getSingList(),
  }
};

export const addNewSing = (newSingData) => {
    const newSing = SingService.addNewSing(newSingData);

    return {
        type: ADD_NEW_SING,
        data: newSing,
    }
};

export const editSing = (singId, sing) => {
    const newSing = SingService.editSing({...sing, ID: singId});

    return {
        type: EDIT_SING,
        data: newSing,
    }
};

export const deleteSing = (singId) => {
    SingService.deleteSing(singId);

    return {
        type: DELETE_SING,
        data: singId,
    }
};