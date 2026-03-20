import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.jsx';
import './index.css';
import { default as AgentResponsesPage } from "./pages/admin/FormResponsesPage.jsx";
import ManageAgentsPage from "./pages/admin/ManageAgentsPage.jsx";
import Login from './pages/auth/login.jsx';
import Signup from './pages/auth/signup.jsx';
import Unauthorized from './pages/auth/unauthorized.jsx';
import RouterGuard from './router.guard.jsx';

import { TanStackDevtools } from '@tanstack/react-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';
import AgentResponseView from './pages/shared/FormResponseView.jsx';
import Profile from './pages/shared/Profile.jsx';
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<App />} >
                <Route element={<RouterGuard allowedRoles={['ADMIN']} />} >
                    {/* Admin routes */}
                    <Route path="admin/agents/manage" element={<ManageAgentsPage />} />
                </Route>

                <Route element={<RouterGuard allowedRoles={['AGENT']} />}>
                    {/* Agent routes */}
                    <Route path="agent/tickets" element={<AgentResponsesPage />} />
                    <Route path="agent/tickets/:id" element={<AgentResponseView />} />
                </Route>

                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<h2>404 – Page not found</h2>} />

        </Routes>
        <TanStackDevtools
            initialIsOpen={false}
            position="bottom-right"
            plugins={[formDevtoolsPlugin()]}
        />
    </BrowserRouter>,
)
