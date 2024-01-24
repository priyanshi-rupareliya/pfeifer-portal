import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import {
    getLoggedInUser,
    SIGN_IN_PAGE,
} from "../utils/Constants";
import { clearStorage } from "../services/Service";
import Home from "./home/Home";
import SignIn from "./home/SignIn";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
            onSuccess: (response) => {
                if (response.status === 401) {
                    clearStorage();
                    window.location.reload();
                }
            },
        },
    },
});

function MainComponent() {
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            sessionStorage.clear();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    if (!!getLoggedInUser()) {
        redirect(SIGN_IN_PAGE.url);
    }

    return (
        
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Home />} />
                    <Route path={SIGN_IN_PAGE.url} element={<SignIn />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
        
    );
}

export default MainComponent;
