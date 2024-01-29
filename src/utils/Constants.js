export const API_URL = "https://pdestaging.interplay.iterate.ai"; //process.env.BACKEND_URL;
export const PFEIFER_BASE_URL = "https://pfeifer-dev235.never8.com"; // process.env.PFEIFER_BASE_URL;

export const SIGN_IN_URL = `${API_URL}/api/v1/sign-in`;

export const GET_USERS_URL = `${API_URL}/api/v1/getUsers`;

export const GET_USERS_SESSIONS_URL = `${API_URL}/api/v1/getChatSessions`;

export const GET_ALL_SESSIONS_URL = `${API_URL}/api/v1/getAllSessions`;

export const GET_SESSION_MESSAGES_URL = `${API_URL}/api/v1/getSessionMessages`;

const localStorageUserKey = "pfeiferPortalLoggedInUser";


export const SIGN_IN_PAGE = {
    name: "SignIn",
    url: "/sign-in",
};

export const USERS_PAGE = {
    name: "Users",
    url: "/users",
};

export const USER_SESSIONS_PAGE = {
    name: "User Sessions",
    url: "/user/sessions"
}

export const ALL_SESSION_PAGE = {
    name: "All Sessions",
    url: "/sessions"
}

export const SESSION_CHAT_PAGE = {
    name: "Session Chat",
    url: "/user/session/chat"
}

export const items = [USERS_PAGE, ALL_SESSION_PAGE];

export const getLoggedInUser = () => {
    const pfeiferPortalLoggedInUser = localStorage.getItem(localStorageUserKey);
    if (pfeiferPortalLoggedInUser) {
        return JSON.parse(pfeiferPortalLoggedInUser);
    }
    return undefined;
};

export const setLoggedInUser = (value) => {
    localStorage.setItem(localStorageUserKey, JSON.stringify(value));
};
