import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Home from './pages/Home/Home';
import LeaderboardPage from './pages/Leaderboard/Leaderboard';
import StorePage from './pages/Store';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/leaderboard',
                element: <LeaderboardPage />,
            },
            {
                path: '/upgrade',
                element: <StorePage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
