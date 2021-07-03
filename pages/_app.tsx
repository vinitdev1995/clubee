import React from 'react';
import {StylesProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

interface IAppProps {
  Component: React.FunctionComponent;
  pageProps: Record<string, any>;
}

const App: React.FunctionComponent<IAppProps> = ({
  Component,
  pageProps,
}: IAppProps) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <Component {...pageProps} />
    </StylesProvider>
  );
};
export default App;
