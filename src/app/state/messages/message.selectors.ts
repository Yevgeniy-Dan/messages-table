import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMessageState } from './message.state';

export const messagesStateKey = 'messages';

export const selectMessage =
  createFeatureSelector<IMessageState>(messagesStateKey);

export const selectMessageData = createSelector(
  selectMessage,
  (state: IMessageState) => state.data
);

export const selectSendMessageLoading = createSelector(
  selectMessage,
  (state: IMessageState) => state.loading
);
