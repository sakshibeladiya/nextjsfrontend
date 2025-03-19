"use client";

import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import { useOne } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { decrypt } from "@app/enc"
import { useCookies } from 'next-client-cookies';
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

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






  const selectedAccess = watch('access') || [];
  // console.log(queryResult.data);
  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading} title="Edit Customer History">

      {/* {
    "_id": "664f6d37f24972c9add04b20",
    "client_name": "ABC Corporation",
    "project_name": "Downtown Plaza Renovation",
    "item_design": "Custom Brick Pattern",
    "tentative_qty": 5000,
    "from": "2024-06-01T00:00:00.000Z",
    "to": "2024-12-01T00:00:00.000Z",
    "rates": "15.50 per unit",
    "approved_by": "John Doe",
    "contractor": "XYZ Construction",
    "__v": 0
} */}


      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <TextField
          {...register("title", {
            required: "This field is required",
          })}
          error={!!errors?.title}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Title to display in app "
          name="title"

        />
        {/* <TextField
          {...register("active", {
            required: "This field is required",
          })}
          error={!!errors?.client_name}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          disabled={true}
          hidden = {true}
          label="Title to display in app "
          name="active"

        /> */}

      </Box>
    </Edit>
  );
}
