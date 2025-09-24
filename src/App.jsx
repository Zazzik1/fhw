import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Home from './pages/Home/Home';
import LeaderboardPage from './pages/Leaderboard/Leaderboard';
import ShopPage from './pages/Shop';

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
                element: <ShopPage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
