/**
 * This file is where we do "rehydration" of your RootStore from AsyncStorage.
 * This lets you persist your state between app launches.
 *
 * Navigation state persistence is handled in navigationUtilities.tsx.
 *
 * Note that Fast Refresh doesn't play well with this file, so if you edit this,
 * do a full refresh of your app instead.
 *
 * @refresh reset
 */
import {applySnapshot, IDisposer} from 'mobx-state-tree';
import type {RootStore} from '../RootStore';

/**
 * The key we'll be saving our state as within async storage.
 */
// const ROOT_STATE_STORAGE_KEY = 'root-v1';

/**
 * Setup the root state.
 */
let _disposer: IDisposer;
export async function setupRootStore(rootStore: RootStore) {
  let restoredState: any;

  try {
    // load the last known state from AsyncStorage
    restoredState = {};
    applySnapshot(rootStore, restoredState);
  } catch (error) {
    console.error(error);
  }

  // stop tracking state changes if we've already setup
  if (_disposer) {
    _disposer();
  }

  // track changes & save to AsyncStorage
  // _disposer = onSnapshot(rootStore, snapshot =>
  //   storage.save(ROOT_STATE_STORAGE_KEY, snapshot),
  // );

  const unsubscribe = () => {
    _disposer();
    _disposer = undefined;
  };

  return {rootStore, restoredState, unsubscribe};
}
