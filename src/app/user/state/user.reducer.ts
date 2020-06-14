import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';
import { UserActionTypes, UserActions } from './user.actions';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const intialState: UserState = {
  maskUserName: true,
  currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export function reducer(state = intialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.MarkUserNameChecked:
      return {
        ...state,
        maskUserName: action.payload
      };
    default:
      return state;
  }
}
