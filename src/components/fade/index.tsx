import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
const styles = require('./fade.scss')

export default <P, S>(): (WrappedComponent: React.ComponentClass<P>) => any => {
  return (WrappedComponent: React.ComponentClass<P>) => {
    return class extends React.Component<P, S> {
      public render(): JSX.Element {
        return (
          <CSSTransitionGroup
            transitionName={{
              appear: styles.fadeAppear,
              appearActive: styles.fadeAppearActive,
              enter: styles.fadeEnter,
              enterActive: styles.fadeEnterActive,
              leave: styles.fadeLeave,
              leaveActive: styles.fadeLeaveActive,
            }}
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnterTimeout={200}
            transitionLeaveTimeout={100}>
            <WrappedComponent {...(this as any).props} />
          </CSSTransitionGroup>
        )
      }
    }
  }
}