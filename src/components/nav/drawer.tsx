import React from 'react'
import fade from 'src/components/fade'
import Link from './link'
import { connect } from 'react-redux'
import { Dispatch, Action } from 'redux'
import { toggleNav } from './actions'
import { IAppState } from 'src/app-reducer'
const styles = require('./drawer.scss')

interface IDrawerStateProps {
  visible: boolean,
}

interface IDrawerDispatchProps {
  toggleNav: () => void,
}

@fade()
class Drawer extends React.Component<IDrawerStateProps & IDrawerDispatchProps, {}> {
  public render(): JSX.Element {
    return (
      <div className={styles.navDrawer}>
        <div className={styles.backgroundOverlay} onClick={this.handleClick} />
        <div className={styles.navLinksContainer}>
          <ul className={styles.navLinks}>
            <li>
              <Link to='/'>Home</Link>
            </li>
          </ul>
          <ul className={styles.navLinks}>
            <li>
              <Link to='/cubes'>Cubes</Link>
            </li>
            <li>
              <Link to='/icosohedron'>Icosohedron</Link>
            </li>
          </ul>
          <ul className={styles.navLinks}>
            <li>
              <a target='_blank' href='https://github.com/psastras'>GitHub</a>
            </li>
            <li>
              <a target='_blank' href='https://www.linkedin.com/in/paul-sastrasinh-82480153/'>LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  private handleClick = (e) => {
    e.preventDefault()
    this.props.toggleNav()
  }
}

const mapStateToProps = (state: IAppState): IDrawerStateProps => ({
  visible: state.nav.visible,
})

const mapDispatchToProps = (dispatch: (action: Action) => void): IDrawerDispatchProps => ({
  toggleNav: () => dispatch(toggleNav()),
})

export default connect<IDrawerStateProps, IDrawerDispatchProps, {}>(
  mapStateToProps, mapDispatchToProps,
)(Drawer)