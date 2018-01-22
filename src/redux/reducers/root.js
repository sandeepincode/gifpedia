import update from 'immutability-helper';
import axios from 'axios';
import simpleAction from '../../util/simpleAction';

export const SET_SMALL_GIF = 'setSmallGif/root';
export const SET_MED_GIF = 'setMedGif/root';
export const SET_LARGE_GIF = 'setLargeGif/root';

export const UPDATE_SEARCHSTRING = 'updateSearchString/root';
export const TASK_TRENDING = 'taskTrending/root';

export const FETCH_REQUEST = 'fetchRequest/root';
export const FETCH_FAILURE = 'fetchFailure/root';
export const FETCH_SUCCESS = 'fetchSuccess/root';

export const setSmallGif = simpleAction(SET_SMALL_GIF);
export const setMedGif = simpleAction(SET_MED_GIF);
export const setLargeGif = simpleAction(SET_LARGE_GIF);

export const updateSearchString = simpleAction(UPDATE_SEARCHSTRING);
export const updateTrendingTask = simpleAction(TASK_TRENDING);

const fetchFailure = simpleAction(FETCH_FAILURE);
const initialState = {
  ui: {
    loading: false,
    grid: 125,
  },
  data: {
    task: 'search',
    searchString:'',
    error: [],
    response: {},
  }
};

export default function rootReducer(state = initialState, {type, payload}) {
  switch (type) {
    case SET_SMALL_GIF: {
      return update(state, {
        ui:{
          grid: { $set: 125 }
        },
      });
    }
    case SET_MED_GIF: {
      return update(state, {
        ui:{
          grid: { $set: 175 }
        },
      });
    }
    case SET_LARGE_GIF: {
      return update(state, {
        ui:{
          grid: { $set: 225 }
        },
      });
    }
    case UPDATE_SEARCHSTRING: {
      return update(state, {
        data: {
          error: { $set: [] },
          task: { $set: 'search' },
          searchString: { $set: payload }
        }
      });
    }
    case TASK_TRENDING: {
        return update(state, {
          data: {
            task: { $set: 'trending' },
            searchString: { $set: [] }
        }});
    }
    case FETCH_REQUEST: {
      return update(state, {
        ui: {
          loading: { $set: true },
        },
        data: {
          response: { $set: [] },
        },
      });
    }
    case FETCH_FAILURE: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          error: { $push: [ payload ] },
        },
      });
    }
    case FETCH_SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          response: { $set: payload },
        },
      });
    }
  }
  return state;
}

export function fetchRequest () {
  return async (dispatch, getState) => {

    dispatch({
      type: FETCH_REQUEST
    });

    const { searchString, task } = getState().root.data;

    try {

      const params = {
        api_key: 'Q14Q8g6R4uxe21fD12yXljOSLaWs55WZ',
        q: searchString,
        limit: 150,
      };

      const url = 'https://api.giphy.com/v1/gifs/' + task;
      const response = await axios.get(url,{ params });

      if (response.data.meta.status !== 200 ) {
        return dispatch({
          type: FETCH_FAILURE,
          payload: 'End Point Failure',
        });
      }

      if ( !response.data.data.length ) {
        return dispatch({
          type: FETCH_FAILURE,
          payload: 'Looks like we have no Gifs for that search.',
        });
      }

      return dispatch({
        type: FETCH_SUCCESS,
        payload: response.data.data,
      });

    } catch (e) {

      return dispatch(fetchFailure(e));

    }
  }
}
