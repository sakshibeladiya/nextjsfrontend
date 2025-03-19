"use client";
import { Header } from "@components/header";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import { useMany } from "@refinedev/core";
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

        { field: 'ItemName', headerName: 'Product Name', width: 300 },
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




    const { dataGridProps } = useDataGrid({
        pagination: {
            current: 1,
            pageSize: 100,
            mode: "client", // "client" or "server"
        },
        filters : {
            mode: "off", 
        }, sorters : {
            mode: "off", 
        },

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
    const { filterMode, filterModel, onFilterModelChange, sortingMode, sortModel, onSortModelChange, ...restDataGridProps } =
        dataGridProps;
    return (
        <>

            <List title="Laminate List">
                <DataGrid
                    getRowId={(row) => row._id}
                    {...dataGridProps}
                    columns={columns}
                    sortingMode={sortingMode}
                    sortModel={sortModel}
                    onSortModelChange={onSortModelChange}
                    checkboxSelection
                    autoHeight
                    filterMode={filterMode}
                    filterModel={filterModel}
                    onFilterModelChange={onFilterModelChange}


                />
            </List>
        </>
    );

}