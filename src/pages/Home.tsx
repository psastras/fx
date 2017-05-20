import React from 'react'
import Scene from 'src/gl/scene'
import TestScene from 'src/gl/simple-cubes'
import './home.scss'

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
      <div id='home'>
        <div id='home-canvas-overlay'></div>
        <div ref='canvas' id='home-canvas'></div>
        <div id='home-text'>
          <h1>PS</h1><br />
          <h2>Paul Sastrasinh</h2><br />
          <h3>Full Stack Software Engineer // NYC Area</h3>
        </div>
        <div id='home-footer'>
          <a target='_blank' href='https://github.com/psastras'>
            <i className='fa fa-github' aria-hidden='true'></i>
          </a>
          <a target='_blank' href='https://www.linkedin.com/in/paul-sastrasinh-82480153/'>
            <i className='fa fa-linkedin-square' aria-hidden='true'></i>
          </a>
          <div className='footer-end'>
            <a target='_blank' href='https://github.com/psastras/fx'>Source Code</a>
          </div>
        </div>
      </div>
    );
  }
}