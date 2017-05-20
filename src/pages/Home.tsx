import React from 'react'
import Scene from 'src/gl/scene'
import TestScene from 'src/gl/simple-cubes'
const styles = require('./home.scss')

export class Home extends React.PureComponent<{}, {}> {

  public refs: {
    canvas: HTMLElement,
  }

  private scene: TestScene

  public componentDidMount() {
    this.scene = new TestScene(this.refs.canvas)
    this.scene.run()
  }

  public render(): JSX.Element {
    return (
      <div className={styles.home}>
        <div className={styles.homeCanvasOverlay}></div>
        <div ref='canvas' className={styles.homeCanvas}></div>
        <div className={styles.homeText}>
          <h1>PS</h1><br />
          <h2>Paul Sastrasinh</h2><br />
          <h3>Full Stack Software Engineer // NYC Area</h3>
        </div>
        <div className={styles.homeFooter}>
          <a target='_blank' href='https://github.com/psastras'>
            <i className='fa fa-github' aria-hidden='true'></i>
          </a>
          <a target='_blank' href='https://www.linkedin.com/in/paul-sastrasinh-82480153/'>
            <i className='fa fa-linkedin-square' aria-hidden='true'></i>
          </a>
          <div className={styles.footerEnd}>
            <a target='_blank' href='https://github.com/psastras/fx'>Source Code</a>
          </div>
        </div>
      </div>
    );
  }
}