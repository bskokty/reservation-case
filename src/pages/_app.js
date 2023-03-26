
import { Provider } from 'react-redux'
import store from './redux/config/store'

const App = ({ Component, pageProps }) => {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
