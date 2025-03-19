"use client";
import { Header } from "@components/header";
import { DataGrid, GridValueFormatterParams, type GridColDef } from "@mui/x-data-grid";
import { useMany, useSelect, Option, useExport, useList } from "@refinedev/core";
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

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
export default function ApprovedProjects() {
    const cookieStore = useCookies();
    const token = decrypt(cookieStore.get("token") ?? '');

    //   "company_name": "abc 3",
    // "item_type": "adwqw`",
    // "item_name": "rthtr",
    // "item_qty": "12",
    // "item_rate": "34",

    function formatDate(dateString: string): string {
        console.log(dateString)
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
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

    const roles = cookieStore.get("date") != null ? decrypt(cookieStore.get("date") ?? '') : [];

    const columns: GridColDef[] = [
        // { field: '_id', headerName: 'ID', width: 2 },
        // { field: 'client_name', headerName: 'Client Name', width: 200 },
        { field: 'company_name', headerName: 'Company Name', width: 200 },
        { field: 'item_type', headerName: 'Item Type', width: 100 },
        { field: 'item_name', headerName: 'Item Name', width: 200 },
        { field: 'item_qty', headerName: 'Item Quantity', width: 150 },
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
            field: 'from', headerName: 'Date', width: 100, renderCell: function render({ row }) {
                return <DateField format="D/M/YYYY" value={row.createdAt} />;
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


    // const [companies, setCompanies] = useState([]);

    // // Fetch data from the companies API
    // useEffect(() => {
    //     const fetchCompanies = async () => {
    //         try {
    //             const response = await fetch('your_api_base/edpl/companies', {
    //                 method: 'GET',
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
                
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }

    //             const data = await response.json();
    //             setCompanies(data); // Assuming data is an array
    //         } catch (error) {
    //             console.error("Error fetching companies:", error);
    //         }
    //     };
        
    //     fetchCompanies();
    // }, [token]);

    // logic 
    // const { triggerExport, isLoading: ll } = useExport({
    //     resource: "edpl/sales",
    //     meta: {
    //         headers: {
    //             "Authorization": `Bearer ${token}`,
    //         },
    //     },
    //     mapData: (item) => {

    //         //@ts-ignore
    //         const company = companies.find(c => c._id === item.company_id);
    //         console.log(company);
            
        
    //         return {
    //             // Map the required fields for the export
    //             "Date of Sales": new Date(item.createdAt).toLocaleDateString(), 
    //                         //@ts-ignore
    //             "Party Name": company?.name || " ", 
    //                         //@ts-ignore
    //             "Party Type": company?.person_to_contact[0]?.customer_type || " ", 
    //                         //@ts-ignore
    //             "Party Grade": company?.person_to_contact[0]?.customer_grade || " ",
    //             "Design Name": item.item_name || " ", 
    //             "Item Type": item.item_type || " ", 
    //             "Qty": Number(item.item_qty) || 0, 
    //             "Rate": Number(item.item_rate) || 0, 
    //             "Amount": (Number(item.item_qty) * Number(item.item_rate)) || 0, 
    //             "Added By": options.find(
    //                 (iteme) => item.spid === iteme.value
    //             )?.label || " ",
    //         };
    //     },
    // });

    // // If user has admin role, add "Added By" column
    // if (roles.includes("admin")) {
    //     columns.unshift({
    //         field: "spid",
    //         headerName: "Added by",
    //         type: "singleSelect",
    //         sortable: false,
    //         headerAlign: "left",
    //         align: "left",
    //         maxWidth: 150,
    //         flex: 0.5,
    //         valueOptions: options,
    //         valueFormatter: (params: GridValueFormatterParams<Option>) => {
    //             return params.value;
    //         },
    //         renderCell: function render({ row }) {
    //             if (isLoading) {
    //                 return "Loading...";
    //             } else {
    //                 const category = options.find(
    //                     (item) => row.spid === item.value
    //                 );
    //                 return category?.label || "N/A";
    //             }
    //         },
    //     });
    // }

    // function formatDate(dateString: string): string {
    //     const date = new Date(dateString);
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    //     const year = date.getFullYear();
    //     return `${day}/${month}/${year}`;
    // }
    const { data, isLoading: ils, isError } = useList({
        resource: "edpl/company",
        meta: {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }


    });
    // const { triggerExport, isLoading: ll } = useExport({
    //     resource: "edpl/sales",
    //     meta: {
    //         headers: {
    //             "Authorization": `Bearer ${token}`,
    //         },
    //     },
    //     mapData: (item) => {
    //         return {
    //             ...item,
    //             // category is an object, we need to stringify it
    //             // category: JSON.stringify(item.category),
    //             spid: options.find(
    //                 (iteme) => {
    //                     // console.log(item);

    //                     return item.spid === iteme.value
    //                 },
    //             )?.label,
    //         };
    //     },
    // });
    const { triggerExport, isLoading: ll } = useExport({
        resource: "edpl/sales",
        meta: {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        },
        mapData: (item) => {
            if (!item || !data?.data) {
                console.error("Item or data is missing");
                return {};
            }
    
            // Extract customer grade and type based on the company name
            const customer = data.data.find((i) => item.company_name === i.name);
            const cg = customer?.customer_grade || "N/A";
            const ct = customer?.customer_type || "N/A";
    
            // Map the data for export
            return {
                ...item,
                spid: options.find((iteme) => item.spid === iteme.value)?.label || "Unknown",
                customer_type: ct,
                customer_grade: cg,
                created_at: formatDate(item.createdAt),
            };
        },
    });
    
    if (roles.includes("admin")) {
        columns.unshift({
            field: "spid",
            headerName: "Added by",
            type: "singleSelect",
            sortable: false,
            headerAlign: "left",
            align: "left",
            maxWidth: 150,
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
    const { sortingMode, sortModel, onSortModelChange, ...restDataGridProps } =
        dataGridProps;

    return (
        <>

            <List title="Sales Records" headerButtons={({ defaultButtons }) => {
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


                    // className=""
                    getRowId={(row) => row._id}
                    {...dataGridProps}
                    columns={columns}
                    sortingMode={sortingMode}
                    sortModel={sortModel}
                    onSortModelChange={onSortModelChange}
                // disableVirtualization
                // columnBuffer={50}
                // checkboxSelection
                // autoHeight

                />
            </List>
        </>
    );

}