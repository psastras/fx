import { handleActions } from 'redux-actions'

export interface INavStateAndPayload {
  visible: boolean
}

const reducer = handleActions<INavStateAndPayload>({
  TOGGLE_NAV: (state, action) => ({
    visible: !state.visible,
  }),
}, { visible: false })

export default reducer