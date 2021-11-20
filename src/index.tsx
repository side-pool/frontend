import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import store from '@src/store';
import App from '@src/App';
import { getApiInstance } from '@src/utils/context';
import 'normalize.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import { NODE_ENV } from '@src/utils/NODE_ENV_TYPE';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey: [url, params] }) => {
        if (typeof url === 'string') {
          const { data } = await getApiInstance().get(url, {
            params,
          });
          return data;
        }
        throw new Error('Invalid QueryKey');
      },
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        {NODE_ENV === 'develop' && <ReactQueryDevtools />}
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
