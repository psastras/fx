import React from 'react'
import GLScene from 'src/gl/scene'
import progress from 'src/components/progress'
import fade from 'src/components/fade'
const styles = require('./scene.scss')

interface ISceneProps {
  scene: GLScene
}

@fade()
@progress()
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