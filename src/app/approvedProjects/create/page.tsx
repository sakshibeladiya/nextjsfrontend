"use client";

import { Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

import { Select, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import { useOne } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { decrypt } from "@app/enc"
import { useCookies } from 'next-client-cookies';
export default function BlogPostCreate() {
  const cookieStore = useCookies();
  const token = decrypt(cookieStore.get("token") ?? '');
  const {
    saveButtonProps,
    refineCore: { formLoading },
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
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

  const accessOptions = ["sales", "admin"]; // Define your access options
  return (
    <Create saveButtonProps={saveButtonProps} isLoading={formLoading} title="New Project">

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
          {...register("client_name", {
            required: "This field is required",
          })}
          error={!!errors?.client_name}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Client Name"
          name="client_name"

        />

        <TextField
          {...register("project_name", {
            required: "This field is required",
          })}
          error={!!errors?.project_name}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Project Name"
          name="project_name"

        />

        <TextField
          {...register("item_design", {
            required: "This field is required",
          })}
          error={!!errors?.item_design}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Item Design"
          name="item_design"

        />

        <TextField
          {...register("tentative_qty", {
            required: "This field is required",
          })}
          error={!!errors?.tentative_qty}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Tentative Quantity"
          name="tentative_qty"

        />

        <TextField
          {...register("from", {
            required: "This field is required",
          })}
          error={!!errors?.from}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="date"
          label="From"
          name="from"

        />

        <TextField
          {...register("to", {
            required: "This field is required",
          })}
          error={!!errors?.to}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="date"
          label="To"
          name="to"

        />

        <TextField
          {...register("rates", {
            required: "This field is required",
          })}
          error={!!errors?.rates}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Rates"
          name="rates"

        />

        <TextField
          {...register("approved_by", {
            required: "This field is required",
          })}
          error={!!errors?.approved_by}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Approved By"
          name="approved_by"

        />

        <TextField
          {...register("contractor", {
            required: "This field is required",
          })}
          error={!!errors?.contractor}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Contractor"
          name="contractor"

        />
      </Box>
    </Create>
  );
}
