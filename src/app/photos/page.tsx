"use client";
import { Header } from "@components/header";
import { DataGrid, GridValueFormatterParams, type GridColDef } from "@mui/x-data-grid";
import { useMany, useSelect } from "@refinedev/core";
import { Option } from "@refinedev/core";
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
export default function ApprovedProjects() {
    const cookieStore = useCookies();
    const token = decrypt(cookieStore.get("token") ?? '');


    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Folder Name"
        },
        {
            field: "parent_directory",
            headerName: "Parent Folder"
        },
        // { field: 'type', headerName: 'Request Type', width: 100 },
        {
            field: 'from', headerName: 'Requested On', width: 170, renderCell: function render({ row }) {
                return <DateField format="D/M/YYYY" value={row.createdAt} />;
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            renderCell: function render({ row }) {
                return (
                    <>
                        <ShowButton hideText recordItemId={row.name} meta={{
                            headers: {
                                "Authorization": `Bearer ${token}`,
                            }
                        }} />
                        <EditButton hideText recordItemId={row._id} meta={{
                            headers: {
                                "Authorization": `Bearer ${token}`,
                            }
                        }} />
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


    const { dataGridProps } = useDataGrid({
        pagination: {
            current: 1,
            pageSize: 100,
            mode: "client", // "client" or "server"
        },
        filters: {
            mode: "off",
        }, sorters: {
            mode: "off",
        },

        syncWithLocation: false,
        meta: {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        },
        onSearch: (values) => {
            return [
                {
                    field: "name",
                    operator: "contains",
                    // @ts-ignore
                    value: values.name,
                },
            ];
        },

    });

    return (
        <>
            <List title="Photo Upload">
                <DataGrid
                    getRowId={(row) => row._id}
                    {...dataGridProps}
                    columns={columns}
                    autoHeight
                />
            </List>
        </>
    );

}