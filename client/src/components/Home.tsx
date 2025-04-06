import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { Center, Stack, Container } from '@mantine/core';
import '../App.css';
import HelloFromServer from './HelloFromServer';


function Home() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Center style={{ height: 'calc(100vh - 64px)' }}>
                <Container size="sm">
                    <Stack align="center" justify="center">
                        <div>
                            <a href="https://vite.dev" target="_blank" rel="noopener">
                                <img src={viteLogo} className="logo" alt="Vite logo" />
                            </a>
                            <a href="https://react.dev" target="_blank" rel="noopener">
                                <img src={reactLogo} className="logo react" alt="React logo" />
                            </a>
                        </div>
                        <h1>Vite + React</h1>
                        <div className="card">
                            <HelloFromServer />
                        </div>
                        <div className="card">
                            <button onClick={() => setCount((count) => count + 1)}>
                                count is {count}
                            </button>
                            <p>
                                Edit <code>src/App.tsx</code> and save to test HMR
                            </p>
                        </div>
                        <p className="read-the-docs">
                            Click on the Vite and React logos to learn more
                        </p>
                    </Stack>
                </Container>
            </Center>
        </>
    );
}

export default Home;
