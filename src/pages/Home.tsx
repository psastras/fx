import React from 'react'
import Icosohedron from 'src/gl/icosohedron'
import Cubes from 'src/gl/cubes'
import Nav from 'src/components/nav'
import Scene from 'src/components/scene'
import { Switch, Route } from 'react-router'
const styles = require('./home.scss')

export class Home extends React.PureComponent<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className={styles.home}>
        <Nav />
        <div className={styles.homeCanvasOverlay}></div>
        <Switch>
          <Route path='/icosohedron' component={() => <Scene scene={new Icosohedron()} />} />
          <Route path='/cubes' component={() => <Scene scene={new Cubes()} />} />
          <Route path='*' component={() => <Scene scene={new Icosohedron()} />} />
        </Switch>
        <div className={styles.homeText}>
          <h1>PS</h1><br />
          <h2>Paul Sastrasinh</h2><br />
          <h3>Full Stack Software Engineer // NYC Area</h3>
        </div>
        <div className={styles.homeFooter}>
          <a target='_blank' href='https://github.com/psastras'>
            <i className={styles.iconGithub} aria-hidden='true'></i>
          </a>
          <a target='_blank' href='https://www.linkedin.com/in/paul-sastrasinh-82480153/'>
            <i className={styles.iconLinkedin} aria-hidden='true'></i>
          </a>
          <div className={styles.footerEnd}>
            <a target='_blank' href='https://github.com/psastras/fx'>Source Code</a>
          </div>
        </div>
      </div>
    );
  }
}