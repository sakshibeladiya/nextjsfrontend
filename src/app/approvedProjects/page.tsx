"use client";
import { Header } from "@components/header";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useExport, useMany } from "@refinedev/core";
import {
    DateField,
    DeleteButton,
    EditButton,
    List,
    MarkdownField,
    ShowButton,
    useDataGrid,
} from "@refinedev/mui";
import { decrypt } from "../enc"
import React from "react";
import { useCookies } from 'next-client-cookies';
import { Button, ButtonGroup } from "@mui/material";
export default function ApprovedProjects() {
    const cookieStore = useCookies();
    const token = decrypt(cookieStore.get("token") ?? '');
    const roles = cookieStore.get("date") != null ? decrypt(cookieStore.get("date") ?? '') : [];

    const columns: GridColDef[] = [
        // { field: '_id', headerName: 'ID', width: 2 },
        // { field: 'client_name', headerName: 'Client Name', width: 200 },
        { field: 'project_name', headerName: 'Project Name', width: 250 },
        { field: 'item_design', headerName: 'Item Design', width: 250 },

        // { field: 'rates', headerName: 'Rates', width: 200 },
        // { field: 'approved_by', headerName: 'Approved By', width: 200 },
        // { field: 'contractor', headerName: 'Contractor', width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            renderCell: function render({ row }) {
                return (
                    <>
                        <EditButton hideText recordItemId={row._id} />
                        <DeleteButton hideText recordItemId={row._id} meta={{
                            headers: {
                                "Authorization": `Bearer ${token}`,
                            }
                        }} />
                    </>
                );
            },
            align: "center",
            headerAlign: "center",
            minWidth: 120,
        },
    ];

    if (roles.includes("admin")) {
        // columns.unshift({

        // })
        columns.push(
            { field: 'tentative_qty', headerName: 'Tentative Quantity', width: 100 }
        )
        columns.push(
            {
                field: 'from', headerName: 'From', width: 170, renderCell: function render({ row }) {
                    return <DateField format="d/M/YYYY" value={row.from} />;
                },
            },
        )
        columns.push(
            {
                field: 'to', headerName: 'To', width: 170, renderCell: function render({ row }) {
                    return <DateField format="d/M/YYYY" value={row.to} />;
                },
            },
        )



    }




    const { dataGridProps } = useDataGrid({

        pagination: {
            current: 1,
            pageSize: 100,
            mode: "client", // "client" or "server"
        },


        meta: {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }

    });
    const { triggerExport, isLoading: ll } = useExport({
        resource: "edpl/aproval_menu",
        meta: {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        },

        mapData: (item) => {
            return {
                ...item,
                // category is an object, we need to stringify it
                // category: JSON.stringify(item.category),

            };
        },
    });
    return (
        <>

            <List title="Projects" headerButtons={({ defaultButtons }) => {
                return (
                    <>

                        {defaultButtons}

                        <ButtonGroup>
                            <Button onClick={() => triggerExport()} disabled={ll} variant="contained" color="primary">
                                Export
                            </Button>
                        </ButtonGroup>
                    </>
                );
            }}>

                <DataGrid

                    className=""
                    getRowId={(row) => row._id}
                    {...dataGridProps}
                    columns={columns}
                    disableVirtualization
                    columnBuffer={50}
                    // checkboxSelection
                    autoHeight

                />
            </List>
        </>
    );

}