// @ts-nocheck
"use client";

import { Header } from "@components/header";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany, useSelect } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React, { useState } from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { Box, Button, IconButton, TextField } from "@mui/material";
import Link from "next/link";
import Select from "react-select";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment"
export default function UsersLists() {
  const [selection, setSelection] = useState("1");
  const [selectedDate, setSelectedDate] = useState(null);

  const columns: GridColDef[] = [
    { field: "uuid", headerName: "UUID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: function render({ row }) {
        return (
          <>
            <EditButton hideText recordItemId={row._id} />
            <DeleteButton hideText recordItemId={row._id} />
            {/* <Link href={`/salesPerson/location/${row.uuid}`}>
              <IconButton>
                <PinDropIcon />
              </IconButton>
            </Link> */}
            <Link
              href={{
                pathname: `/salesPerson/location/${row.uuid}`,
                query: {
                  type: selection,
                  date: moment(selectedDate).format("YYYY-MM-DD"),
                },
              }}
            >
              <IconButton>
                <PinDropIcon />
              </IconButton>
            </Link>
          </>
        );
      },
      align: "center",
      headerAlign: "center",
      minWidth: 80,
    },
  ];
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const option = [
    { label: "Select", value: null },
    { label: "Every 5 second", value: 1 },
    { label: "Every 30 minutes", value: 2 },
  ];

  console.log(selectedDate, "selectedDate")

  return (
    <>
      <List title="Users">
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            mb: "8px",
          }}
        >
          <div
            style={{
              minWidth: "200px",
              maxWidth: "200px",
              marginRight: "12px",
              minHeight: "56px",
            }}
          >
            <Select
              options={option}
              defaultValue={null}
              value={option.find((item) => item.value == selection)}
              onChange={(e) => setSelection(e.value)}
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: "56px",
                  maxHeight: "56px",
                }),
              }}
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={null}
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: { placeholder: "DD/MM/YYYY" }, // Set placeholder
              }}
            />
          </LocalizationProvider>
        </Box>
        <DataGrid
          getRowId={(row) => row._id}
          {...dataGridProps}
          columns={columns}
          checkboxSelection
          autoHeight
        />
      </List>
    </>
  );
}
