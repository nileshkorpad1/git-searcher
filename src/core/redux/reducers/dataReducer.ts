import { Reducer } from 'redux';
import {
  DataEntities,
  User,
  Repository,
} from '../../entities/dataEntities';
import {
  REPOS_LOADED,
  USERS_LOADED,
} from '../actions/data/data.actions';
import { DataActions } from '../actions/data/data.types';

export type DataState = {
  total_count: number;
  meta: {
    nextPage: number;
    lastPage: number;
  };
  type: 'user' | 'repository';
  items: DataEntities[];
};

const initialState: DataState = {
  type: 'repository',
  total_count: 0,
  items: [],
  meta: {
    nextPage: 0,
    lastPage: 0,
  },
};

export const dataReducer: Reducer<DataState, DataActions> = (
  state = initialState,
  action: DataActions
) => {
  switch (action.type) {
    case REPOS_LOADED: {
      return {
        type: 'repository',
        ...action.payload,
        items: action.payload.items as Repository[],
      };
    }
    case USERS_LOADED: {
      return {
        type: 'user',
        ...action.payload,
        items: action.payload.items as User[],
      };
    }
    default:
      return state;
  }
};
