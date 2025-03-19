"use client";

import { Box, TextField, Autocomplete, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Chip, Avatar, Stack } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { decrypt } from "@app/enc";
import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useList } from "@refinedev/core";
import axios from "axios";
import { API_URL } from "@providers/auth-provider";
import { deepPurple } from "@mui/material/colors";

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

  // const { autocompleteProps: companylist } = useAutocomplete({
  //   resource: "edpl/company",
  //   metaData: {
  //     headers: {
  //       "Authorization": `Bearer ${token}`,
  //     },
  //   },
  //   defaultValue: n?.data?.data.company_name,
  // });
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

  // const { autocompleteProps: itemProps } = useAutocomplete({
  //   debounce: 500,
  //   pagination: {
  //     pageSize: 10000,
  //     mode: "client",
  //   },
  //   resource: `edpl/veneer`,
  //   metaData: {
  //     headers: {
  //       "Authorization": `Bearer ${token}`,
  //     },
  //   },
  //   defaultValue: n?.data?.data.item_name
  // });
  // const { autocompleteProps: lami } = useAutocomplete({

  //   resource: `edpl/laminate`,
  //   debounce: 500,

  //   pagination: {
  //     current: 1,
  //     pageSize: 1000,
  //     mode: "client",
  //   },
  //   metaData: {
  //     headers: {
  //       "Authorization": `Bearer ${token}`,
  //     },
  //   },
  //   // defaultValue : n?.data?.data.item_name
  // });


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

  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [searchType, setsearchType] = useState('')
  function search_company(n: string) {

    var options = {
      method: 'GET',
      url: `${API_URL}edpl/company/companies/search/${n}`,
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`
      }
    };

    axios.request(options).then(function (response) {
      const data = response.data;
      const names = data.map((item: any) => item.name); // Extract company names
      setCompanyNames(names); // Update state
      console.log(names.length); // Log the number of company names
      setsearchType('company')



    }).catch(function (error) {
      setCompanyNames([]); // 
      console.error(error);
    });
  }

  function search_veener(n: string) {

    var options = {
      method: 'GET',
      url: `${API_URL}edpl/veneer/veneer/search/${n}`,
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`
      }
    };

    axios.request(options).then(function (response) {
      const data = response.data;
      const names = data.map((item: any) => item.ItemName); // Extract company names
      setCompanyNames(names); // Update state
      console.log(names.length); // Log the number of company names
      setsearchType('veener')


    }).catch(function (error) {
      setCompanyNames([]); // 
      console.error(error);
    });
  }
  function laminate_veener(n: string) {

    var options = {
      method: 'GET',
      url: `${API_URL}edpl/laminate/laminate/search/${n}`,
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`
      }
    };

    axios.request(options).then(function (response) {
      const data = response.data;
      const names = data.map((item: any) => item.ItemName); // Extract company names
      setCompanyNames(names); // Update state
      console.log(names.length); // Log the number of company names
      setsearchType('veener')


    }).catch(function (error) {
      setCompanyNames([]); // 
      console.error(error);
    });
  }
  return (
    formLoading ? <>Loading</> :
      <>


        <Edit saveButtonProps={saveButtonProps} isLoading={formLoading} title="Edit Sales Record">
          <Stack
            width={'100vw'}
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              overflow: 'auto'
            }}
          >

            {
              companyNames.map((item: any, index: number) => {
                return (
                  <Chip label={item}  key={item} variant="outlined" onClick={() => {
                    searchType == 'company' ?
                      setValue("company_name", item) : setValue("item_name", item)
                  }}
                    sx={{ marginBottom: '10' }}
                  />
                  // <Chip
                  //   key={index}  // Ensure a unique key for each rendered element
                  //   label={item} // Assuming 'item' contains the name you want to display
                  //   variant="outlined"
                  //   color="info"
                  //   size="small"
                  //   avatar={<Avatar
                  //     sx={{ bgcolor: deepPurple[500],color: 'white' }}
                  //   >{item[0].toUpperCase()}</Avatar>} // Display the first letter of the company name
                  // />
                )
              })
            }
          </Stack>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {/* <Controller
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
            /> */}


            <TextField
              {...register("company_name", { required: "This field is required" })}
              label="Company Name"
              margin="normal"
              variant="outlined"
              onInput={(e) => {
                // @ts-ignore

                search_company(e.target.value);
              }}
              defaultValue={n?.data?.data.company_name}
              required
              error={!!errors.company_name}
              // @ts-ignore
              helperText={errors.company_name ? errors.company_name.message : ''}
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
            {/* {
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


            } */}

            <TextField
              {...register("item_name", { required: "This field is required" })}
              label="Item Name"
              margin="normal"
              variant="outlined"
              defaultValue={n?.data?.data.item_name}
              required
              onInput={(e) => {
                // @ts-ignore
                selectedItemType == 'Veneer' ? search_veener(e.target.value) : laminate_veener(e.target.value)
              }}
              error={!!errors.item_name}
              // @ts-ignore
              helperText={errors.item_name ? errors.item_name.message : ''}
            />


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

            {/* sales review */}
            <TextField
              {...register("remark")}
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
        </Edit >
      </>
  );
}
