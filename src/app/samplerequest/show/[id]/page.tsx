"use client";

import { decrypt } from "@app/enc";
import { Button, Stack, Typography } from "@mui/material";
import { useSelect, useShow, useUpdate } from "@refinedev/core";
import { DateField, Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { useCookies } from 'next-client-cookies';
export default function CategoryShow() {
  const cookieStore = useCookies();
  const token = decrypt(cookieStore.get("token") ?? '');
  const { queryResult, setShowId } = useShow({
    meta: {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    },
  });
  // setShowId(id);
  const { data, isLoading } = queryResult;

  const record = data?.data;
  const { mutate } = useUpdate();

  const {
    options,
    queryResult: { isLoading: l, data: n },
  } = useSelect({

    resource: "edpl/company",
    optionValue: (item) => item._id,
    optionLabel: (item) => item.name,
    meta: {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    },
    hasPagination: false,
  });

  function updatesent() {
    // console.log(data?.data.sentsample);

    mutate({
      resource: "edpl/sample_requests",
      id: data?.data?._id,
      values: {
        sentsample: data?.data.sentsample === true ? false : true,
      },
      meta: {
        method: "put",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      },
    });
  }


  return (






    <Show isLoading={isLoading} headerButtons={({ defaultButtons }) => (
      <>
        {defaultButtons}
        <Button onClick={updatesent} variant="contained">Mark As {data?.data.sentsample === true ? 'UnSent' : 'Sent'}</Button>
      </>
    )}>
      <Stack gap={1}>
        {/* <Typography variant="body1" fontWeight="bold">
          ID
        </Typography>
        <TextField value={record?._id || ''} /> */}

        <Typography variant="body1" fontWeight="bold">
          Company Name
        </Typography>
        <TextField value={
          isLoading ? "Loading..." : options.find(
            (item) => {
              // console.log(item);
              return record?.company_name === item.value
            },
          )?.label
        } />

        <Typography variant="body1" fontWeight="bold">
          Type
        </Typography>
        <TextField value={record?.type || ''} />

        {record?.type === 'Sample' && (
          <>
            <Typography variant="body1" fontWeight="bold">
              Sample Category
            </Typography>
            <TextField value={record?.data?.sample_category || ''} />

            {record?.data?.sample_category === 'Veneer' && (
              <>
                <Typography variant="body1" fontWeight="bold">
                  Veneer Selection
                </Typography>
                <TextField value={record?.data?.veneer_selection || ''} />
              </>
            )}

            {record?.data?.sample_category === 'Laminate' && (
              <>
                <Typography variant="body1" fontWeight="bold">
                  Laminate Selection
                </Typography>
                <TextField value={record?.data?.laminate_selection || ''} />
              </>
            )}

            <Typography variant="body1" fontWeight="bold">
              Remark
            </Typography>
            <TextField value={record?.data?.remark || ''} />
          </>
        )}

        {record?.type === 'Catalogue' && (
          <>
            <Typography variant="body1" fontWeight="bold">
              Catalogue Selection
            </Typography>
            <TextField value={record?.data?.catalogue_selection || ''} />
          </>
        )}

        <Typography variant="body1" fontWeight="bold">
          Requested On
        </Typography>
        <DateField format="D/M/YYYY" value={record?.createdAt} />
        {/* <TextField value={record?.createdAt || ''} /> */}

        {/* <Typography variant="body1" fontWeight="bold">
          Updated At
        </Typography>
        <TextField value={record?.updatedAt || ''} /> */}
        <Typography variant="body1" fontWeight="bold">
          Sample Request sent ? {record?.sentsample === true ? 'Yes' : 'No'}
        </Typography>
      </Stack>
    </Show>

  );
}
