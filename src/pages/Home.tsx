import React from 'react'
import TestScene from 'src/gl/test-scene'
import './home.scss'

export default class Home extends React.Component<{}, {}> {

  public refs: {
    canvas: any,
  }

  private scene: any

  public componentDidMount() {
    this.scene = new TestScene(this.refs.canvas)
    this.scene.render()
  }

  public render(): JSX.Element {
    return (
      <div id='home'>
        <div id='home-canvas-overlay'></div>
        <div ref='canvas' id='home-canvas'></div>
        <h1>PS</h1>
        <h2>Paul Sastrasinh</h2>
        <h3>Full Stack Software Engineer // NYC Area</h3>
        <div id='home-footer'>
          <a target='_blank' href='https://github.com/psastras'>
            <i className='fa fa-github' aria-hidden='true'></i>
          </a>
          <a target='_blank' href='https://www.linkedin.com/in/paul-sastrasinh-82480153/'>
            <i className='fa fa-linkedin-square' aria-hidden='true'></i>
          </a>
          <div className='bottom-right'>
            <a target='_blank' href='https://github.com/psastras/fx'>Source Code</a>
          </div>
        </div>
      </div>
    );
  }
}