"use client";

import { Box, TextField, Autocomplete, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Chip, Avatar, Stack, Button, } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";

import { useForm } from "@refinedev/react-hook-form";
import { useFieldArray } from "react-hook-form";
import { decrypt } from "@app/enc";
import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useList } from "@refinedev/core";
import axios from "axios";
import { API_URL } from "@providers/auth-provider";
import { deepPurple } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
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
    defaultValues: {
      cities: ['a', 'b'],
    },
    refineCoreProps: {

      metaData: {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      },
    },

  });
  var sc = n?.data?.data.cities;
  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-ignore
    name: 'cities',
  });


  // useEffect(() => {
  //   if (n && n.data?.data?.cities) {
  //     setValue("cities", n.data.data.cities);
  //   }
  //   // Ensure it runs only once after n is loaded
  // },[]); 
  console.log(n);

  // useEffect(() => {
  //   if (n && n.data?.data?.cities) {
  //     setValue("cities", n.data.data.cities);
  //   }
  // }, [n, setValue]);

  



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
  const [callCount, setCallCount] = useState(0);
  // useEffect(() => {
  //   if (n && n.data?.data?.cities) {
  //     setValue("cities", n.data.data.cities);
  //   }

  // },[n]); 
  useEffect(() => {
    if (callCount < 3 && n && n.data?.data?.cities) {
      setValue("cities", n.data.data.cities);
      setCallCount((prevCount) => prevCount + 1);
    }
  }, [n, callCount]);
  return (
    formLoading ? <>Loading</> :
      <>


        <Edit saveButtonProps={saveButtonProps}>
          <Box component="form">
            <>

              {fields.map(({ id }, index) => {
                return (
                  <Box
                    key={id}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginRight: "15px",
                    }}
                  >
                    <Controller
                      control={control}
                      // @ts-ignore
                      name={`cities[${index}]`}
                      render={({ field }) => (
                        <TextField
                          // @ts-ignore
                          {...register(`cities[${index}]`)}
                          {...field}
                          error={!!errors?.cities}
                          helperText={errors.cities && `${errors.cities.message}`}
                          margin="normal"
                          required
                          fullWidth
                          id="City"
                          label={`City - ${index + 1}`}
                        />
                      )}
                    />
                    <DeleteIcon
                      onClick={() => {
                        remove(index);
                      }}
                      sx={{ color: "red", cursor: "pointer" }}
                    />
                  </Box>
                );
              })}
            </>
          </Box>
          <p>{errors.cities && `${errors.cities?.root?.message}`}</p>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              append('');
            }}
          >
            Add a city
          </Button>
        </Edit>
      </>
  );
}
