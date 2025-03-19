"use client";

import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput } from "@mui/material";

import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

const accessOptions = ["sales", "admin"]; // Define your access options

export default function CategoryEdit() {
  const {
    saveButtonProps,
    register,
    control,
    setValue,
    refineCore: { onFinish, formLoading, queryResult: n },
    formState: { errors },
    watch,
  } = useForm({});

  


  const selectedAccess = watch('access') || [];

  return (
    <Edit saveButtonProps={saveButtonProps} title="Edit User">
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!errors?.name}

          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Name"
          name="name"
        />

        <TextField
          {...register("email", {
            required: "This field is required",
          })}
          error={!!errors?.email}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Email"
          name="email"
        />
 <TextField
          {...register("branch")}
          error={!!errors.branch}
          defaultValue=""
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Branch"
          type="text"
          name="branch"
        />
     
        <TextField
          {...register("password", { value: { 'password': '' } })}
          error={!!errors.password}
          defaultValue=""
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Password"
          type="password"
          name="password"
        />

        <TextField
          {...register("uuid", { value: { 'uuid': '' } })}
          error={!!errors.uuid}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="UUID"
          type="text"
          name="UUID"
          disabled
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
    </Edit>
  );
}
