"use client";
import { Header } from "@components/header";
import { DataGrid, GridValueFormatterParams, type GridColDef } from "@mui/x-data-grid";
import { useExport, useMany, useSelect } from "@refinedev/core";
import { Option } from "@refinedev/core";
import {
    DateField,

    DeleteButton,
    EditButton,
    List,
    MarkdownField,
    ShowButton,
    useDataGrid
} from "@refinedev/mui";
import { decrypt } from "../enc"
import React from "react";
import { useCookies } from 'next-client-cookies';
import { Button, ButtonGroup } from "@mui/material";


export default function ApprovedProjects() {

    const cookieStore = useCookies();
    const roles = cookieStore.get("date") != null ? decrypt(cookieStore.get("date") ?? '') : [];
    const token = decrypt(cookieStore.get("token") ?? '');

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
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const columns: GridColDef[] = [

        {
            field: 'name', headerName: 'Name', width: 250,
            valueGetter: parms => parms.row.name?.toUpperCase()
        },
        {
            field: 'date', headerName: 'Date', width: 150,
            valueGetter: parms => formatDate(parms.row.createdAt)
        },
        {
            field: 'person_to_contact', headerName: 'Person To Contact', width: 200,
            // @ts-ignore
            // valueGetter: params => params.row.person_to_contact.length > 0 ? params.row.person_to_contact[0].company_person_name : ""
            valueGetter: params => {
                const personToContact = params.row.person_to_contact || [];
                if (personToContact.length > 0 && personToContact[0] && personToContact[0].company_person_name) {
                    return personToContact[0].company_person_name.toString().toUpperCase();
                }
                return "";
            }

        },
        {
            field: 'address1', headerName: 'Address 1', width: 400,
            valueGetter: params => params.row.address.address1
        },
        {
            field: 'address2', headerName: 'Address 2', width: 400,
            valueGetter: params => params.row.address.address2
        },
        {

            field: 'state', headerName: 'State', width: 200,
            valueGetter: params => params.row.address.state
        }, {

            field: 'city', headerName: 'City', width: 200,
            valueGetter: params => params.row.address.city
        }, {

            field: 'pincode', headerName: 'Pincode', width: 200,
            valueGetter: params => params.row.address.pincode
        },
//         //   "customer_type": "Dealer / Competitor",
//   "customer_grade": "A",
//   "customer_history": "More than 10 Years",
        { field: 'customer_type', headerName: 'Customer Type', width: 200 },
        { field: 'customer_grade', headerName: 'Customer Grade', width: 200 },
        { field: 'customer_history', headerName: 'Customer History', width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            renderCell: function render({ row }) {
                return (
                    <>
                        <EditButton hideText recordItemId={row._id} />
                        {roles.includes("admin") ? <DeleteButton hideText recordItemId={row._id} meta={{
                            headers: {
                                "Authorization": `Bearer ${token}`,
                            }
                        }} /> : <></>}
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
            // editable: true,
            field: "sid",
            headerName: "Added by",
            type: "singleSelect",
            headerAlign: "left",
            align: "left",
            minWidth: 300,
            flex: 0.5,
            sortable: false,
            valueOptions: options,
            // 
            valueFormatter: (params: GridValueFormatterParams<Option>) => {
                return params.value;
            },
            renderCell: function render({ row }) {
                //console.log(row);
                if (isLoading) {
                    return "Loading...";
                } else {
                    const category = options.find(
                        (item) => {
                            //console.log(item);

                            return row.sid === item.value
                        },
                    );
                    return category?.label?.toUpperCase();
                }
            },
        })
    }

    const { dataGridProps, setSorter } = useDataGrid({
        // syncWithLocation: true,
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
    const { filterMode, filterModel, onFilterModelChange, ...restDataGridProps } =
        dataGridProps;
    const { triggerExport, isLoading: ll } = useExport({
        resource: "edpl/company",
        meta: {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        },

        mapData: (item) => {
            // for address to create upper case output
            var address = item.address || {};
            // console.log(item.person_to_contact);
            var person_to_contact = item.person_to_contact || [];

            // this code is by sanket dev for taking all the json data into one column
            // //@ts-ignore
            // const formatContactInfo = (contact, index, totalContacts) => {
            //     const name = (contact.company_person_name || "").toUpperCase();
            //     const phone = (contact.company_person_pno || "").toUpperCase();
            //     const email = (contact.company_person_email || "").toUpperCase();

            //     let contactString = '';

            //     if (totalContacts > 1) {
            //         contactString += `Person to contact ${index + 1}: ${name}`;
            //     } else {
            //         contactString += `${name}`;
            //     }

            //     if (phone) {
            //         contactString += `, Phone: ${phone}`;
            //     }
            //     if (email) {
            //         contactString += `, Email: ${email}`;
            //     }

            //     return contactString;
            // };

            // //@ts-ignore
            // const formatContacts = (contacts) => {
            //     const totalContacts = contacts.length;

            //     //@ts-ignore
            //     return contacts.map((contact, index) => formatContactInfo(contact, index, totalContacts)).join("; ");
            // };


            var data = {
                // ...item,
                id: item._id,
                name: item.name,
                added_by: options.find(
                    (iteme) => {

                        // console.log(iteme);
                        return item.sid === iteme.value
                    },
                )?.label.toUpperCase(),
                // this logic to get the address data and to convert it to uppercase
                address1: (address.address1 || "").toUpperCase(),
                address2: (address.address2 || "").toUpperCase(),
                state: (address.state || "").toUpperCase(),
                pincode: (address.pincode || "").toUpperCase(),
                city: (address.city || "").toUpperCase(),
                district: (address.district || "").toUpperCase(),
                landmark: (address.landmark || "").toUpperCase(),
                // person_to_contact: JSON.stringify(item.person_to_contact).toUpperCase(),
                // person_to_contact: formatContacts(p_to_contact),
                // ...item,
                // category is an object, we need to stringify it
                // address: JSON.stringify(item.address),
                // alternate code og by yash
                // address1: JSON.parse(JSON.stringify(item.address)).address1,
                // address2: JSON.parse(JSON.stringify(item.address)).address2,
                // state: JSON.parse(JSON.stringify(item.address)).state,
                // pincode: JSON.parse(JSON.stringify(item.address)).pincode,
                // city: JSON.parse(JSON.stringify(item.address)).city,
                // district: JSON.parse(JSON.stringify(item.address)).district,
                // landmark: JSON.parse(JSON.stringify(item.address)).landmark,
                // person_to_contact: JSON.stringify(item.person_to_contact).toUpperCase(),
                first_visited: formatDate(item.first_visited),
                next_visit: formatDate(item.next_visit),

            };

            // this code is by yash
            // var person_to_contact = JSON.parse(JSON.stringify(item.person_to_contact));
            // // [{"company_person_name":"Bhupesh kumar ","company_person_email":"bknyar@yahoo.com","company_person_pno":"9810376142"}]
            if (person_to_contact.length > 0) {
                // its list can have multiple person to contact

                person_to_contact.forEach((element: any, i: Number) => {
                    // @ts-ignore
                    data["person_to_contact_" + (i + 1)] = element.company_person_name;
                    // @ts-ignore
                    data["company_person_email_" + (i + 1)] = element.company_person_email;
                    // @ts-ignore
                    data["company_person_pno_" + (i + 1)] = element.company_person_pno;

                });

            } else {
                // data["person_to_contact"] = "";
                //   // @ts-ignore
                // data["company_person_email"] = "";
                //   // @ts-ignore
                // data["company_person_pno"] = "";
            }


            // below is sanket dev for multiple column
            // var person_to_contact = JSON.parse(JSON.stringify(item.person_to_contact));

            // //@ts-ignore
            var processedData = [];
            

            // Check if person_to_contact is an array
            if (Array.isArray(person_to_contact)) {
                person_to_contact.forEach((contactList) => {
                    // Ensure each contactList is an array of contacts
                    if (Array.isArray(contactList)) {
                        var entryData = {};

                        // Process each contact in the contactList
                        contactList.forEach((element, i) => {
                            const index = i + 1;

                            //@ts-ignore
                            entryData[`person_to_contact_${index}`] = (element.company_person_name || "").toUpperCase();
                            //@ts-ignore
                            entryData[`company_person_email_${index}`] = (element.company_person_email || "").toUpperCase();
                            //@ts-ignore
                            entryData[`company_person_pno_${index}`] = (element.company_person_pno || "").toUpperCase();
                        });

                        // Fill in with default values for missing contacts up to a maximum number of contacts
                        const maxContacts = 5;
                        for (let i = contactList.length + 1; i <= maxContacts; i++) {
                            //@ts-ignore
                            entryData[`person_to_contact_${i}`] = "";
                            //@ts-ignore
                            entryData[`company_person_email_${i}`] = "";
                            //@ts-ignore
                            entryData[`company_person_pno_${i}`] = "";
                        }

                        // Add the processed entry data to the array
                        processedData.push(entryData);
                    } else {
                        console.error('Expected an array for contactList, but got:', contactList);
                    }
                });
            } else {
                console.error('Expected an array for person_to_contact, but got:', person_to_contact);
            }

            // // Log the processed data to verify
            // console.log(processedData);



            return data;
        },
    });

    // @ts-ignore
    // setSorter({ field: "name", order: "asc" });

    return (
        <>

            <List title="Company List"
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
            // wrapperProps={{
            //     style: {

            //         padding: "16px",
            //     },
            // }}
            >

                <DataGrid
                    getRowId={(row) => row._id}
                    {...dataGridProps}
                    columns={columns}
                    onSortModelChange={(model, details) => {
                        dataGridProps.onSortModelChange(model, details);
                        // console.log(model);


                        // do something else
                    }}

                    // checkboxSelection
                    autoHeight

                />
            </List>
        </>
    );

}