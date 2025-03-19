"use client";

import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput, Typography, Divider, FormControlLabel } from "@mui/material";
import { useOne } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { decrypt } from "@app/enc"
import { useCookies } from 'next-client-cookies';
import { DatePicker } from '@mui/x-date-pickers'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { nlNL } from "@mui/material/locale";
import { Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
var statecity = `{
  "Andaman and Nicobar Islands": [
    "Port Blair"
  ],
  "Haryana": [
    "Faridabad",
    "Gurgaon",
    "Hisar",
    "Rohtak",
    "Panipat",
    "Karnal",
    "Sonipat",
    "Yamunanagar",
    "Panchkula",
    "Bhiwani",
    "Bahadurgarh",
    "Jind",
    "Sirsa",
    "Thanesar",
    "Kaithal",
    "Palwal",
    "Rewari",
    "Hansi",
    "Narnaul",
    "Fatehabad",
    "Gohana",
    "Tohana",
    "Narwana",
    "Mandi Dabwali",
    "Charkhi Dadri",
    "Shahbad",
    "Pehowa",
    "Samalkha",
    "Pinjore",
    "Ladwa",
    "Sohna",
    "Safidon",
    "Taraori",
    "Mahendragarh",
    "Ratia",
    "Rania",
    "Sarsod"
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Tiruppur",
    "Ranipet",
    "Nagercoil",
    "Thanjavur",
    "Vellore",
    "Kancheepuram",
    "Erode",
    "Tiruvannamalai",
    "Pollachi",
    "Rajapalayam",
    "Sivakasi",
    "Pudukkottai",
    "Neyveli (TS)",
    "Nagapattinam",
    "Viluppuram",
    "Tiruchengode",
    "Vaniyambadi",
    "Theni Allinagaram",
    "Udhagamandalam",
    "Aruppukkottai",
    "Paramakudi",
    "Arakkonam",
    "Virudhachalam",
    "Srivilliputhur",
    "Tindivanam",
    "Virudhunagar",
    "Karur",
    "Valparai",
    "Sankarankovil",
    "Tenkasi",
    "Palani",
    "Pattukkottai",
    "Tirupathur",
    "Ramanathapuram",
    "Udumalaipettai",
    "Gobichettipalayam",
    "Thiruvarur",
    "Thiruvallur",
    "Panruti",
    "Namakkal",
    "Thirumangalam",
    "Vikramasingapuram",
    "Nellikuppam",
    "Rasipuram",
    "Tiruttani",
    "Nandivaram-Guduvancheri",
    "Periyakulam",
    "Pernampattu",
    "Vellakoil",
    "Sivaganga",
    "Vadalur",
    "Rameshwaram",
    "Tiruvethipuram",
    "Perambalur",
    "Usilampatti",
    "Vedaranyam",
    "Sathyamangalam",
    "Puliyankudi",
    "Nanjikottai",
    "Thuraiyur",
    "Sirkali",
    "Tiruchendur",
    "Periyasemur",
    "Sattur",
    "Vandavasi",
    "Tharamangalam",
    "Tirukkoyilur",
    "Oddanchatram",
    "Palladam",
    "Vadakkuvalliyur",
    "Tirukalukundram",
    "Uthamapalayam",
    "Surandai",
    "Sankari",
    "Shenkottai",
    "Vadipatti",
    "Sholingur",
    "Tirupathur",
    "Manachanallur",
    "Viswanatham",
    "Polur",
    "Panagudi",
    "Uthiramerur",
    "Thiruthuraipoondi",
    "Pallapatti",
    "Ponneri",
    "Lalgudi",
    "Natham",
    "Unnamalaikadai",
    "P.N.Patti",
    "Tharangambadi",
    "Tittakudi",
    "Pacode",
    "O' Valley",
    "Suriyampalayam",
    "Sholavandan",
    "Thammampatti",
    "Namagiripettai",
    "Peravurani",
    "Parangipettai",
    "Pudupattinam",
    "Pallikonda",
    "Sivagiri",
    "Punjaipugalur",
    "Padmanabhapuram",
    "Thirupuvanam"
  ],
  "Madhya Pradesh": [
    "Indore",
    "Bhopal",
    "Jabalpur",
    "Gwalior",
    "Ujjain",
    "Sagar",
    "Ratlam",
    "Satna",
    "Murwara (Katni)",
    "Morena",
    "Singrauli",
    "Rewa",
    "Vidisha",
    "Ganjbasoda",
    "Shivpuri",
    "Mandsaur",
    "Neemuch",
    "Nagda",
    "Itarsi",
    "Sarni",
    "Sehore",
    "Mhow Cantonment",
    "Seoni",
    "Balaghat",
    "Ashok Nagar",
    "Tikamgarh",
    "Shahdol",
    "Pithampur",
    "Alirajpur",
    "Mandla",
    "Sheopur",
    "Shajapur",
    "Panna",
    "Raghogarh-Vijaypur",
    "Sendhwa",
    "Sidhi",
    "Pipariya",
    "Shujalpur",
    "Sironj",
    "Pandhurna",
    "Nowgong",
    "Mandideep",
    "Sihora",
    "Raisen",
    "Lahar",
    "Maihar",
    "Sanawad",
    "Sabalgarh",
    "Umaria",
    "Porsa",
    "Narsinghgarh",
    "Malaj Khand",
    "Sarangpur",
    "Mundi",
    "Nepanagar",
    "Pasan",
    "Mahidpur",
    "Seoni-Malwa",
    "Rehli",
    "Manawar",
    "Rahatgarh",
    "Panagar",
    "Wara Seoni",
    "Tarana",
    "Sausar",
    "Rajgarh",
    "Niwari",
    "Mauganj",
    "Manasa",
    "Nainpur",
    "Prithvipur",
    "Sohagpur",
    "Nowrozabad (Khodargama)",
    "Shamgarh",
    "Maharajpur",
    "Multai",
    "Pali",
    "Pachore",
    "Rau",
    "Mhowgaon",
    "Vijaypur",
    "Narsinghgarh"
  ],
  "Jharkhand": [
    "Dhanbad",
    "Ranchi",
    "Jamshedpur",
    "Bokaro Steel City",
    "Deoghar",
    "Phusro",
    "Adityapur",
    "Hazaribag",
    "Giridih",
    "Ramgarh",
    "Jhumri Tilaiya",
    "Saunda",
    "Sahibganj",
    "Medininagar (Daltonganj)",
    "Chaibasa",
    "Chatra",
    "Gumia",
    "Dumka",
    "Madhupur",
    "Chirkunda",
    "Pakaur",
    "Simdega",
    "Musabani",
    "Mihijam",
    "Patratu",
    "Lohardaga",
    "Tenu dam-cum-Kathhara"
  ],
  "Mizoram": [
    "Aizawl",
    "Lunglei",
    "Saiha"
  ],
  "Nagaland": [
    "Dimapur",
    "Kohima",
    "Zunheboto",
    "Tuensang",
    "Wokha",
    "Mokokchung"
  ],
  "Himachal Pradesh": [
    "Shimla",
    "Mandi",
    "Solan",
    "Nahan",
    "Sundarnagar",
    "Palampur",
    "Kullu"
  ],
  "Tripura": [
    "Agartala",
    "Udaipur",
    "Dharmanagar",
    "Pratapgarh",
    "Kailasahar",
    "Belonia",
    "Khowai"
  ],
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Rajahmundry",
    "Kakinada",
    "Tirupati",
    "Anantapur",
    "Kadapa",
    "Vizianagaram",
    "Eluru",
    "Ongole",
    "Nandyal",
    "Machilipatnam",
    "Adoni",
    "Tenali",
    "Chittoor",
    "Hindupur",
    "Proddatur",
    "Bhimavaram",
    "Madanapalle",
    "Guntakal",
    "Dharmavaram",
    "Gudivada",
    "Srikakulam",
    "Narasaraopet",
    "Rajampet",
    "Tadpatri",
    "Tadepalligudem",
    "Chilakaluripet",
    "Yemmiganur",
    "Kadiri",
    "Chirala",
    "Anakapalle",
    "Kavali",
    "Palacole",
    "Sullurpeta",
    "Tanuku",
    "Rayachoti",
    "Srikalahasti",
    "Bapatla",
    "Naidupet",
    "Nagari",
    "Gudur",
    "Vinukonda",
    "Narasapuram",
    "Nuzvid",
    "Markapur",
    "Ponnur",
    "Kandukur",
    "Bobbili",
    "Rayadurg",
    "Samalkot",
    "Jaggaiahpet",
    "Tuni",
    "Amalapuram",
    "Bheemunipatnam",
    "Venkatagiri",
    "Sattenapalle",
    "Pithapuram",
    "Palasa Kasibugga",
    "Parvathipuram",
    "Macherla",
    "Gooty",
    "Salur",
    "Mandapeta",
    "Jammalamadugu",
    "Peddapuram",
    "Punganur",
    "Nidadavole",
    "Repalle",
    "Ramachandrapuram",
    "Kovvur",
    "Tiruvuru",
    "Uravakonda",
    "Narsipatnam",
    "Yerraguntla",
    "Pedana",
    "Puttur",
    "Renigunta",
    "Rajam",
    "Srisailam Project (Right Flank Colony) Township"
  ],
  "Punjab": [
    "Ludhiana",
    "Patiala",
    "Amritsar",
    "Jalandhar",
    "Bathinda",
    "Pathankot",
    "Hoshiarpur",
    "Batala",
    "Moga",
    "Malerkotla",
    "Khanna",
    "Mohali",
    "Barnala",
    "Firozpur",
    "Phagwara",
    "Kapurthala",
    "Zirakpur",
    "Kot Kapura",
    "Faridkot",
    "Muktsar",
    "Rajpura",
    "Sangrur",
    "Fazilka",
    "Gurdaspur",
    "Kharar",
    "Gobindgarh",
    "Mansa",
    "Malout",
    "Nabha",
    "Tarn Taran",
    "Jagraon",
    "Sunam",
    "Dhuri",
    "Firozpur Cantt.",
    "Sirhind Fatehgarh Sahib",
    "Rupnagar",
    "Jalandhar Cantt.",
    "Samana",
    "Nawanshahr",
    "Rampura Phul",
    "Nangal",
    "Nakodar",
    "Zira",
    "Patti",
    "Raikot",
    "Longowal",
    "Urmar Tanda",
    "Morinda, India",
    "Phillaur",
    "Pattran",
    "Qadian",
    "Sujanpur",
    "Mukerian",
    "Talwara"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
  "Rajasthan": [
    "Jaipur",
    "Jodhpur",
    "Bikaner",
    "Udaipur",
    "Ajmer",
    "Bhilwara",
    "Alwar",
    "Bharatpur",
    "Pali",
    "Barmer",
    "Sikar",
    "Tonk",
    "Sadulpur",
    "Sawai Madhopur",
    "Nagaur",
    "Makrana",
    "Sujangarh",
    "Sardarshahar",
    "Ladnu",
    "Ratangarh",
    "Nokha",
    "Nimbahera",
    "Suratgarh",
    "Rajsamand",
    "Lachhmangarh",
    "Rajgarh (Churu)",
    "Nasirabad",
    "Nohar",
    "Phalodi",
    "Nathdwara",
    "Pilani",
    "Merta City",
    "Sojat",
    "Neem-Ka-Thana",
    "Sirohi",
    "Pratapgarh",
    "Rawatbhata",
    "Sangaria",
    "Lalsot",
    "Pilibanga",
    "Pipar City",
    "Taranagar",
    "Vijainagar, Ajmer",
    "Sumerpur",
    "Sagwara",
    "Ramganj Mandi",
    "Lakheri",
    "Udaipurwati",
    "Losal",
    "Sri Madhopur",
    "Ramngarh",
    "Rawatsar",
    "Rajakhera",
    "Shahpura",
    "Shahpura",
    "Raisinghnagar",
    "Malpura",
    "Nadbai",
    "Sanchore",
    "Nagar",
    "Rajgarh (Alwar)",
    "Sheoganj",
    "Sadri",
    "Todaraisingh",
    "Todabhim",
    "Reengus",
    "Rajaldesar",
    "Sadulshahar",
    "Sambhar",
    "Prantij",
    "Mount Abu",
    "Mangrol",
    "Phulera",
    "Mandawa",
    "Pindwara",
    "Mandalgarh",
    "Takhatgarh"
  ],
  "Assam": [
    "Guwahati",
    "Silchar",
    "Dibrugarh",
    "Nagaon",
    "Tinsukia",
    "Jorhat",
    "Bongaigaon City",
    "Dhubri",
    "Diphu",
    "North Lakhimpur",
    "Tezpur",
    "Karimganj",
    "Sibsagar",
    "Goalpara",
    "Barpeta",
    "Lanka",
    "Lumding",
    "Mankachar",
    "Nalbari",
    "Rangia",
    "Margherita",
    "Mangaldoi",
    "Silapathar",
    "Mariani",
    "Marigaon"
  ],
  "Odisha": [
    "Bhubaneswar",
    "Cuttack",
    "Raurkela",
    "Brahmapur",
    "Sambalpur",
    "Puri",
    "Baleshwar Town",
    "Baripada Town",
    "Bhadrak",
    "Balangir",
    "Jharsuguda",
    "Bargarh",
    "Paradip",
    "Bhawanipatna",
    "Dhenkanal",
    "Barbil",
    "Kendujhar",
    "Sunabeda",
    "Rayagada",
    "Jatani",
    "Byasanagar",
    "Kendrapara",
    "Rajagangapur",
    "Parlakhemundi",
    "Talcher",
    "Sundargarh",
    "Phulabani",
    "Pattamundai",
    "Titlagarh",
    "Nabarangapur",
    "Soro",
    "Malkangiri",
    "Rairangpur",
    "Tarbha"
  ],
  "Chhattisgarh": [
    "Raipur",
    "Bhilai Nagar",
    "Korba",
    "Bilaspur",
    "Durg",
    "Rajnandgaon",
    "Jagdalpur",
    "Raigarh",
    "Ambikapur",
    "Mahasamund",
    "Dhamtari",
    "Chirmiri",
    "Bhatapara",
    "Dalli-Rajhara",
    "Naila Janjgir",
    "Tilda Newra",
    "Mungeli",
    "Manendragarh",
    "Sakti"
  ],
  "Jammu and Kashmir": [
    "Srinagar",
    "Jammu",
    "Baramula",
    "Anantnag",
    "Sopore",
    "KathUrban Agglomeration",
    "Rajauri",
    "Punch",
    "Udhampur"
  ],
  "Karnataka": [
    "Bengaluru",
    "Hubli-Dharwad",
    "Belagavi",
    "Mangaluru",
    "Davanagere",
    "Ballari",
    "Mysore",
    "Tumkur",
    "Shivamogga",
    "Raayachuru",
    "Robertson Pet",
    "Kolar",
    "Mandya",
    "Udupi",
    "Chikkamagaluru",
    "Karwar",
    "Ranebennuru",
    "Ranibennur",
    "Ramanagaram",
    "Gokak",
    "Yadgir",
    "Rabkavi Banhatti",
    "Shahabad",
    "Sirsi",
    "Sindhnur",
    "Tiptur",
    "Arsikere",
    "Nanjangud",
    "Sagara",
    "Sira",
    "Puttur",
    "Athni",
    "Mulbagal",
    "Surapura",
    "Siruguppa",
    "Mudhol",
    "Sidlaghatta",
    "Shahpur",
    "Saundatti-Yellamma",
    "Wadi",
    "Manvi",
    "Nelamangala",
    "Lakshmeshwar",
    "Ramdurg",
    "Nargund",
    "Tarikere",
    "Malavalli",
    "Savanur",
    "Lingsugur",
    "Vijayapura",
    "Sankeshwara",
    "Madikeri",
    "Talikota",
    "Sedam",
    "Shikaripur",
    "Mahalingapura",
    "Mudalagi",
    "Muddebihal",
    "Pavagada",
    "Malur",
    "Sindhagi",
    "Sanduru",
    "Afzalpur",
    "Maddur",
    "Madhugiri",
    "Tekkalakote",
    "Terdal",
    "Mudabidri",
    "Magadi",
    "Navalgund",
    "Shiggaon",
    "Shrirangapattana",
    "Sindagi",
    "Sakaleshapura",
    "Srinivaspur",
    "Ron",
    "Mundargi",
    "Sadalagi",
    "Piriyapatna",
    "Adyar"
  ],
  "Manipur": [
    "Imphal",
    "Thoubal",
    "Lilong",
    "Mayang Imphal"
  ],
  "Kerala": [
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Kollam",
    "Thrissur",
    "Palakkad",
    "Alappuzha",
    "Malappuram",
    "Ponnani",
    "Vatakara",
    "Kanhangad",
    "Taliparamba",
    "Koyilandy",
    "Neyyattinkara",
    "Kayamkulam",
    "Nedumangad",
    "Kannur",
    "Tirur",
    "Kottayam",
    "Kasaragod",
    "Kunnamkulam",
    "Ottappalam",
    "Thiruvalla",
    "Thodupuzha",
    "Chalakudy",
    "Changanassery",
    "Punalur",
    "Nilambur",
    "Cherthala",
    "Perinthalmanna",
    "Mattannur",
    "Shoranur",
    "Varkala",
    "Paravoor",
    "Pathanamthitta",
    "Peringathur",
    "Attingal",
    "Kodungallur",
    "Pappinisseri",
    "Chittur-Thathamangalam",
    "Muvattupuzha",
    "Adoor",
    "Mavelikkara",
    "Mavoor",
    "Perumbavoor",
    "Vaikom",
    "Palai",
    "Panniyannur",
    "Guruvayoor",
    "Puthuppally",
    "Panamattom"
  ],
  "Delhi": [
    "Delhi",
    "New Delhi"
  ],
  "Dadra and Nagar Haveli": [
    "Silvassa"
  ],
  "Puducherry": [
    "Pondicherry",
    "Karaikal",
    "Yanam",
    "Mahe"
  ],
  "Uttarakhand": [
    "Dehradun",
    "Hardwar",
    "Haldwani-cum-Kathgodam",
    "Srinagar",
    "Kashipur",
    "Roorkee",
    "Rudrapur",
    "Rishikesh",
    "Ramnagar",
    "Pithoragarh",
    "Manglaur",
    "Nainital",
    "Mussoorie",
    "Tehri",
    "Pauri",
    "Nagla",
    "Sitarganj",
    "Bageshwar"
  ],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Firozabad",
    "Agra",
    "Meerut",
    "Varanasi",
    "Allahabad",
    "Amroha",
    "Moradabad",
    "Aligarh",
    "Saharanpur",
    "Noida",
    "Loni",
    "Jhansi",
    "Shahjahanpur",
    "Rampur",
    "Modinagar",
    "Hapur",
    "Etawah",
    "Sambhal",
    "Orai",
    "Bahraich",
    "Unnao",
    "Rae Bareli",
    "Lakhimpur",
    "Sitapur",
    "Lalitpur",
    "Pilibhit",
    "Chandausi",
    "Hardoi ",
    "Azamgarh",
    "Khair",
    "Sultanpur",
    "Tanda",
    "Nagina",
    "Shamli",
    "Najibabad",
    "Shikohabad",
    "Sikandrabad",
    "Shahabad, Hardoi",
    "Pilkhuwa",
    "Renukoot",
    "Vrindavan",
    "Ujhani",
    "Laharpur",
    "Tilhar",
    "Sahaswan",
    "Rath",
    "Sherkot",
    "Kalpi",
    "Tundla",
    "Sandila",
    "Nanpara",
    "Sardhana",
    "Nehtaur",
    "Seohara",
    "Padrauna",
    "Mathura",
    "Thakurdwara",
    "Nawabganj",
    "Siana",
    "Noorpur",
    "Sikandra Rao",
    "Puranpur",
    "Rudauli",
    "Thana Bhawan",
    "Palia Kalan",
    "Zaidpur",
    "Nautanwa",
    "Zamania",
    "Shikarpur, Bulandshahr",
    "Naugawan Sadat",
    "Fatehpur Sikri",
    "Shahabad, Rampur",
    "Robertsganj",
    "Utraula",
    "Sadabad",
    "Rasra",
    "Lar",
    "Lal Gopalganj Nindaura",
    "Sirsaganj",
    "Pihani",
    "Shamsabad, Agra",
    "Rudrapur",
    "Soron",
    "SUrban Agglomerationr",
    "Samdhan",
    "Sahjanwa",
    "Rampur Maniharan",
    "Sumerpur",
    "Shahganj",
    "Tulsipur",
    "Tirwaganj",
    "PurqUrban Agglomerationzi",
    "Shamsabad, Farrukhabad",
    "Warhapur",
    "Powayan",
    "Sandi",
    "Achhnera",
    "Naraura",
    "Nakur",
    "Sahaspur",
    "Safipur",
    "Reoti",
    "Sikanderpur",
    "Saidpur",
    "Sirsi",
    "Purwa",
    "Parasi",
    "Lalganj",
    "Phulpur",
    "Shishgarh",
    "Sahawar",
    "Samthar",
    "Pukhrayan",
    "Obra",
    "Niwai",
    "Mirzapur"
  ],
  "Bihar": [
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Darbhanga",
    "Arrah",
    "Begusarai",
    "Chhapra",
    "Katihar",
    "Munger",
    "Purnia",
    "Saharsa",
    "Sasaram",
    "Hajipur",
    "Dehri-on-Sone",
    "Bettiah",
    "Motihari",
    "Bagaha",
    "Siwan",
    "Kishanganj",
    "Jamalpur",
    "Buxar",
    "Jehanabad",
    "Aurangabad",
    "Lakhisarai",
    "Nawada",
    "Jamui",
    "Sitamarhi",
    "Araria",
    "Gopalganj",
    "Madhubani",
    "Masaurhi",
    "Samastipur",
    "Mokameh",
    "Supaul",
    "Dumraon",
    "Arwal",
    "Forbesganj",
    "BhabUrban Agglomeration",
    "Narkatiaganj",
    "Naugachhia",
    "Madhepura",
    "Sheikhpura",
    "Sultanganj",
    "Raxaul Bazar",
    "Ramnagar",
    "Mahnar Bazar",
    "Warisaliganj",
    "Revelganj",
    "Rajgir",
    "Sonepur",
    "Sherghati",
    "Sugauli",
    "Makhdumpur",
    "Maner",
    "Rosera",
    "Nokha",
    "Piro",
    "Rafiganj",
    "Marhaura",
    "Mirganj",
    "Lalganj",
    "Murliganj",
    "Motipur",
    "Manihari",
    "Sheohar",
    "Maharajganj",
    "Silao",
    "Barh",
    "Asarganj"
  ],
  "Gujarat": [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Nadiad",
    "Porbandar",
    "Anand",
    "Morvi",
    "Mahesana",
    "Bharuch",
    "Vapi",
    "Navsari",
    "Veraval",
    "Bhuj",
    "Godhra",
    "Palanpur",
    "Valsad",
    "Patan",
    "Deesa",
    "Amreli",
    "Anjar",
    "Dhoraji",
    "Khambhat",
    "Mahuva",
    "Keshod",
    "Wadhwan",
    "Ankleshwar",
    "Savarkundla",
    "Kadi",
    "Visnagar",
    "Upleta",
    "Una",
    "Sidhpur",
    "Unjha",
    "Mangrol",
    "Viramgam",
    "Modasa",
    "Palitana",
    "Petlad",
    "Kapadvanj",
    "Sihor",
    "Wankaner",
    "Limbdi",
    "Mandvi",
    "Thangadh",
    "Vyara",
    "Padra",
    "Lunawada",
    "Rajpipla",
    "Vapi",
    "Umreth",
    "Sanand",
    "Rajula",
    "Radhanpur",
    "Mahemdabad",
    "Ranavav",
    "Tharad",
    "Mansa",
    "Umbergaon",
    "Talaja",
    "Vadnagar",
    "Manavadar",
    "Salaya",
    "Vijapur",
    "Pardi",
    "Rapar",
    "Songadh",
    "Lathi",
    "Adalaj",
    "Chhapra",
    "Gandhinagar"
  ],
  "Telangana": [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Ramagundam",
    "Khammam",
    "Mahbubnagar",
    "Mancherial",
    "Adilabad",
    "Suryapet",
    "Jagtial",
    "Miryalaguda",
    "Nirmal",
    "Kamareddy",
    "Kothagudem",
    "Bodhan",
    "Palwancha",
    "Mandamarri",
    "Koratla",
    "Sircilla",
    "Tandur",
    "Siddipet",
    "Wanaparthy",
    "Kagaznagar",
    "Gadwal",
    "Sangareddy",
    "Bellampalle",
    "Bhongir",
    "Vikarabad",
    "Jangaon",
    "Bhadrachalam",
    "Bhainsa",
    "Farooqnagar",
    "Medak",
    "Narayanpet",
    "Sadasivpet",
    "Yellandu",
    "Manuguru",
    "Kyathampalle",
    "Nagarkurnool"
  ],
  "Meghalaya": [
    "Shillong",
    "Tura",
    "Nongstoin"
  ],
  "Himachal Praddesh": [
    "Manali"
  ],
  "Arunachal Pradesh": [
    "Naharlagun",
    "Pasighat"
  ],
  "Maharashtra": [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Kalyan-Dombivali",
    "Vasai-Virar",
    "Solapur",
    "Mira-Bhayandar",
    "Bhiwandi",
    "Amravati",
    "Nanded-Waghala",
    "Sangli",
    "Malegaon",
    "Akola",
    "Latur",
    "Dhule",
    "Ahmednagar",
    "Ichalkaranji",
    "Parbhani",
    "Panvel",
    "Yavatmal",
    "Achalpur",
    "Osmanabad",
    "Nandurbar",
    "Satara",
    "Wardha",
    "Udgir",
    "Aurangabad",
    "Amalner",
    "Akot",
    "Pandharpur",
    "Shrirampur",
    "Parli",
    "Washim",
    "Ambejogai",
    "Manmad",
    "Ratnagiri",
    "Uran Islampur",
    "Pusad",
    "Sangamner",
    "Shirpur-Warwade",
    "Malkapur",
    "Wani",
    "Lonavla",
    "Talegaon Dabhade",
    "Anjangaon",
    "Umred",
    "Palghar",
    "Shegaon",
    "Ozar",
    "Phaltan",
    "Yevla",
    "Shahade",
    "Vita",
    "Umarkhed",
    "Warora",
    "Pachora",
    "Tumsar",
    "Manjlegaon",
    "Sillod",
    "Arvi",
    "Nandura",
    "Vaijapur",
    "Wadgaon Road",
    "Sailu",
    "Murtijapur",
    "Tasgaon",
    "Mehkar",
    "Yawal",
    "Pulgaon",
    "Nilanga",
    "Wai",
    "Umarga",
    "Paithan",
    "Rahuri",
    "Nawapur",
    "Tuljapur",
    "Morshi",
    "Purna",
    "Satana",
    "Pathri",
    "Sinnar",
    "Uchgaon",
    "Uran",
    "Pen",
    "Karjat",
    "Manwath",
    "Partur",
    "Sangole",
    "Mangrulpir",
    "Risod",
    "Shirur",
    "Savner",
    "Sasvad",
    "Pandharkaoda",
    "Talode",
    "Shrigonda",
    "Shirdi",
    "Raver",
    "Mukhed",
    "Rajura",
    "Vadgaon Kasba",
    "Tirora",
    "Mahad",
    "Lonar",
    "Sawantwadi",
    "Pathardi",
    "Pauni",
    "Ramtek",
    "Mul",
    "Soyagaon",
    "Mangalvedhe",
    "Narkhed",
    "Shendurjana",
    "Patur",
    "Mhaswad",
    "Loha",
    "Nandgaon",
    "Warud"
  ],
  "Goa": [
    "Marmagao",
    "Panaji",
    "Margao",
    "Mapusa"
  ],
  "West Bengal": [
    "Kolkata",
    "Siliguri",
    "Asansol",
    "Raghunathganj",
    "Kharagpur",
    "Naihati",
    "English Bazar",
    "Baharampur",
    "Hugli-Chinsurah",
    "Raiganj",
    "Jalpaiguri",
    "Santipur",
    "Balurghat",
    "Medinipur",
    "Habra",
    "Ranaghat",
    "Bankura",
    "Nabadwip",
    "Darjiling",
    "Purulia",
    "Arambagh",
    "Tamluk",
    "AlipurdUrban Agglomerationr",
    "Suri",
    "Jhargram",
    "Gangarampur",
    "Rampurhat",
    "Kalimpong",
    "Sainthia",
    "Taki",
    "Murshidabad",
    "Memari",
    "Paschim Punropara",
    "Tarakeswar",
    "Sonamukhi",
    "PandUrban Agglomeration",
    "Mainaguri",
    "Malda",
    "Panchla",
    "Raghunathpur",
    "Mathabhanga",
    "Monoharpur",
    "Srirampore",
    "Adra"
  ]
}`

const stateCityData = JSON.parse(statecity);
export default function CategoryEdit() {
  const cookieStore = useCookies();
  const token = decrypt(cookieStore.get("token") ?? '');
  var [loading, setLoading] = useState(true);
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

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { handleSubmit, control: c, watch: w } = useForm();

  useEffect(() => {
    // Get the list of states from the data
    // @ts-ignore
    setStates(Object.keys(stateCityData));
  }, []);

  const selectedState = watch("address.state");

  useEffect(() => {
    // Update the cities based on the selected state
    if (selectedState) {
      setCities(stateCityData[selectedState] || []);
    } else {
      setCities([]);
    }
  }, [selectedState]);
  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "edpl/customer_grade",
    metaData: {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    },
    defaultValue: n?.data?.data.customer_grade,
  });


  const { autocompleteProps: customertypeautoprops } = useAutocomplete({
    resource: "edpl/customer_type",
    metaData: {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    },
    defaultValue: n?.data?.data.customer_grade,
  });
  const { autocompleteProps: customer_historypropers } = useAutocomplete({
    resource: "edpl/customer_history",
    metaData: {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    },
    defaultValue: n?.data?.data.customer_history,
  });
  const { autocompleteProps: customer_history_europrops } = useAutocomplete({
    resource: "edpl/customer_history_euro",
    metaData: {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    },
    defaultValue: n?.data?.data.customer_history_euro,
  });
  const options = [
    { issuer: 'Bank of America', brand: 'Visa', last4: '1234' },
    { issuer: 'Bank of America', brand: 'MasterCard', last4: '5678' },
    { issuer: 'Barclays', brand: 'Visa', last4: '4698' },
    // ...
  ];


  // console.log(queryResult.data);
  return (
    // @ts-ignore
    // console.log(n?.data.first_visited)

    formLoading && loading ? <>loading...</> :
      <Edit saveButtonProps={saveButtonProps} isLoading={formLoading} title="Edit Company">

        {/* {
  "_id": "665f02636550005474da5381",
  "name": "Foxlo tech",
  "address": {
    "address1": "f",
    "address2": "w",
    "state": "Jammu and Kashmir",
    "pincode": "234534",
    "city": "Rajauri",
    "district": "ewfwe",
    "landmark": "wefwef"
  },
  "sid": "51729",
  "area_of_company": "3qw",
  "person_to_contact": [
    {
      "company_person_name": "32r234",
      "company_person_email": "y@gmail.com",
      "company_person_pno": "32423423423"
    }
  ],
  "customer_type": "Supplier",
  "customer_grade": "Unknown",
  "customer_history": "Between 1 to 5 Years",
  "mass_mailling": true,
  "diwali_gift": true,
  "ladoo_gift": true,
  "other_gift": null,
  "sample_catalouge_type": [],
  "sample_catalouge_data": [],
  "first_visited": "2024-06-04T15:31:57.291Z",
  "next_visit": "2024-07-04T15:31:57.291Z",
  "__v": 0
} */}

        <Box

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
            // @ts-ignore
            defaultValue={n?.data?.name}
          />

          <Divider style={{
            margin: "1rem",
          }} orientation="horizontal" />
          <Typography
            color="primary"
            level="title-lg"
            // @ts-ignore
            variant="plain"
          >
            Address
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >


            <TextField
              {...register("address.address1", {
                required: "This field is required",
              })}
              // @ts-ignore
              error={!!errors?.address?.address1}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Address Line 1"
              name="address.address1"
              // @ts-ignore
              defaultValue={n?.data?.address?.address1}
            />
            <TextField
              // @ts-ignore
              {...register("address.address2")}
              // @ts-ignore
              error={!!errors?.address?.address2}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Address Line 2"
              name="address.address2"
              // @ts-ignore
              defaultValue={n?.data?.address?.address2}
            />


            <Controller
              {...register("address.state", {
                required: "This field is required",
              })}
              name="address.state"
              defaultValue={n?.data?.data.address?.state}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={states}
                  getOptionLabel={(option) => option}
                  onChange={(_, data) => field.onChange(data)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select State" variant="outlined" />
                  )}
                />
              )}
            />
            <Controller
              {...register("address.city", {
                required: "This field is required",
              })}

              defaultValue={n?.data?.data.address?.city}
              name="address.city"

              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={cities}
                  getOptionLabel={(option) => option}
                  onChange={(_, data) => field.onChange(data)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select City" variant="outlined" />
                  )}
                />
              )}
            />

            {/* <TextField
              {...register("address.state", {
                required: "This field is required",
              })}
              // @ts-ignore
              error={!!errors?.address?.state}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="State"
              name="address.state"
              // @ts-ignore
              defaultValue={n?.data?.address?.state}
            /> */}
            <TextField
              {...register("address.pincode", {
                required: "This field is required",
              })}
              // @ts-ignore
              error={!!errors?.address?.pincode}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Pincode"
              name="address.pincode"
              // @ts-ignore
              defaultValue={n?.data?.address?.pincode}
            />
            {/* <TextField
              {...register("address.city", {
                required: "This field is required",
              })}
              // @ts-ignore
              error={!!errors?.address?.city}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="City"
              name="address.city"
              // @ts-ignore
              defaultValue={n?.data?.address?.city}
            /> */}
            <TextField
              {...register("address.district")}
              // @ts-ignore
              error={!!errors?.address?.district}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="District"
              name="address.district"
              // @ts-ignore
              defaultValue={n?.data?.address?.district}
            />
            <TextField
              {...register("address.landmark")}
              // @ts-ignore
              error={!!errors?.address?.landmark}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Landmark"
              name="address.landmark"
              // @ts-ignore
              defaultValue={n?.data?.address?.landmark}
            />
            <TextField
              {...register("area_of_company")}
              error={!!errors?.area_of_company}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Area of Company"
              name="area_of_company"
              // @ts-ignore
              defaultValue={n?.data?.area_of_company}
            /></Box>
          <Divider style={{
            margin: "1rem",
          }} orientation="horizontal" />
          <Typography
            color="primary"
            level="title-lg"
            // @ts-ignore
            variant="plain"
          >
            Person To Contact
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <TextField
              {...register("person_to_contact[0].company_person_name")}
              // @ts-ignore
              error={!!errors?.person_to_contact?.[0]?.company_person_name}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Person to Contact Name"
              name="person_to_contact[0].company_person_name"
              // @ts-ignore
              defaultValue={n?.data?.person_to_contact?.[0]?.company_person_name}
            />
            <TextField
              {...register("person_to_contact[0].company_person_email")}
              // @ts-ignore
              error={!!errors?.person_to_contact?.[0]?.company_person_email}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Person to Contact Email"
              name="person_to_contact[0].company_person_email"
              // @ts-ignore
              defaultValue={n?.data?.person_to_contact?.[0]?.company_person_email}
            />
            <TextField
              {...register("person_to_contact[0].company_person_pno")}
              // @ts-ignore
              error={!!errors?.person_to_contact?.[0]?.company_person_pno}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label="Person to Contact Phone Number"
              name="person_to_contact[0].company_person_pno"
              // @ts-ignore
              defaultValue={n?.data?.person_to_contact?.[0]?.company_person_pno}
            />
          </Box>



          <Divider style={{
            margin: "1rem",
          }} orientation="horizontal" />
          <Typography
            color="primary"
            level="title-lg"
            // @ts-ignore
            variant="plain"
          >
            Address
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >

            <Controller
              {...register("customer_grade")}
              control={control}
              name={'customer_grade'}
              rules={{ required: "This field is required" }}
              // eslint-disable-next-line
              defaultValue={null as any}
              render={({ field }) => (
                <Autocomplete
                  {...register("customer_grade")}
                  {...categoryAutocompleteProps}
                  defaultValue={n?.data?.data?.customer_grade}
                  onChange={(_, value) => {
                    console.log(value.title);

                    field.onChange(value.title);
                  }}
                  getOptionLabel={(item) => {
                    console.log(categoryAutocompleteProps?.options)
                    return (
                      categoryAutocompleteProps?.options?.find((p) => {

                        const itemId =
                          typeof item === "object"
                            ? item?.title?.toString()
                            : item?.toString();
                        const pId = p?.title?.toString();
                        return itemId === pId;
                      })?.title ?? ""
                    );
                  }}
                  isOptionEqualToValue={
                    (option, value) => {
                      const optionId = option?.title?.toString();
                      const valueId =
                        typeof value === "object"
                          ? value?.title?.toString()
                          : value?.toString();
                      return value === undefined || optionId === valueId;
                    }
                  }
                  // @ts-ignore
                  placeholder="Customer Grade"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer Grad"
                      margin="normal"
                      variant="outlined"

                      required
                    />
                  )}
                />
              )} />
            <Controller
              {...register("customer_type")}
              control={control}
              name={'customer_type'}
              rules={{ required: "This field is required" }}
              // eslint-disable-next-line
              defaultValue={null as any}
              render={({ field }) => (
                <Autocomplete
                  {...register("customer_type")}
                  {...customertypeautoprops}
                  defaultValue={n?.data?.data?.customer_type}
                  onChange={(_, value) => {
                    console.log(value.title);

                    field.onChange(value.title);
                  }}
                  getOptionLabel={(item) => {
                    console.log(customertypeautoprops?.options)
                    return (
                      customertypeautoprops?.options?.find((p) => {
                        const itemId =
                          typeof item === "object"
                            ? item?.title?.toString()
                            : item?.toString();
                        const pId = p?.title?.toString();
                        return itemId === pId;
                      })?.title ?? ""
                    );
                  }}
                  isOptionEqualToValue={
                    (option, value) => {
                      const optionId = option?.title?.toString();
                      const valueId =
                        typeof value === "object"
                          ? value?.title?.toString()
                          : value?.toString();
                      return value === undefined || optionId === valueId;
                    }
                  }
                  // @ts-ignore
                  placeholder="Customer Type"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer Type"
                      margin="normal"
                      variant="outlined"

                      required
                    />
                  )}
                />
              )} />
            <Controller
              {...register("customer_history")}
              control={control}
              name={'customer_history'}
              rules={{ required: "This field is required" }}
              // eslint-disable-next-line
              defaultValue={null as any}
              render={({ field }) => (
                <Autocomplete
                  {...register("customer_history")}
                  {...customer_historypropers}
                  defaultValue={n?.data?.data?.customer_history}
                  onChange={(_, value) => {
                    console.log(value.title);

                    field.onChange(value.title);
                  }}
                  getOptionLabel={(item) => {
                    console.log(customer_historypropers?.options)
                    return (
                      customer_historypropers?.options?.find((p) => {
                        const itemId =
                          typeof item === "object"
                            ? item?.title?.toString()
                            : item?.toString();
                        const pId = p?.title?.toString();
                        return itemId === pId;
                      })?.title ?? ""
                    );
                  }}
                  isOptionEqualToValue={
                    (option, value) => {
                      const optionId = option?.title?.toString();
                      const valueId =
                        typeof value === "object"
                          ? value?.title?.toString()
                          : value?.toString();
                      return value === undefined || optionId === valueId;
                    }
                  }
                  // @ts-ignore
                  placeholder="Customer History"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer History"
                      margin="normal"
                      variant="outlined"

                      required
                    />
                  )}
                />
              )} />
            <Controller
              {...register("customer_history_with_euro")}
              control={control}
              name={'customer_history_with_euro'}
              rules={{ required: "This field is required" }}
              // eslint-disable-next-line
              defaultValue={null as any}
              render={({ field }) => (
                <Autocomplete
                  {...register("customer_history_with_euro")}
                  {...customer_history_europrops}
                  defaultValue={n?.data?.data?.customer_history_with_euro}
                  onChange={(_, value) => {
                    console.log(value.title);

                    field.onChange(value.title);
                  }}
                  getOptionLabel={(item) => {

                    return (
                      customer_history_europrops?.options?.find((p) => {
                        const itemId =
                          typeof item === "object"
                            ? item?.title?.toString()
                            : item?.toString();
                        const pId = p?.title?.toString();
                        return itemId === pId;
                      })?.title ?? ""
                    );
                  }}
                  isOptionEqualToValue={
                    (option, value) => {
                      const optionId = option?.title?.toString();
                      const valueId =
                        typeof value === "object"
                          ? value?.title?.toString()
                          : value?.toString();
                      return value === undefined || optionId === valueId;
                    }
                  }
                  // @ts-ignore
                  placeholder="Customer History with Euro"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer History with Euro"
                      margin="normal"
                      variant="outlined"

                      required
                    />
                  )}
                />
              )} />

          </Box>
          <Divider style={{
            margin: "1rem",
          }} orientation="horizontal" />
          <Typography
            color="primary"
            level="title-lg"
            // @ts-ignore
            variant="plain"
          >
            Others
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >

            <FormControlLabel
              {...register("mass_mailling")}

              control={<Checkbox
                {...register("mass_mailling")}
                color="primary"
                label="Mass Mailing"
                defaultChecked={n?.data?.data.mass_mailling}
                // @ts-ignore
                size="md"
                variant="soft"
              />}
              label="Mass Mailing"
              labelPlacement="end"
            />
            <FormControlLabel
              {...register("diwali_gift")}
              control={<Checkbox
                {...register("diwali_gift")}
                color="primary"
                label="Diwali Gift"
                defaultChecked={n?.data?.data.diwali_gift}
                // @ts-ignore
                size="md"
                variant="soft"
              />}
              label="Diwali Gift"
              labelPlacement="end" />

            <FormControlLabel
              {...register("ladoo_gift")}
              control={<Checkbox
                {...register("ladoo_gift")}
                color="primary"
                label="Ladoo Gift"
                defaultChecked={n?.data?.data.ladoo_gift}
                // @ts-ignore
                size="md"
                variant="soft"
              />}
              label="Ladoo Gift"
              labelPlacement="end"
            />
            <FormControlLabel
              {...register("other_gift")}
              control={<Checkbox
                {...register("other_gift")}
                color="primary"
                label="Other Gift"
                defaultChecked={n?.data?.data.other_gift}
                // @ts-ignore
                size="md"
                variant="soft"
              />}
              label="Other Gift"
              labelPlacement="end"
            />




          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField
              {...register("first_visited")}
              // @ts-ignore
              renderInput={(params) => <TextField {...params} />}
              label="First Visited"
              name="first_visited"
            // @ts-ignore

            // @ts-ignore

            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} >

            <TextField
              {...register("next_visit")}


              // @ts-ignore
              renderInput={(params) => <TextField {...params} />}
              label="Next Visit"
              name="next_visit"
              // @ts-ignore


              // @ts-ignore
              onChange={(date) => setValue("next_visit", date)}
            />
          </LocalizationProvider>








        </Box>
      </Edit>
  );
}
