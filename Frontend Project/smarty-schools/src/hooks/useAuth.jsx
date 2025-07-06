import { getCurrentUser, login } from "@/api/auth-services";
import { authActions } from "@/store/auth/auth-slice";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useAuth() {
    // create state
    const [isPending, setIsPending] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authentication.user);
    const isAuthenticated = useSelector(
        (state) => state.authentication.isAuthenticated
    );

    // create function
    const loginUser = async (userData) => {
        setIsPending(true);
        try {
            if (userData) {
                const response = await login(userData);
                if (!response.status === 200) {
                    throw new Error("Login failed");
                }
                // set the token in the cookies
                Cookies.set("__smarty_schools_jwt", response.data.token);
            }
            const token = Cookies.get("__smarty_schools_jwt");
            if (token) {
                const userResponse = await getCurrentUser();
                dispatch(authActions.saveUserToStore(userResponse.data)); // Dispatch with the user data received from the server
                // return the response if needed after user login successful
                return { status: userResponse.status, data: userResponse.data };
            }
        } catch (error) {
            // return the error if needed after user login failed
            return { status: error.response.status, data: error.response.data };
        } finally {
            setIsPending(false);
        }
    };

    const logoutUser = () => {
        dispatch(authActions.removeUserFromStore());
        Cookies.remove("__smarty_schools_jwt");
    };

    return { user, isAuthenticated, loginUser, isPending, logoutUser };
}
