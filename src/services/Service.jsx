import {
    GET_ALL_SESSIONS_URL,
    GET_SESSION_MESSAGES_URL,
    GET_USERS_SESSIONS_URL,
    GET_USERS_URL,
    SIGN_IN_URL,
} from "../utils/Constants";

export function signInUser({ username, password} ) {
    const payload = {
        email: username,
        password,
    };

    return fetch(SIGN_IN_URL, getPayload(payload)).then((response) => {
        return response.json();
    });
}

export async function getUsers(page, limit) {
    return fetch(
        `${GET_USERS_URL}?page=${page}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("sessionToken"),
            },
        }
    ).then((response) => {
        return response.json();
    });
}

export async function getUserSessions(page, limit, userId) {
    return fetch(
        `${GET_USERS_SESSIONS_URL}?userId=${userId}&page=${page}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("sessionToken"),
            },
        }
    ).then((response) => {
        return response.json();
    });
}

export async function getAllSessions(page, limit, userId) {
    return fetch(
        `${GET_ALL_SESSIONS_URL}?page=${page}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("sessionToken"),
            },
        }
    ).then((response) => {
        return response.json();
    });
}

export async function getSessionMessages(conversationId) {
    return fetch(
        `${GET_SESSION_MESSAGES_URL}?conversationId=${conversationId}`,
        {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("sessionToken"),
            },
        }
    ).then((response) => {
        return response.json();
    });
}

function getPayload(payload) {
    return {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("sessionToken"),
        },
    };
}

export const clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
};
