import React from "react";
import { Route, Routes } from "react-router-dom";
import { DASHBOARD_PAGE, SESSION_CHAT_PAGE, USERS_PAGE, USER_SESSIONS_PAGE } from "../../utils/Constants";
import UsersView from "../pages/UsersView";
import UserSessionsView from "../pages/UserSessionsView";
import SessionChatView from "../pages/SessionChatView";

function PageContent(props) {
    return (
        <div className="page">
            <Routes>
                <Route path={USERS_PAGE.url} element={<UsersView />} />
                <Route path={USER_SESSIONS_PAGE.url} element={<UserSessionsView />} />
                <Route path={SESSION_CHAT_PAGE.url} element={<SessionChatView />} />
            </Routes>
        </div>
    );
}

export default PageContent;
