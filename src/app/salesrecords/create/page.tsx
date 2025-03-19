"use client";

import { Box, TextField, Autocomplete, createFilterOptions, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Create, Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { decrypt } from "@app/enc";
import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useList } from "@refinedev/core";
import DatePicker from "@mui/lab/DatePicker/DatePicker";


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
    defaultValue: n?.data?.data.company_name,
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

  const { autocompleteProps: itemProps } = useAutocomplete({
    debounce: 500,
    pagination: {
      pageSize: 10000,
      mode: "client",
    },
    resource: `edpl/veneer`,
    metaData: {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    },
    defaultValue: n?.data?.data.item_name
  });
  const { autocompleteProps: lami } = useAutocomplete({

    resource: `edpl/laminate`,
    debounce: 500,

    pagination: {
      current: 1,
      pageSize: 1000,
      mode: "client",
    },
    metaData: {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    },
    // defaultValue : n?.data?.data.item_name
  });
  const filterOptions = createFilterOptions({
    ignoreCase: true,
    matchFrom: "start",
    limit: 10,
  });
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

  return (
    formLoading ? <>Loading</> :
      <>


        <Create saveButtonProps={saveButtonProps} isLoading={formLoading} title="Create Sales Record">
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
                      required
                    />
                  )}
                />
              )}
            />

            <FormControl component="fieldset">
              <FormLabel component="legend">Item Type</FormLabel>
              <Controller
                control={control}
                name="item_type"
                defaultValue="Veneer"
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel value="Veneer" control={<Radio />} label="Veneer" />
                    <FormControlLabel value="Laminate" control={<Radio />} label="Laminate" />
                  </RadioGroup>
                )}
              />
            </FormControl>
            {
              selectedItemType == 'Veneer' ?
                <Controller
                  control={control}
                  name="item_name"
                  rules={{ required: "This field is required" }}
                  defaultValue={null}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      {...itemProps}
                      onChange={(_, value) => {
                        field.onChange(value.ItemName);
                      }}
                      getOptionLabel={(item) => (
                        itemProps?.options?.find((p) => {
                          const itemId =
                            typeof item === "object"
                              ? item?.ItemName?.toString()
                              : item?.toString();
                          const pId = p?.ItemName?.toString();
                          return itemId === pId;
                        })?.ItemName ?? ""
                      )}
                      isOptionEqualToValue={(option, value) => {
                        const optionId = option?.ItemName?.toString();
                        const valueId =
                          typeof value === "object"
                            ? value?.ItemName?.toString()
                            : value?.toString();
                        return value === undefined || optionId === valueId;
                      }}
                      // @ts-ignore
                      placeholder="Item Name"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Item Name"
                          margin="normal"
                          variant="outlined"
                          required
                        />
                      )}
                    />
                  )}
                /> :
                <Controller
                  // {...register("item_name", { required: "This field is required" })}
                  control={control}
                  name="item_name"

                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Autocomplete
                      // defaultValue = { n?.data?.data.item_name}
                      {...field}
                      {...lami}
                      filterOptions={filterOptions}
                      onChange={(_, value : any) => {

                        field.onChange(value.ItemName);
                      }}
                      getOptionLabel={(item) => (
                        lami?.options?.find((p) => {
                          const itemId =
                            typeof item === "object"
                              // @ts-ignore
                              ? item?.ItemName?.toString()
                              : item?.toString();
                          const pId = p?.ItemName?.toString();
                          return itemId === pId;
                        })?.ItemName ?? ""
                      )}
                      isOptionEqualToValue={(option, value) => {
                          // @ts-ignore
                        const optionId = option?.ItemName?.toString();
                        const valueId =
                          typeof value === "object"
                            // @ts-ignore
                            ? value?.ItemName?.toString()
                            : value?.toString();
                        return value === undefined || optionId === valueId;
                      }}
                      // @ts-ignore
                      placeholder={n?.data?.data.item_name ?? 'item name'}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Item Name"
                          margin="normal"
                          variant="outlined"
                          required
                        />
                      )}
                    />
                  )}
                />
            }


            <TextField
              {...register("item_qty", { required: "This field is required" })}
              label="Item Quantity"
              margin="normal"
              variant="outlined"
              required
              error={!!errors.item_qty}
              // @ts-ignore
              helperText={errors.item_qty ? errors.item_qty.message : ''}
            />

            <TextField
              {...register("item_rate", { required: "This field is required" })}
              label="Item Rate"
              margin="normal"
              variant="outlined"
              required
              error={!!errors.item_rate}
              // @ts-ignore
              helperText={errors.item_rate ? errors.item_rate.message : ''}
            />
            {
              selectedItemType == 'Veneer' && <>
                <TextField
                  {...register("v_width", { required: "This field is required" })}
                  label="Veneer Width"
                  margin="normal"
                  variant="outlined"
                  required
                  error={!!errors.v_width}
                // helperText={errors.v_width ? errors.v_width.message : ''}
                />

                <TextField
                  {...register("v_length", { required: "This field is required" })}
                  label="Veneer Length"
                  margin="normal"
                  variant="outlined"
                  required

                  error={!!errors.v_length}
                // helperText={errors.v_length ? errors.v_length.message : ''}
                /></>}


            <TextField
              {...register("createdAt", {
                required : false,
               
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

            {/* remark addedd */}

            <TextField
              {...register("remark")}
              label="Remark"
              margin="normal"
              variant="outlined"
              required
              error={!!errors.remark}
              // @ts-ignore
              helperText={errors.remark ? errors.remark.message : ''}
            />


          </Box>
        </Create>
      </>
  );
}
