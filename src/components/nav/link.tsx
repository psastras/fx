import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { IAppState } from 'src/app-reducer'
const styles = require('./link.scss')

interface ILinkProps {
  to: string
}

interface ILinkStateProps {
  active: boolean
}

class Link extends React.Component<ILinkProps & ILinkStateProps, {}> {
  public render(): JSX.Element {
    return (
        <RouterLink className={this.props.active && styles.active} to={this.props.to}>
          {this.props.children}
        </RouterLink>
    )
  }
}

const mapStateToProps = (state: IAppState, props: ILinkProps): ILinkStateProps => ({
  active: state.router.location.pathname === props.to,
})

export default connect<ILinkStateProps, {}, ILinkProps>(
  mapStateToProps,
)(Link)