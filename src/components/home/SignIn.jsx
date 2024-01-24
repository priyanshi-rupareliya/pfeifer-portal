import { AccountCircle } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { signInUser } from "../../services/Service";
import InputText from "../../common/InputText";
import {
    USERS_PAGE,
    getLoggedInUser,
    setLoggedInUser,
} from "../../utils/Constants";
import FilePage from "../../common/FilePage";
import { useMutation } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';
import InterplayLogo from "../../common/InterplayLogo";

function SignIn() {
    const navigate = useNavigate();

    const asd = () => {
        navigate(USERS_PAGE.url, { replace: true });
    }

    useEffect(() => {
        const data = getLoggedInUser();
        if (data) {
            asd(data.role);
        }
    })

    const { mutate, isLoading } = useMutation(signInUser, {
        onSuccess: (result) => {
            if (result.success) {
                localStorage.setItem("sessionToken", result.token);
                let decoded = jwtDecode(result.token);
                setLoggedInUser(decoded);
            } else {
                setError(result.error);
            }
        }
    });

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isRequire, setIsRequire] = useState(false);

    const handleClickShowPassword = (e) => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (event) => {
        setEmailError(null);
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const onLoginClick = () => {
        setError(null);

        if (!email || !password) {
            setIsRequire(true);
            return;
        }
        if (!validator.isEmail(email)) {
            setEmailError("Enter valid email");
            return;
        }

        if (email && password) {
            mutate({ username: email, password });
        }
    }

    return (
        <div className="page-container">
            <div className="row m-0">
                <div className="col-xl-6 col-lg-6 col-md-12 p-0 pb-el-77199">
                    <div className="logo">
                        <InterplayLogo />
                    </div>

                    <div className="sign-in-container">
                        <div style={{ width: "450px" }}>
                            <div style={{ marginBottom: "30px" }}>
                                <h2> Sign in</h2>
                                <small id="emailHelp" className="form-text text-muted">
                                    Please enter your details to get started.
                                </small>
                            </div>
                            <form method="post" className="pb-el-98567" ajax="false">
                                <span>Email</span>
                                <div className="input-group mb-3">
                                    <InputText
                                        id="outlined-adornment-email"
                                        size="small"
                                        label="Email"
                                        type="text"
                                        value={email}
                                        icon={<AccountCircle />}
                                        handleChange={handleEmailChange}
                                        error={emailError}
                                        isRequire={isRequire}
                                    />
                                </div>

                                <span>Password</span>
                                <div className="input-group mb-3">
                                    <InputText
                                        id="outlined-adornment-password"
                                        size="small"
                                        label="Password"
                                        type={ showPassword ? "text" : "password" }
                                        value={password}
                                        showPassword={showPassword}
                                        handleClickShowPassword={handleClickShowPassword}
                                        handleChange={handlePasswordChange}
                                        isRequire={isRequire}
                                    />
                                </div>
                                <Button
                                    variant="contained"
                                    id="btnSignInBtn"
                                    fullWidth
                                    className="text-capitalize"
                                    disabled={isLoading}
                                    endIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : ""}
                                    onClick={() => onLoginClick()}
                                >
                                    Sign In
                                </Button>
                            </form>

                            <label id="error" className="text-danger mt-2">
                                {error}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-12 p-0">
                    <div className="image-container">
                        <FilePage />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
