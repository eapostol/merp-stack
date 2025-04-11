import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { theme } from './utilities/theme'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={{ ...theme }}>
      {/* <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS> */} 
      <App />
    </MantineProvider>
  </StrictMode>,
);
