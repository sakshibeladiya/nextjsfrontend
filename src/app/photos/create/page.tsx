"use client";

import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput, Autocomplete } from "@mui/material";
import { useOne } from "@refinedev/core";
import { Create, Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { decrypt } from "@app/enc"
import { useCookies } from 'next-client-cookies';
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Controller } from "react-hook-form";
export default function CategoryEdit() {
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
        }
      }
    }
  });
  const { autocompleteProps: photolist } = useAutocomplete({
    resource: "edpl/photos_directory",
    metaData: {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    },
    defaultValue: n?.data?.data.parent_directory,
  });
  return (
    <Create saveButtonProps={saveButtonProps} isLoading={formLoading} title="Edit Catalogue">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!errors?.name}
          margin="normal"
          fullWidth
          // defaultValue={ }
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Folder Name"
          name="name"
        />

        <Controller
          control={control}
          name="parent_directory"
          rules={{ required: "This field is required" }}
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              {...field}
              {...photolist}
              defaultValue={n?.data?.data?.parent_directory}
              onChange={(_, value) => {
                field.onChange(value.name);
              }}
              getOptionLabel={(item) => (
                photolist?.options?.find((p) => {
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
              placeholder="Parent Directory"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Parent Directory"
                  margin="normal"
                  variant="outlined"
                  defaultValue={n?.data?.data?.parent_directory}
                  required
                />
              )}
            />
          )}
        />


      </Box>
    </Create>
  );
}
