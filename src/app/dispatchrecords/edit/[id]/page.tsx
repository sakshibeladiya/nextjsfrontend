"use client";

import { Box, TextField, Autocomplete, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
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


        <Edit saveButtonProps={saveButtonProps} isLoading={formLoading} title="Edit Dispatch Record">
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
                  control={control}
                  name="item_name"
                  rules={{ required: "This field is required" }}
                  defaultValue={n?.data?.data.item_name}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      {...lami}
                      onChange={(_, value) => {
                        field.onChange(value.ItemName);
                      }}
                      disablePortal
                      getOptionLabel={(item) => (
                        lami?.options?.find((p) => {
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
                        const valueId = value?.ItemName?.toString();

                        // Handle comparison for both objects and strings
                        return value === undefined || (optionId !== undefined && optionId === valueId);
                      }}
                      // @ts-ignore
                      placeholder={n?.data?.data.item_name ?? 'item'}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Item Name"
                          margin="normal"
                          variant="outlined"
                          required
                          onBlur={(event) => {
                            event.preventDefault();
                            // @ts-ignore
                            const inputValue = event.target.value;
                            const selectedOption = lami?.options?.find(option => option.ItemName === inputValue);
                            if (selectedOption) {
                              field.onChange(selectedOption.ItemName);
                            } else {
                              field.onChange(inputValue); // Keep the current input value if not found in the list
                            }
                          }}
                          onKeyDown={(event) => {
                            if (event.key === 'Tab') {
                              event.preventDefault();
                              // @ts-ignore
                              const inputValue = event.target.value;
                              const selectedOption = lami?.options?.find(option => option.ItemName === inputValue);
                              if (selectedOption) {
                                field.onChange(selectedOption.ItemName);
                              } else {
                                field.onChange(inputValue); // Keep the current input value if not found in the list
                              }
                            }
                          }}
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
              defaultValue={n?.data?.data.item_qty}
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
              defaultValue={n?.data?.data.item_rate}
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
                  defaultValue={n?.data?.data.v_width}
                  error={!!errors.v_width}
                // helperText={errors.v_width ? errors.v_width.message : ''}
                />

                <TextField
                  {...register("v_length", { required: "This field is required" })}
                  label="Veneer Length"
                  margin="normal"
                  variant="outlined"
                  required
                  defaultValue={n?.data?.data.v_length}
                  error={!!errors.v_length}
                // helperText={errors.v_length ? errors.v_length.message : ''}
                /></>}

                {/* remark added */}
                <TextField
              {...register("remark", { required: "This field is required" })}
              label="Remark"
              margin="normal"
              variant="outlined"
              defaultValue={n?.data?.data.remark}
              required
              error={!!errors.remark}
              // @ts-ignore
              helperText={errors.remark ? errors.remark.message : ''}
            />

          </Box>
        </Edit>
      </>
  );
}
