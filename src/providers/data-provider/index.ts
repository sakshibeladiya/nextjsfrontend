// @ts-nocheck
"use client";

import dataProviderSimpleRest from "./../../datapr/";
import axios from "axios";
export var API_URL = ''
export var photos = ''
// UAT
// http://152.53.111.150:8092/
if (process.env.NODE_ENV === 'production') {
    API_URL = "http://195.35.22.220:8080/api";
    photos = "http://195.35.22.220:8080/assets/uploads/";
} else {
    // API_URL = "http://195.35.22.220:8080/api";
    API_URL = "http://localhost:8080/api";
    photos = "http://195.35.22.220:8080//assets/uploads/";
}



// const API_URL = "https://api.fake-rest.refine.dev";

const dataProvider = dataProviderSimpleRest(API_URL);


export const myDataProvider = {
    ...dataProvider,



};
