import { combineReducers } from 'redux'
import navReducer, { INavStateAndPayload } from './components/nav/reducer'
import { routerReducer, RouterState } from 'react-router-redux'

export interface IAppState {
  nav: INavStateAndPayload
  router: RouterState
}

export default combineReducers<IAppState>({
  nav: navReducer,
  router: routerReducer,
})