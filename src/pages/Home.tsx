import React from 'react'
import TestScene from 'src/gl/test-scene'
import SimpleCubes from 'src/gl/simple-cubes'
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
          <Route exact path='/' component={() => <Scene scene={new SimpleCubes()} />} />
          <Route path='/test' component={() => <Scene scene={new TestScene()} />} />
          <Route path='/cubes' component={() => <Scene scene={new SimpleCubes()} />} />
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