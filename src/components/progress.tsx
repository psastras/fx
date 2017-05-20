import React from 'react'
import * as NProgress from 'nprogress'

export const progress = <P, S>(WrappedComponent: React.ComponentClass<P>): React.ComponentClass<P> => {
  return class extends React.Component<P, S> {

    public componentWillMount(): void {
      NProgress.start()
    }

    public componentDidMount(): void {
      NProgress.done()
    }

    public render(): JSX.Element {
      return <WrappedComponent {...(this as any).props} />
    }
  }
}