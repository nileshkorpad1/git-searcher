import { ActionCreator } from 'redux';
import {
  DataActions,
  UsersSearchPayload,
  ReposSearchPayload,
} from './data.types';

export const REPOS_LOADED = 'REPOS_LOADED' as const;
export const REPOS_LOADING = 'REPOS_LOADING' as const;
export const USERS_LOADED = 'USERS_LOADED' as const;
export const USERS_LOADING = 'USERS_LOADING' as const;

export const setRepositories: ActionCreator<DataActions> = (
  data: ReposSearchPayload
) => ({
  type: REPOS_LOADED,
  payload: data,
});

export const setUsers: ActionCreator<DataActions> = (
  data: UsersSearchPayload
) =>({
  type: USERS_LOADED,
  payload: data,
});
