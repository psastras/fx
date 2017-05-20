import React from 'react'
import GLScene from 'src/gl/scene'
const styles = require('./scene.scss')

interface ISceneProps {
  scene: GLScene
}

export default class Scene extends React.Component<ISceneProps, {}> {

  public refs: {
    canvas: HTMLCanvasElement,
  }

  private scene: GLScene

  constructor(props) {
    super(props)
  }

  public componentDidMount(): void {
    this.props.scene.init(this.refs.canvas)
    this.props.scene.run()
  }

  public componentWillUnmount(): void {
    this.props.scene.dispose()
  }

  public render(): JSX.Element {
    return (
      <canvas ref='canvas' className={styles.sceneCanvas} />
    )
  }
}