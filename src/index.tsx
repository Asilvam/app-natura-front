import React from "react";
import {StrictMode} from 'react';
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query';
import { createRoot } from 'react-dom/client';

const client= new QueryClient();
const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <QueryClientProvider client={client}>
        <App />
        </QueryClientProvider>
    </StrictMode>
);