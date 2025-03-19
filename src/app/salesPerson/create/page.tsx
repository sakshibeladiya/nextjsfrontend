"use client";

import { Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

import {  Select, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import { useOne } from "@refinedev/core";
import { Edit } from "@refinedev/mui";

export default function BlogPostCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});

  console.log(errors, "errors")
  const selectedAccess = watch('access') || [];

  const accessOptions = ["sales", "admin"]; // Define your access options
  return (
    <Create title={"Create New User"} isLoading={formLoading} saveButtonProps={saveButtonProps} >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!errors.name}
         
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Name"}
          name="name"
        />
        
        <TextField
          {...register("email", {
            required: "This field is required",
          })}
          error={!!errors.email}
        
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Email"}
          name="email"
        />
        
        <TextField
          {...register("branch", {
            required: "This field is required",
          })}
          error={!!errors.branch}
        
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Branch"}
          name="branch"
        />
        
        <TextField
          {...register("password", {
            required: "This field is required",
          })}
          error={!!errors.password}
        
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="password"
          label={"Password"}
          name="password"
        />
           <FormControl margin="normal" fullWidth>
          <InputLabel id="access-label">Access</InputLabel>
          <Select
           {...register("access", {
            required: "This field is required",
          })}
            labelId="access-label"
            id="access"
            multiple
            value={selectedAccess}
            onChange={(e) => setValue('access', e.target.value)}
            input={<OutlinedInput label="Access" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {accessOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={selectedAccess.indexOf(option) > -1} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
      </Box>
    </Create>
  );
}
