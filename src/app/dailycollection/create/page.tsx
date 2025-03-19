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

  return (
    formLoading ? <>Loading</> :
      <>


        <Create saveButtonProps={saveButtonProps} isLoading={formLoading} title="Add  Daily Collection">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <Controller
              control={control}
              name="customer_name"
              rules={{ required: "This field is required" }}
              defaultValue={null}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  {...companylist}
                  defaultValue={n?.data?.data?.customer_name}
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
                      defaultValue={n?.data?.data?.customer_name}
                      required
                    />
                  )}
                />
              )}
            />





            <TextField
              {...register("amount", { required: "This field is required" })}
              label="Amount"
              margin="normal"
              variant="outlined"
              defaultValue={n?.data?.data.amount}
              required
              error={!!errors.item_qty}
              // @ts-ignore
              helperText={errors.item_qty ? errors.amount.message : ''}
            />

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
        </Create>
      </>
  );
}
