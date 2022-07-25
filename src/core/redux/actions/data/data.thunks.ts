import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GithubApi } from '../../../api/api';
import { RootState } from '../../configureStore';
import { setLoader } from '../ui/ui.actions';
import { setUsers, setRepositories } from './data.actions';

export const fetchRepos = (
  query: string,
  page = 1
): ThunkAction<void, RootState, GithubApi, Action<string>> => {
  return async (dispatch, getState, githubApi) => {
    dispatch(setLoader(true));
    const response = await githubApi.getRepos({ query, page });
    dispatch(setRepositories(response));
    dispatch(setLoader(false));
  };
};

export const fetchUsers = (
  query: string,
  page = 1
): ThunkAction<void, RootState, GithubApi, Action<string>> => {
  return async (dispatch, getState, githubApi) => {
    dispatch(setLoader(true));
    const response = await githubApi.getUsers({ query, page });
    dispatch(setUsers(response));
    dispatch(setLoader(false));
  };
};
