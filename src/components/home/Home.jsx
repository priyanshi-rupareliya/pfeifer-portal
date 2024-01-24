
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { getLoggedInUser, SIGN_IN_PAGE, USERS_PAGE } from "../../utils/Constants";
import { clearStorage } from "../../services/Service";
import AppHeader from "./AppHeader";
import PageContent from "./PageContent";

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();

    useEffect(() => {
        if (loggedInUser) {
            if (loggedInUser.exp < new Date().getTime()/1000) {
                clearStorage();
                navigate(SIGN_IN_PAGE.url, {replace: true});
            }

            if (location.pathname === "/") {
                navigate(USERS_PAGE.url, { replace: true });
            }
        } else {
            navigate(SIGN_IN_PAGE.url, {replace: true});
        }
    }, [navigate, loggedInUser, location])

    return (
        <>
            <AppHeader />
            <PageContent />
        </>
    )
}

export default Home
