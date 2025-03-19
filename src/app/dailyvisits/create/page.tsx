"use client";

import { Box, TextField, Autocomplete, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Create, Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { decrypt } from "@app/enc";
import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useList } from "@refinedev/core";

export default function SalesDaily() {
  const cookieStore = useCookies();
  const token = decrypt(cookieStore.get("token") ?? '');
  const {
    saveButtonProps,
    register,
    control,
    setValue,
    refineCore: { onFinish, formLoading, queryResult: n },
    formState: { errors },
    watch,
  } = useForm({
    refineCoreProps: {
      metaData: {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      },
    },
  });

  const { autocompleteProps: companylist } = useAutocomplete({
    resource: "edpl/company",
    metaData: {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    },
    defaultValue: n?.data?.data.customer_name,
  });
  //  const { autocompleteProps: l } = useAutocomplete({
  //     resource: "edpl/veneer",
  //     metaData: {
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //       },
  //     },
  //     // defaultValue: n?.data?.data.company_name,
  //   });


  // console.log(l);


  const selectedItemType = watch('item_type') || 'Veneer';



  // var { data: laminate, isLoading: isLoading ,isError : e} = useList({
  //   resource: 'edpl/laminate',
  //   metaData: {
  //     headers: {
  //       "Authorization": `Bearer ${token}`,
  //     },
  //   },
  // })

  // const products = laminate?.data ?? [];
  // console.log(laminate?.data);


  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (e) {
  //   return <div>Something went wrong!</div>;
  // }
  // // {
  //   "_id": {
  //     "$oid": "6673e2087b7422a38f4511db"
  //   },
  //   "company_name": "Foxlo tech",
  //   "customer_name": "Yash",
  //   "data": {
  //     "remark": "Hi I met and said so and so\nbut I gues this that",
  //     "visited_date_time": "2024-06-20T12:00:00.000"
  //   },
  //   "spid": "43708",
  //   "createdAt": {
  //     "$date": "2024-06-20T08:02:16.886Z"
  //   },
  //   "updatedAt": {
  //     "$date": "2024-06-20T08:02:16.886Z"
  //   },
  //   "__v": 0
  // }

  const roles = cookieStore.get("date") != null ? decrypt(cookieStore.get("date") ?? '') : [];
  const getLastMonthFirstDay = () => {
    if (roles.includes("admin")) {
      return undefined;
    }
    const date = new Date();
    date.setDate(1);  // Set to the first day of the current month
    date.setMonth(date.getMonth() - 1);  // Move to the last month
    return date.toISOString().split('T')[0];
  };
  return (
    formLoading ? <>Loading</> :
      <>


        <Create saveButtonProps={saveButtonProps} isLoading={formLoading} title="New Daily Visit">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <Controller
              control={control}
              name="company_name"
              rules={{ required: "This field is required" }}
              defaultValue={null}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  {...companylist}
                  defaultValue={n?.data?.data?.company_name}
                  onChange={(_, value) => {
                    field.onChange(value.name);
                  }}
                  getOptionLabel={(item) => (
                    companylist?.options?.find((p) => {
                      const itemId =
                        typeof item === "object"
                          ? item?.name?.toString()
                          : item?.toString();
                      const pId = p?.name?.toString();
                      return itemId === pId;
                    })?.name ?? ""
                  )}
                  isOptionEqualToValue={(option, value) => {
                    const optionId = option?.name?.toString();
                    const valueId =
                      typeof value === "object"
                        ? value?.name?.toString()
                        : value?.toString();
                    return value === undefined || optionId === valueId;
                  }}
                  // @ts-ignore
                  placeholder="Company Name"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Company Name"
                      margin="normal"
                      variant="outlined"
                      defaultValue={n?.data?.data?.company_name}
                      required
                    />
                  )}
                />
              )}
            />





            <TextField
              {...register("customer_name", { required: "This field is required" })}
              label="Interacted With?"
              margin="normal"
              variant="outlined"
              defaultValue={n?.data?.data.customer_name}
              required
              error={!!errors.item_qty}
              // @ts-ignore
              helperText={errors.item_qty ? errors.amount.message : ''}
            />
            <TextField
              {...register("data.remark", { required: "This field is required" })}
              label="Remark"
              margin="normal"
              variant="outlined"
              defaultValue={n?.data?.data.data.remark}
              required

            // @ts-ignore
            // helperText={errors.data.remark ? errors.data.remark.message : ''}
            />
            <TextField
              {...register("createdAt", {
                required: false,

              })}
              error={!!errors?.from}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="date"
              label="Add for Date ?"
              name="createdAt"
              inputProps={{ min: getLastMonthFirstDay() }} // Set the min attribute dynamically

            />

          </Box>
        </Create>
      </>
  );
}
