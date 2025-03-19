"use client";
import { Header } from "@components/header";
import { DataGrid, GridValueFormatterParams, type GridColDef } from "@mui/x-data-grid";
import { useMany, useSelect, Option, useExport } from "@refinedev/core";
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

    //   "company_name": "abc 3",
    // "item_type": "adwqw`",
    // "item_name": "rthtr",
    // "item_qty": "12",
    // "item_rate": "34",


    const roles = cookieStore.get("date") != null ? decrypt(cookieStore.get("date") ?? '') : [];
    const {
        options,
        queryResult: { isLoading, data: n },
    } = useSelect({

        resource: "auth/sales_team",
        optionValue: (item) => item.uuid,
        optionLabel: (item) => item.name,
        meta: {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        },
        hasPagination: false,
    });
    const columns: GridColDef[] = [
        // { field: '_id', headerName: 'ID', width: 2 },
        // { field: 'client_name', headerName: 'Client Name', width: 200 },
        { field: 'company_name', headerName: 'Company Name', width: 200 },
        { field: 'item_type', headerName: 'Item Type', width: 250 },
        { field: 'item_name', headerName: 'Item Name', width: 250 },
        { field: 'item_qty', headerName: 'Item Quantity', width: 100 },
        {
            field: 'Total', headerName: 'Total Amount', width: 100, renderCell: function render({ row }) {
                const formatter = new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 2
                });

                let totalAmount;
                if (row.item_type === 'Veneer') {
                    totalAmount = row.item_qty * row.item_rate * row.v_width * row.v_length;
                } else {
                    totalAmount = row.item_qty * row.item_rate;
                }

                return <div>{formatter.format(totalAmount)}</div>;
            },
        },
        {
            field: 'from', headerName: 'Date', width: 170, renderCell: function render({ row }) {
                return <DateField format="d/M/YYYY" value={row.created_at} />;
            },
        },

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
        columns.unshift({
            field: "spid",
            headerName: "Added by",
            sortable: false,
            type: "singleSelect",
            headerAlign: "left",
            align: "left",
            maxWidth: 250,
            flex: 0.5,
            valueOptions: options,
            // 
            valueFormatter: (params: GridValueFormatterParams<Option>) => {
                return params.value;
            },
            renderCell: function render({ row }) {
                console.log(row);
                if (isLoading) {
                    return "Loading...";
                } else {
                    const category = options.find(
                        (item) => {
                            // console.log(item);

                            return row.spid === item.value
                        },
                    );
                    return category?.label;
                }



            },
        })
    }



    const { dataGridProps } = useDataGrid({

        pagination: {
            current: 1,
            pageSize: 100,
            mode: "off", // "client" or "server"
        },
        filters: {
            mode: "off",
        },
        sorters: {
            mode: "off",
        },

        meta: {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }

    });
    const { triggerExport, isLoading: ll } = useExport({
        resource: "edpl/dispatch",
        meta: {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        },

        mapData: (item) => {
            return {
                ...item,
                spid: options.find(
                    (iteme) => {
                        // console.log(item);

                        return item.spid === iteme.value
                    },
                )?.label,
                // category is an object, we need to stringify it
                // category: JSON.stringify(item.category),

            };
        },
    });
    return (
        <>

            <List title="Dispatch Records"
                headerButtons={({ defaultButtons }) => {
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
                }}
            >

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