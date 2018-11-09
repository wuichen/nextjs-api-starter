import { withRouter } from 'next/router'
import App, { Container } from 'next/app'
import Layout from 'components/Layout'

class MyApp extends App {
  state = {
    client: false
  }
  componentDidMount() {
    this.setState({
      client: true
    })
  }
  render () {
    const { Component, pageProps, router } = this.props
    const { asPath, pathname, query } = router
    const url = {
      asPath,
      pathname,
      query
    }
    if (this.state.client) {
      return (
        <Container>
          <Layout>
            <Component {...pageProps} url={url} />
          </Layout>
        </Container>
      )
    } else {
      return (<div></div>)
    }
    
  }
}

export default withRouter(MyApp)
