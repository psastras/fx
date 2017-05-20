import { combineReducers } from 'redux'
import navReducer, { INavStateAndPayload } from './components/nav/reducer'

export interface IAppState {
  nav: INavStateAndPayload
}

export default combineReducers<IAppState>({
  nav: navReducer,
})