import React from 'react'
import { connect } from 'react-redux'
import { Dispatch, Action } from 'redux'
import { toggleNav } from './actions';
import { IAppState } from 'src/app-reducer'
import { Link } from 'react-router-dom'
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
          {!this.props.visible ?
            <a onClick={this.handleClick}>
              <i className={styles.iconNav} aria-hidden='true'></i>
            </a> :
            <div className={styles.navDrawer}>
              <div className={styles.backgroundOverlay} onClick={this.handleClick} />
              <a onClick={this.handleClick}>
                <i className={styles.iconNav} aria-hidden='true'></i>
              </a>
              <div className={styles.navLinksContainer}>
                <ul className={styles.navLinks}>
                  <li>
                    <Link to='/'>Home</Link>
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
          }
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