import { loginUser, registerUser } from "../Form/firebase-configuration";

export function getAuthAction(authType, model) {
    const { login, email, password } = model;
    switch (authType) {
        case "login":
            return loginUser(email, password);
        case "auth":
        default:
            return registerUser(login, email, password, "email");
    }
}
