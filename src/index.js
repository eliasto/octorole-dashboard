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
     <Suspense fallback={<div>Loading... </div>}>
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
