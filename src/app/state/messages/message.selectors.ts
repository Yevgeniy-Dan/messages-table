import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMessageState } from './message.state';

export const messageFeatureKey = 'message';

export const selectMessage =
  createFeatureSelector<IMessageState>(messageFeatureKey);

export const selectMessageData = createSelector(
  selectMessage,
  (state: IMessageState) => state.data
);
