import { AnyAction } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { GithubApi } from '../../../api/api';
import { RootState } from '../../configureStore';
import { USERS_LOADED, REPOS_LOADED } from '../data/data.actions';
import { fetchUsers, fetchRepos } from '../data/data.thunks';
import { SET_LOADER } from '../ui/ui.actions';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const githubApi = new GithubApi();
const middlewares = [thunk.withExtraArgument(githubApi)];
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares);

const initialRootState = {
  search: undefined,
  ui: undefined,
  data: undefined,
};

describe('Test fetchRepos thunk action creator', () => {
  it('should return a function', () => {
    const response = fetchRepos('test');
    expect(typeof response).toBe('function');
  });

  it('expected actions should be dispatched on successful request', () => {
    const store = mockStore(initialRootState as any);
    const expectedActions = [SET_LOADER, REPOS_LOADED, SET_LOADER];

    return store.dispatch(fetchRepos('test') as any).then(() => {
      const actions = store.getActions();
      expect(actions.map((action: AnyAction) => action.type)).toEqual(
        expectedActions
      );
    });
  });
});

describe('Test fetchUsers thunk action creator', () => {
  it('should return a function', () => {
    const response = fetchUsers('test');
    expect(typeof response).toBe('function');
  });

  it('expected actions should be dispatched on successful request', () => {
    const store = mockStore(initialRootState as any);
    const expectedActions = [SET_LOADER, USERS_LOADED, SET_LOADER];

    return store.dispatch(fetchUsers('test') as any).then(() => {
      const actions = store.getActions();
      expect(actions.map((action: AnyAction) => action.type)).toEqual(
        expectedActions
      );
    });
  });
});
