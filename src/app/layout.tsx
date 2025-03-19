
import { CssBaseline, GlobalStyles, ThemeProvider, createTheme } from "@mui/material";
import { DevtoolsProvider } from "@providers/devtools";
import { CanAccess, GitHubBanner, Refine, ResourceProps } from "@refinedev/core";
import { useGetIdentity } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { RefineSnackbarProvider, ThemedTitleV2, notificationProvider } from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { decrypt } from "./enc"
import { ColorModeContextProvider } from "@contexts/color-mode";
import { authProvider } from "@providers/auth-provider";
import { myDataProvider } from "@providers/data-provider";
import { CookiesProvider } from 'next-client-cookies/server';

export const metadata: Metadata = {
  title: "EDPL",
  description: "EDPL SALES DASHBOARD",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const roles = cookieStore.get("date") != null ? decrypt(cookieStore.get("date")?.value ?? '') : [];
  const defaultMode = theme?.value === "dark" ? "dark" : "light";
  var isAdmin = roles.includes("admin");




  var routes: ResourceProps[] = [
    {
      name: "edpl/aproval_menu",
      list: "/approvedProjects",
      create: "/approvedProjects/create",
      edit: "/approvedProjects/edit/:id",
      show: "/approvedProjects/show/:id",
      meta: {
        label: 'Projects',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-folders"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
          <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
        </svg>

      },
    },
    {
      name: "Settings",
      key: "Settings",
      meta: {
        label: 'Settings',
        canDelete: false,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-settings"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        </svg>
      },
    },
    {
      name: "auth/sales_team",
      list: "/salesPerson",
      create: "/salesPerson/create",
      edit: "/salesPerson/edit/:id",
      show: "/salesPerson/show/:id",
      meta: {
        parent: 'Settings',
        label: 'Users',
        canDelete: true,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
      },
    },

    {
      name: "edpl/company",
      list: "/companies",
      create: "/companies/create",
      edit: "/companies/edit/:id",
      show: "/companies/show/:id",
      meta: {

        label: 'Companies',
        canDelete: true,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-factory-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21h18" /><path d="M5 21v-12l5 4v-4l5 4h4" /><path d="M19 21v-8l-1.436 -9.574a.5 .5 0 0 0 -.495 -.426h-1.145a.5 .5 0 0 0 -.494 .418l-1.43 8.582" /><path d="M9 17h1" /><path d="M14 17h1" /></svg>
      },
    },
    {
      name: "edpl/statecity",
      list: "/statecity",
      // create: "/statecity/create",
      edit: "/statecity/edit/:id",
      // show: "/statecity/show/:id",
      meta: {
        parent: 'Settings',
        label: 'State City Menu' ,
        canDelete: true,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-factory-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21h18" /><path d="M5 21v-12l5 4v-4l5 4h4" /><path d="M19 21v-8l-1.436 -9.574a.5 .5 0 0 0 -.495 -.426h-1.145a.5 .5 0 0 0 -.494 .418l-1.43 8.582" /><path d="M9 17h1" /><path d="M14 17h1" /></svg>
      },
    },
    {
      name: "edpl/catalogue",
      list: "/catalogue",
      create: "/catalogue/create",
      edit: "/catalogue/edit/:id",
      show: "/catalogue/show/:id",
      meta: {
        parent: 'Settings',
        label: 'Catalogue',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-category-2"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 4h6v6h-6z" />
          <path d="M4 14h6v6h-6z" />
          <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        </svg>
      },

    },
    {
      name: "History",
      key: "History",
      meta: {
        label: 'History Menu',
        parent: 'Settings',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-file-time"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          <path d="M12 14m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M12 12.496v1.504l1 1" />
        </svg>

      },
    },
    {
      name: "edpl/customer_history",
      list: "/customerHistory",
      create: "/customerHistory/create",
      edit: "/customerHistory/edit/:id",
      show: "/customerHistory/show/:id",
      meta: {
        parent: "History",
        label: 'Customer History Menu',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-user"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>

      },

    },
    {
      name: "edpl/customer_history_euro",
      list: "/customerHistoryEuro",
      create: "/customerHistoryEuro/create",
      edit: "/customerHistoryEuro/edit/:id",
      show: "/customerHistoryEuro/show/:id",
      meta: {
        parent: "History",
        label: 'Customer History with Euro ',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-user"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>

      },

    },


    // customer type 
    {
      name: "Customer",
      key: "Customer",
      meta: {
        parent: 'Settings',
        label: 'Customer Setting',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-users"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
        </svg>


      },
    },
    {
      name: "edpl/customer_grade",
      list: "/customerGrade",
      create: "/customerGrade/create",
      edit: "/customerGrade/edit/:id",
      show: "/customerGrade/show/:id",
      meta: {
        parent: "Customer",
        label: 'Customer Grades',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-letter-a-small"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 16v-6a2 2 0 1 1 4 0v6" />
          <path d="M10 13h4" />
        </svg>


      },

    },
    {
      name: "edpl/customer_type",
      list: "/customerType",
      create: "/customerType/create",
      edit: "/customerType/edit/:id",
      show: "/customerType/show/:id",
      meta: {
        parent: "Customer",
        label: 'Customer Type',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-stackshare"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M19 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M5 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M7 12h3l3.5 6h3.5" />
          <path d="M17 6h-3.5l-3.5 6" />
        </svg>



      },

    },
    {
      name: 'Sample Data',
      key: 'Sample Data',
      meta: {
        parent: "Settings"
      }
    },
    {
      name: "edpl/laminate",
      list: "/laminate",
      create: "/laminate/create",
      edit: "/laminate/edit/:id",
      show: "/laminate/show/:id",
      meta: {
        parent: "Sample Data",
        label: 'Laminate',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-databricks"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 17l9 5l9 -5v-3l-9 5l-9 -5v-3l9 5l9 -5v-3l-9 5l-9 -5l9 -5l5.418 3.01" />
        </svg>
      },

    },
    {
      name: "edpl/veneer",
      list: "/veneer",
      create: "/veneer/create",
      edit: "/veneer/edit/:id",
      show: "/veneer/show/:id",
      meta: {
        parent: "Sample Data",
        label: 'Veneer',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-databricks"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 17l9 5l9 -5v-3l-9 5l-9 -5v-3l9 5l9 -5v-3l-9 5l-9 -5l9 -5l5.418 3.01" />
        </svg>
      },

    },


    {
      name: "edpl/sales",
      list: "/salesrecords",
      create: "/salesrecords/create",
      edit: "/salesrecords/edit/:id",
      show: "/salesrecords/show/:id",
      meta: {
        // parent: "Sample Data",
        label: 'Daily Sales',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-report-money"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
          <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
          <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
          <path d="M12 17v1m0 -8v1" />
        </svg>

      },

    },
    //  {
    //   name: "edpl/dispatch",
    //   list: "/dispatchrecords",
    //   create: "/dispatchrecords/create",
    //   edit: "/dispatchrecords/edit/:id",
    //   show: "/dispatchrecords/show/:id",
    //   meta: {
    //     // parent: "Sample Data",
    //     label: 'Daily Dispatches',
    //     canDelete: true,
    //     icon: <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width={24}
    //       height={24}
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth={2}
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className="icon icon-tabler icons-tabler-outline icon-tabler-truck"
    //     >
    //       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //       <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    //       <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    //       <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
    //     </svg>


    //   },

    // },
    //  {
    //   name: "edpl/dispatch",
    //   list: "/dispatchrecords",
    //   create: "/dispatchrecords/create",
    //   edit: "/dispatchrecords/edit/:id",
    //   show: "/dispatchrecords/show/:id",
    //   meta: {
    //     // parent: "Sample Data",
    //     label: 'Daily Dispatches',
    //     canDelete: true,
    //     icon: <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width={24}
    //       height={24}
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth={2}
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className="icon icon-tabler icons-tabler-outline icon-tabler-truck"
    //     >
    //       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //       <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    //       <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    //       <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
    //     </svg>


    //   },

    // }, 
    {

      name: "edpl/collection_data",
      list: "/dailycollection",
      create: "/dailycollection/create",
      edit: "/dailycollection/edit/:id",
      show: "/dailycollection/show/:id",
      meta: {
        // parent: "Sample Data",
        label: 'Daily Collection',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-moneybag"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9.5 3h5a1.5 1.5 0 0 1 1.5 1.5a3.5 3.5 0 0 1 -3.5 3.5h-1a3.5 3.5 0 0 1 -3.5 -3.5a1.5 1.5 0 0 1 1.5 -1.5z" />
          <path d="M4 17v-1a8 8 0 1 1 16 0v1a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
        </svg>


      },

    },
    {

      name: "edpl/daily_visit",
      list: "/dailyvisits",
      create: "/dailyvisits/create",
      edit: "/dailyvisits/edit/:id",
      show: "/dailyvisits/show/:id",
      meta: {
        // parent: "Sample Data",
        label: 'Daily Visits',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-door"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 12v.01" />
          <path d="M3 21h18" />
          <path d="M6 21v-16a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v16" />
        </svg>

      },

    },
    {

      name: "edpl/sample_requests/single",
      // list: "/samplerequest",
      meta: {
        // parent: "Sample Data",
        label: 'Sample Requests',
      },
      // create: "/samplerequest/create",
      // edit: "/samplerequest/edit/:id",
      show: "/samplerequest/show/:id",
    },
    {

      name: "edpl/sample_requests",
      list: "/samplerequest",
      // create: "/samplerequest/create",
      // edit: "/samplerequest/edit/:id",
      show: "/samplerequest/show/:id",
      meta: {
        // parent: "Sample Data",
        label: 'Sample Request',
        canDelete: true,
        icon: <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-git-pull-request"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M6 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M18 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M6 8l0 8" />
          <path d="M11 6h5a2 2 0 0 1 2 2v8" />
          <path d="M14 9l-3 -3l3 -3" />
        </svg>


      },

    },
    {
      name: "edpl/photos",
      show: "/photos/show/:id",
      meta: {
        label: "Photos",
        hide: true,
      }

    },
    // {
    //   name: "edpl/photos_directory",
    //   list: "/photos",
    //   create: "/photos/create",
    //   show: "/photos/show/:id",
    //   edit: "/photos/edit/:id",

    //   meta: {
    //     // parent: "Sample Data",
    //     label: 'Photos Directory',
    //     canDelete: true,
    //     icon: <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width={24}
    //       height={24}
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth={2}
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className="icon icon-tabler icons-tabler-outline icon-tabler-album"
    //     >
    //       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //       <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
    //       <path d="M12 4v7l2 -2l2 2v-7" />
    //     </svg>


    //   },

    // },
  ];

  var rbac = [
    {
      "name": "admin",
      "access": ["auth/sales_team", "edpl/company"]
    },
    {
      "name": "sales",
      "access": [

        "edpl/aproval_menu",
        "edpl/company",
        "edpl/dispatch",
        "edpl/sales",
        "edpl/collection_data",
        "edpl/daily_visit"

      ],
    }
  ];

  var view_routes = [] as ResourceProps[];

  for (let route of routes) {
    if (isAdmin) {
      view_routes.push(route as ResourceProps); // Admin has access to all routes
    } else {
      for (let role of rbac) {
        if (role.name === 'sales' && role.access.includes(route.name)) {
          view_routes.push(route as ResourceProps); // User has access to routes based on their role
          break; // Exit the loop once access is confirmed for the role
        }
      }
    }
  }

  return (
    <html lang="en">
      <body>

        <Suspense>
          <CookiesProvider>
            <RefineKbarProvider>
              <ColorModeContextProvider defaultMode="light">
                <RefineSnackbarProvider>
                  <DevtoolsProvider>

                    <Refine

                      routerProvider={routerProvider}
                      dataProvider={myDataProvider}
                      notificationProvider={notificationProvider}
                      authProvider={authProvider}
                      resources={view_routes}
                      options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        useNewQueryKeys: true,
                        projectId: "3g2iEo-jT1hkH-ftrZrt",
                      }}
                    >
                      <CanAccess>
                        {children}
                      </CanAccess>
                      <RefineKbar />
                    </Refine>

                  </DevtoolsProvider>
                </RefineSnackbarProvider>
              </ColorModeContextProvider>
            </RefineKbarProvider>
          </CookiesProvider>
        </Suspense>

      </body>
    </html>
  );
}
