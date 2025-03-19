"use client";
import { Header } from "@components/header";
import { DataGrid, GridValueFormatterParams, type GridColDef } from "@mui/x-data-grid";
import { useExport, useMany, useSelect, useUpdate } from "@refinedev/core";
import { Option } from "@refinedev/core";
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
    const { mutate } = useUpdate();
    const token = decrypt(cookieStore.get("token") ?? '');
    const {
        options,
        queryResult: { isLoading, data: n },
    } = useSelect({

        resource: "edpl/company",
        optionValue: (item) => item._id,
        optionLabel: (item) => item.name,
        meta: {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        },
        hasPagination: false,
    });
    const {
        options: opts,
        queryResult: { isLoading: l, data: nn },
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
    const roles = cookieStore.get("date") != null ? decrypt(cookieStore.get("date") ?? '') : [];

    const columns: GridColDef[] = [
        {
            field: "company_name",
            headerName: "Company Name",
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
                // 
                // console.log(row);
                // 
                if (isLoading) {
                    return "Loading...";
                } else {
                    const category = options.find(
                        (item) => {
                            // console.log(item);

                            return row.company_name === item.value
                        },
                    );
                    return category?.label;
                }



            },
        },
        { field: 'type', headerName: 'Request Type', width: 100 },
        {
            field: 'catalogue_selection', 
            headerName: 'Sample Type', 
            width: 200,
            renderCell: function render({ row }) {
                return row.data?.catalogue_selection || ""; 
            },
        },
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
                        <ShowButton hideText recordItemId={row._id} meta={{
                            headers: {
                                "Authorization": `Bearer ${token}`,
                            }
                        }} />
                        <DeleteButton hideText recordItemId={row._id} meta={{
                            headers: {
                                "Authorization": `Bearer ${token}`,
                            }
                        }} />
                        <IconButton
                            onClick={()=>updatesent(row)}
                            aria-label="delete"  color="primary">
                            {/* <DeleteIcon /> */}
                            <CheckCircleOutlineIcon
                                onClick={()=>updatesent(row)}
                                color={row.sentsample === true ? 'primary' : 'disabled'}


                            />
                        </IconButton>
                        {/* <Button onClick={updatesent} variant="contained">
                            Mark As {row.sentsample === true ? 'UnSent' : 'Sent'}
                            </Button> */}

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
            type: "singleSelect",
            sortable: false,
            headerAlign: "left",
            align: "left",
            maxWidth: 200,
            flex: 0.5,
            valueOptions: opts,
            // 
            valueFormatter: (params: GridValueFormatterParams<Option>) => {
                return params.value;
            },
            renderCell: function render({ row }) {
                // console.log(row);
                if (isLoading) {
                    return "Loading...";
                } else {
                    const category = opts.find(
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

    function updatesent(data: any) {
        // console.log(data);

        mutate({
            resource: "edpl/sample_requests",
            id: data._id,
            values: {
                sentsample: data.sentsample === true ? false : true,
            },
            meta: {
                method: "put",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            },
        });
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

    const { triggerExport, isLoading: ll } = useExport({
        resource: "edpl/sample_requests",
        meta: {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        },

        mapData: (item) => {
            return {
                ...item,
                spid: opts.find(
                    (iteme) => {
                        // console.log(item);

                        return item.spid === iteme.value
                    },
                )?.label,
                company_name: options.find(
                    (iteme) => {
                        // console.log(item);

                        return item.company_name === iteme.value
                    },
                )?.label,
                // data: '',
                // category is an object, we need to stringify it
                data: JSON.stringify(item.data),
                // {"remark":"give regular folder  show zero by euer ","visited_date_time":"2024-07-19T11:30:00.000"}
                // remark: JSON.parse(JSON.stringify(item.data)).remark,
                // visited_date_time: formatDate(JSON.parse(JSON.stringify(item.data)).visited_date_time),
                // added_on: formatDate(item.createdAt)


            };
        },
    });
    return (
        <>

            <List title="Sample Request"
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
                    getRowId={(row) => row._id}
                    {...dataGridProps}
                    columns={columns}
                    // checkboxSelection
                    autoHeight

                />
            </List>
        </>
    );

}