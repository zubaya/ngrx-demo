import { Action } from '@ngrx/store';

export enum UserActionTypes {
  MarkUserNameChecked = '[User] Mark User Name Checked'
}

export class MarkUserNameChecked implements Action {
  readonly type = UserActionTypes.MarkUserNameChecked;

  constructor(public payload: boolean) {}
}

export type UserActions = MarkUserNameChecked;
