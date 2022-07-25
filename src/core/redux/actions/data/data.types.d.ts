import { Action } from 'redux';
import { GithubSearchResponse } from '../../../api/api';
import { REPOS_LOADED, USERS_LOADED } from './repo.actions';

export type ReposSearchPayload = GithubSearchResponse<Repository>;

export type UsersSearchPayload = GithubSearchResponse<User>;

interface SetRepos extends Action<typeof REPOS_LOADED> {
  payload: ReposSearchPayload;
}

interface SetUsers extends Action<typeof USERS_LOADED> {
  payload: UsersSearchPayload;
}

export type DataActions = SetUsers | SetRepos;
