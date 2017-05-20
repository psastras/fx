import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { Dispatch, Action } from 'redux'
import { toggleNav } from './actions';
import { IAppState } from 'src/app-reducer'
import { Link } from 'react-router-dom'
import Drawer from 'src/components/nav/drawer'
const styles = require('./nav.scss')

interface INavStateProps {
  visible: boolean,
}

interface INavDispatchProps {
  toggleNav: () => void,
}

class Nav extends React.PureComponent<INavStateProps & INavDispatchProps, {}> {

  public render(): JSX.Element {
    return (
      <div className={styles.nav}>
        <nav>
          <a onClick={this.handleClick}>
            <i className={styles.iconNav} aria-hidden='true'></i>
          </a>
          {this.props.visible && <Drawer /> }
        </nav>
      </div>
    )
  }

  private handleClick = (e) => {
    e.preventDefault()
    this.props.toggleNav()
  }
}

const mapStateToProps = (state: IAppState): INavStateProps => ({
  visible: state.nav.visible,
})

const mapDispatchToProps = (dispatch: (action: Action) => void): INavDispatchProps => ({
  toggleNav: () => dispatch(toggleNav()),
})

export default connect<INavStateProps, INavDispatchProps, {}>(
  mapStateToProps, mapDispatchToProps,
)(Nav)