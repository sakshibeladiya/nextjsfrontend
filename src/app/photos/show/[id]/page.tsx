"use client";

import { decrypt } from "@app/enc";
import { Button, Typography, styled } from "@mui/material";
import { useForm, useNotification, useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { useCookies } from 'next-client-cookies';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { photos, API_URL } from "@providers/data-provider";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { useParams } from "next/navigation";
// import { DropzoneArea } from 'material-ui-dropzone';
const fileTypes = ["JPG", "PNG", "GIF"];
export default function CategoryShow() {
  const cookieStore = useCookies();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState([]);
  const { id } = useParams()
  const { open: o, close } = useNotification();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const { isLoading: uploding, onChange } = useFileUploadState();
  const token = decrypt(cookieStore.get("token") ?? '');
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const { queryResult } = useShow({
    metaData: {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }
  });
  // @ts-ignore
  const handleChange = async (files: []) => {
    console.log(files);

    o?.({
      type: "progress",
      message: "Please wait uploading",
      undoableTimeout: 20,

    });
    const form = new FormData();
    for (let file of files) {
      form.append('file', file);
    }
    form.append('parent_dir', id.toString());
    form.append('name', 'none');

    const options = {
      method: 'POST',
      url: `${API_URL}edpl/photos/`,
      headers: {
        'content-type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`,
      },
      data: form
    };

    try {
      const { data } = await axios.request(options);
      o?.({
        type: "success",
        message: "Success",
        description: "Uploaded",
      });
      setOpen(false)
    } catch (error) {
      console.error(error);
      setOpen(false)
    }
    setFile(file);
  };
  const deleteimg = async (id: any) => {
    // console.log(files);

    o?.({
      type: "progress",
      message: "Please wait Deleting",
      undoableTimeout: 3,

    });


    const options = {
      method: 'DELETE',
      url: `${API_URL}edpl/photos/${id}`,
      headers: {
        'content-type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`,
      },

    };

    try {
      const { data } = await axios.request(options);
      o?.({
        type: "error",
        message: "Success",
        description: "Deleted !",
      });
      setOpen(false)
    } catch (error) {
      console.error(error);
      setOpen(false)
    }
    setFile(file);
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const { data, isLoading } = queryResult;
  const record = data?.data;



  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Image
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            // const email = formJson.email;

            handleClose();
          },
        }}
      >
        <DialogTitle>Upload Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Multiple Photos can be uploaded .
          </DialogContentText>
          <FileUploader handleChange={handleChange} multiple={true} name="file" types={fileTypes} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>

      <Show isLoading={isLoading}>

        {isLoading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          <ImageList sx={{ width: '100%', height: '100%' }} cols={5} rowHeight={164}>
            <ImageListItem key="Subheader"  >
            </ImageListItem>
            {record && record.map((item: any) => (
              <ImageListItem style={{
                width: "200px",
                height: "200px"
              }} key={item.name}>
                <img
                  srcSet={`${photos}${item.file_name}`}
                  src={`${photos}${item.file_name}`}
                  alt={item.name}

                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain"
                  }}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.name}
                  actionIcon={
                    <IconButton
                      onClick={() => { deleteimg(item._id) }}
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.name}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Show>
    </>
  );
}

