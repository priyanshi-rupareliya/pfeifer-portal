import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import i18next from "../../i18n";
import { getLoggedInUser, items, SIGN_IN_PAGE } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../../services/Service";
import InterplayLogo from "../../common/InterplayLogo";

function AppHeader(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const location = useLocation();
    const [avatarText, setAvatarText] = useState("");
    const [pathName, setPathName] = useState("");
    const loggedInUser = getLoggedInUser();

    useEffect(() => {
        let text = "";
        loggedInUser?.fullName.split(" ").forEach((item) => {
            text = text + item.charAt(0);
        })
        setAvatarText(text);
    }, [avatarText, loggedInUser])

    useEffect(() => {
        const selectedPathName = window.location.pathname.slice(-1) === "/" ? window.location.pathname.slice(0, -1) : window.location.pathname;
        setPathName(selectedPathName);
    }, [location]);

    const onItemClick = () => {
        setTimeout(() => {
            setPathName(window.location.pathname);
        }, 0) 
    }

    function renderItems() {
        let menuItems = items;
        return menuItems.map((item, index) => {
            
            const cssClass = classNames("menu-item", {
                "menu-item-active": pathName === item.url,
            })

            return <Link className={cssClass} to={item.url} key={index} onClick={onItemClick} relative="path">
                <span>{item.name}</span>
            </Link>
        })
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogoutClicked = () => {
        clearStorage();
        navigate(SIGN_IN_PAGE.url, {replace: true});
    }

    return (
        <div className="app-header">
            <InterplayLogo style={{ padding: "5px"}} />
            <div className="app-menu">
                {renderItems()}
            </div>

            <div className="notification">

                <IconButton
                    onClick={handleClick}
                    title={loggedInUser?.email}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ height: 30, width: 30, color: "#000000", fontSize: "14px" }}>
                        {avatarText.toUpperCase()}
                    </Avatar>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <MenuItem onClick={onLogoutClicked}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        {i18next.t("logout")}
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default AppHeader;
