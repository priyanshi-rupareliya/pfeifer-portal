import React, { useEffect, useState } from "react";
import {
    CircularProgress,
    IconButton,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserSessions } from "../../services/Service";
import i18next from "../../i18n";                                                                           
import moment from "moment";
import { SESSION_CHAT_PAGE } from "../../utils/Constants";

const UserSessionsView = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [userId] = useState(query.get("id"));
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedPage, setSelectedPage] = useState(1);
    const navigate = useNavigate();
    const { data: result, refetch, isFetching } = useQuery("userSessions", () => getUserSessions(selectedPage, rowsPerPage, userId))

    useEffect(() => {
        if (!isFetching) {
            refetch();
        }
    }, [rowsPerPage, selectedPage])

    const onRowClick = (row) => {
        navigate(`${SESSION_CHAT_PAGE.url}?id=${row.id}`);
    }

    const handleChangePage = (e, data) => {
        setSelectedPage(data);
    }

    const handleRowsPerPageChange = (value) => {
        setSelectedPage(1);
        setRowsPerPage(value);
    }

    const onReloadDocumentClick = () => {
        refetch();
    }

    const noOfPages = result ? Math.ceil(result.total / rowsPerPage) : 1;

    return (
        <div className="user-page-container">
            <div className="row mt-4">
                <div className="col-10 mx-auto">
                    <TableContainer component={Paper} className="mt-3">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="font-weight-bold">{i18next.t("email")}</TableCell>
                                    <TableCell className="font-weight-bold" align="center">{i18next.t("Magento User")}</TableCell>
                                    <TableCell className="font-weight-bold" align="center">{i18next.t("createdAt")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { !isFetching && result?.sessions?.map((row, index) => (
                                    <TableRow key={row.id} onClick={() => onRowClick(row)} className="hover">
                                        <TableCell component="th" scope="row">{row.email}</TableCell>
                                        <TableCell align="center">{row.isExistingUser ? "Yes" : "No"}</TableCell>
                                        <TableCell align="center">{ moment(row.createdAt).format("lll") }</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        { !isFetching && result?.sessions?.length > 0 && <div className="d-flex m-2 float-right">
                            <div className="mr-2 align-self-center">Total: <strong>{result.total}</strong></div>

                            <Pagination count={noOfPages} page={selectedPage} variant="outlined" shape="rounded" onChange={handleChangePage}/>
                            
                            <Select
                                id="item-per-page-select"
                                value={rowsPerPage}
                                size="small"
                                sx={{ height: "32px" }}
                                onChange={(e) => handleRowsPerPageChange(e.target.value)}
                            >
                                <MenuItem value={10} selected>10 / Pages</MenuItem>
                                <MenuItem value={20}>20 / Pages</MenuItem>
                                <MenuItem value={50}>50 / Pages</MenuItem>
                                <MenuItem value={100}>100 / Pages</MenuItem>
                            </Select>

                            <div className="ml-2">
                                <IconButton aria-label="delete" size="small" onClick={(e) => onReloadDocumentClick()}>
                                    <CachedIcon fontSize="medium" color="primary" />
                                </IconButton>
                            </div>
                        </div> }

                        { isFetching && <div className="p-3 text-center">
                                <CircularProgress size={30} color="inherit"/>
                            </div>
                        }
                        
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default UserSessionsView;
