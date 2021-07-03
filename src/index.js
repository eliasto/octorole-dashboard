import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from "@sentry/react";
import { Integrations as TracingIntegrations } from "@sentry/tracing";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

Sentry.init({
  dsn: "https://a0d44943ab2a46c6be3518c49bdf3d98@o875884.ingest.sentry.io/5825410",
  integrations: [new TracingIntegrations.BrowserTracing({
    // Can also use reactRouterV3Instrumentation or reactRouterV4Instrumentation
    routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
  }),],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
     <Suspense fallback={<div className="flex bg-gray-900 h-screen"><div className="m-auto"><svg class="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div></div>}>
    <Router history={history}>
      <App />
    </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
