import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { triggerAnalyticsEvent } from "../types";
import { 
  X, Calendar, Check, Video, ArrowRight, Sparkles, Clock, Globe, 
  Building, Target, MessageSquare, ChevronLeft, ChevronRight, Link2,
  User, Mail
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRY_TIMEZONES: Record<string, string[]> = {
  "Afghanistan": ["Asia/Kabul (UTC+04:30)"],
  "Albania": ["Europe/Tirane (UTC+01:00 / CET)"],
  "Algeria": ["Africa/Algiers (UTC+01:00 / CET)"],
  "Andorra": ["Europe/Andorra (UTC+01:00 / CET)"],
  "Angola": ["Africa/Luanda (UTC+01:00 / WAT)"],
  "Antigua and Barbuda": ["America/Antigua (UTC-04:00)"],
  "Argentina": ["America/Argentina/Buenos_Aires (UTC-03:00)"],
  "Armenia": ["Asia/Yerevan (UTC+04:00)"],
  "Australia": [
    "Australia/Sydney (UTC+10:00 / AEST)",
    "Australia/Adelaide (UTC+09:30 / ACST)",
    "Australia/Perth (UTC+08:00 / AWST)",
    "Australia/Darwin (UTC+09:30 / ACST)"
  ],
  "Austria": ["Europe/Vienna (UTC+01:00 / CET)"],
  "Azerbaijan": ["Asia/Baku (UTC+04:00)"],
  "Bahamas": ["America/Nassau (UTC-05:00 / EST)"],
  "Bahrain": ["Asia/Bahrain (UTC+03:00 / AST)"],
  "Bangladesh": ["Asia/Dhaka (UTC+06:00 / BST)"],
  "Barbados": ["America/Barbados (UTC-04:00 / AST)"],
  "Belarus": ["Europe/Minsk (UTC+03:00 / MSK)"],
  "Belgium": ["Europe/Brussels (UTC+01:00 / CET)"],
  "Belize": ["America/Belize (UTC-06:00 / CST)"],
  "Benin": ["Africa/Porto-Novo (UTC+01:00 / WAT)"],
  "Bhutan": ["Asia/Thimphu (UTC+06:00 / BTT)"],
  "Bolivia": ["America/La_Paz (UTC-04:00)"],
  "Bosnia and Herzegovina": ["Europe/Sarajevo (UTC+01:00 / CET)"],
  "Botswana": ["Africa/Gaborone (UTC+02:00 / CAT)"],
  "Brazil": [
    "America/Sao_Paulo (UTC-03:00 / BRT)",
    "America/Manaus (UTC-04:00 / AMT)",
    "America/Rio_Branco (UTC-05:00 / ACT)",
    "America/Noronha (UTC-02:00 / FNT)"
  ],
  "Brunei": ["Asia/Brunei (UTC+08:00)"],
  "Bulgaria": ["Europe/Sofia (UTC+02:00 / EET)"],
  "Burkina Faso": ["Africa/Ouagadougou (UTC+00:00 / GMT)"],
  "Burundi": ["Africa/Bujumbura (UTC+02:00 / CAT)"],
  "Cabo Verde": ["Atlantic/Cape_Verde (UTC-01:00)"],
  "Cambodia": ["Asia/Phnom_Penh (UTC+07:00)"],
  "Cameroon": ["Africa/Douala (UTC+01:00 / WAT)"],
  "Canada": [
    "America/Toronto (UTC-05:00 / EST)",
    "America/Halifax (UTC-04:00 / AST)",
    "America/Winnipeg (UTC-06:00 / CST)",
    "America/Edmonton (UTC-07:00 / MST)",
    "America/Vancouver (UTC-08:00 / PST)",
    "America/St_Johns (UTC-03:30 / NST)"
  ],
  "Central African Republic": ["Africa/Bangui (UTC+01:00 / WAT)"],
  "Chad": ["Africa/Ndjamena (UTC+01:00 / WAT)"],
  "Chile": [
    "America/Santiago (UTC-04:00)",
    "Pacific/Easter (UTC-06:00)"
  ],
  "China": ["Asia/Shanghai (UTC+08:00 / CST)"],
  "Colombia": ["America/Bogota (UTC-05:00 / COT)"],
  "Comoros": ["Indian/Comoro (UTC+03:00 / EAT)"],
  "Congo (Congo-Brazzaville)": ["Africa/Brazzaville (UTC+01:00 / WAT)"],
  "Costa Rica": ["America/Costa_Rica (UTC-06:00 / CST)"],
  "Croatia": ["Europe/Zagreb (UTC+01:00 / CET)"],
  "Cuba": ["America/Havana (UTC-05:00)"],
  "Cyprus": ["Asia/Nicosia (UTC+02:00 / EET)"],
  "Czech Republic": ["Europe/Prague (UTC+01:00 / CET)"],
  "Democratic Republic of the Congo": [
    "Africa/Kinshasa (UTC+01:00 / WAT)",
    "Africa/Lubumbashi (UTC+02:00 / CAT)"
  ],
  "Denmark": ["Europe/Copenhagen (UTC+01:00 / CET)"],
  "Djibouti": ["Africa/Djibouti (UTC+03:00 / EAT)"],
  "Dominica": ["America/Dominica (UTC-04:00 / AST)"],
  "Dominican Republic": ["America/Santo_Domingo (UTC-04:00 / AST)"],
  "Ecuador": [
    "America/Guayaquil (UTC-05:00)",
    "Pacific/Galapagos (UTC-06:00)"
  ],
  "Egypt": ["Africa/Cairo (UTC+02:00 / EET)"],
  "El Salvador": ["America/El_Salvador (UTC-06:00 / CST)"],
  "Equatorial Guinea": ["Africa/Malabo (UTC+01:00 / WAT)"],
  "Eritrea": ["Africa/Asmara (UTC+03:00 / EAT)"],
  "Estonia": ["Europe/Tallinn (UTC+02:00 / EET)"],
  "Eswatini": ["Africa/Mbabane (UTC+02:00 / SAST)"],
  "Ethiopia": ["Africa/Addis_Ababa (UTC+03:00 / EAT)"],
  "Fiji": ["Pacific/Fiji (UTC+12:00)"],
  "Finland": ["Europe/Helsinki (UTC+02:00 / EET)"],
  "France": ["Europe/Paris (UTC+01:00 / CET)"],
  "Gabon": ["Africa/Libreville (UTC+01:00 / WAT)"],
  "Gambia": ["Africa/Banjul (UTC+00:00 / GMT)"],
  "Georgia": ["Asia/Tbilisi (UTC+04:00)"],
  "Germany": ["Europe/Berlin (UTC+01:00 / CET)"],
  "Ghana": ["Africa/Accra (UTC+00:00 / GMT)"],
  "Greece": ["Europe/Athens (UTC+02:00 / EET)"],
  "Grenada": ["America/Grenada (UTC-04:00 / AST)"],
  "Guatemala": ["America/Guatemala (UTC-06:00 / CST)"],
  "Guinea": ["Africa/Conakry (UTC+00:00 / GMT)"],
  "Guinea-Bissau": ["Africa/Bissau (UTC+00:00 / GMT)"],
  "Guyana": ["America/Guyana (UTC-04:00)"],
  "Haiti": ["America/Port-au-Prince (UTC-05:00)"],
  "Honduras": ["America/Tegucigalpa (UTC-06:00 / CST)"],
  "Hong Kong": ["Asia/Hong_Kong (UTC+08:00 / HKT)"],
  "Hungary": ["Europe/Budapest (UTC+01:00 / CET)"],
  "Iceland": ["Atlantic/Reykjavik (UTC+00:00 / GMT)"],
  "India": ["Asia/Kolkata (UTC+05:30 / IST)"],
  "Indonesia": [
    "Asia/Jakarta (UTC+07:00 / WIB)",
    "Asia/Makassar (UTC+08:00 / WITA)",
    "Asia/Jayapura (UTC+09:00 / WIT)"
  ],
  "Iran": ["Asia/Tehran (UTC+03:30 / IRST)"],
  "Iraq": ["Asia/Baghdad (UTC+03:00 / AST)"],
  "Ireland": ["Europe/Dublin (UTC+00:00 / GMT)"],
  "Israel": ["Asia/Jerusalem (UTC+02:00 / IST)"],
  "Italy": ["Europe/Rome (UTC+01:00 / CET)"],
  "Jamaica": ["America/Jamaica (UTC-05:00 / EST)"],
  "Japan": ["Asia/Tokyo (UTC+09:00 / JST)"],
  "Jordan": ["Asia/Amman (UTC+03:00 / AST)"],
  "Kazakhstan": ["Asia/Almaty (UTC+05:00)"],
  "Kenya": ["Africa/Nairobi (UTC+03:00 / EAT)"],
  "Kiribati": [
    "Pacific/Tarawa (UTC+12:00)",
    "Pacific/Kanton (UTC+13:00)",
    "Pacific/Kiritimati (UTC+14:00)"
  ],
  "Kuwait": ["Asia/Kuwait (UTC+03:00 / AST)"],
  "Kyrgyzstan": ["Asia/Bishkek (UTC+06:00)"],
  "Laos": ["Asia/Vientiane (UTC+07:00)"],
  "Latvia": ["Europe/Riga (UTC+02:00 / EET)"],
  "Lebanon": ["Asia/Beirut (UTC+02:00 / EET)"],
  "Lesotho": ["Africa/Maseru (UTC+02:00 / SAST)"],
  "Liberia": ["Africa/Monrovia (UTC+00:00 / GMT)"],
  "Libya": ["Africa/Tripoli (UTC+02:00 / EET)"],
  "Liechtenstein": ["Europe/Vaduz (UTC+01:00 / CET)"],
  "Lithuania": ["Europe/Vilnius (UTC+02:00 / EET)"],
  "Luxembourg": ["Europe/Luxembourg (UTC+01:00 / CET)"],
  "Madagascar": ["Africa/Antananarivo (UTC+03:00 / EAT)"],
  "Malawi": ["Africa/Blantyre (UTC+02:00 / CAT)"],
  "Malaysia": ["Asia/Kuala_Lumpur (UTC+08:00 / MYT)"],
  "Maldives": ["Indian/Maldives (UTC+05:00)"],
  "Mali": ["Africa/Bamako (UTC+00:00 / GMT)"],
  "Malta": ["Europe/Malta (UTC+01:00 / CET)"],
  "Marshall Islands": ["Pacific/Majuro (UTC+12:00)"],
  "Mauritania": ["Africa/Nouakchott (UTC+00:00 / GMT)"],
  "Mauritius": ["Indian/Mauritius (UTC+04:00)"],
  "Mexico": [
    "America/Mexico_City (UTC-06:00 / CST)",
    "America/Chihuahua (UTC-06:00 / MST)",
    "America/Tijuana (UTC-08:00 / PST)"
  ],
  "Micronesia": [
    "Pacific/Chuuk (UTC+10:00)",
    "Pacific/Pohnpei (UTC+11:00)",
    "Pacific/Kosrae (UTC+11:00)"
  ],
  "Moldova": ["Europe/Chisinau (UTC+02:00 / EET)"],
  "Monaco": ["Europe/Monaco (UTC+01:00 / CET)"],
  "Mongolia": [
    "Asia/Ulaanbaatar (UTC+08:00)",
    "Asia/Hovd (UTC+07:00)"
  ],
  "Montenegro": ["Europe/Podgorica (UTC+01:00 / CET)"],
  "Morocco": ["Africa/Casablanca (UTC+01:00 / WEST)"],
  "Mozambique": ["Africa/Maputo (UTC+02:00 / CAT)"],
  "Myanmar": ["Asia/Yangon (UTC+06:30)"],
  "Namibia": ["Africa/Windhoek (UTC+02:00 / CAT)"],
  "Nauru": ["Pacific/Nauru (UTC+12:00)"],
  "Nepal": ["Asia/Kathmandu (UTC+05:45 / NPT)"],
  "Netherlands": ["Europe/Amsterdam (UTC+01:00 / CET)"],
  "New Zealand": [
    "Pacific/Auckland (UTC+12:00 / NZST)",
    "Pacific/Chatham (UTC+12:45)"
  ],
  "Nicaragua": ["America/Managua (UTC-06:00 / CST)"],
  "Niger": ["Africa/Niamey (UTC+01:00 / WAT)"],
  "Nigeria": ["Africa/Lagos (UTC+01:00 / WAT)"],
  "North Korea": ["Asia/Pyongyang (UTC+09:00 / KST)"],
  "North Macedonia": ["Europe/Skopye (UTC+01:00 / CET)"],
  "Norway": ["Europe/Oslo (UTC+01:00 / CET)"],
  "Oman": ["Asia/Muscat (UTC+04:00)"],
  "Pakistan": ["Asia/Karachi (UTC+05:00 / PKT)"],
  "Palau": ["Pacific/Palau (UTC+09:00)"],
  "Palestine": [
    "Asia/Gaza (UTC+02:00 / EET)",
    "Asia/Hebron (UTC+02:00 / EET)"
  ],
  "Panama": ["America/Panama (UTC-05:00 / EST)"],
  "Papua New Guinea": [
    "Pacific/Port_Moresby (UTC+10:00)",
    "Pacific/Bougainville (UTC+11:00)"
  ],
  "Paraguay": ["America/Asuncion (UTC-04:00)"],
  "Peru": ["America/Lima (UTC-05:00 / PET)"],
  "Philippines": ["Asia/Manila (UTC+08:00 / PHT)"],
  "Poland": ["Europe/Warsaw (UTC+01:00 / CET)"],
  "Portugal": [
    "Europe/Lisbon (UTC+00:00 / WET)",
    "Atlantic/Azores (UTC-01:00 / AZOT)"
  ],
  "Qatar": ["Asia/Qatar (UTC+03:00 / AST)"],
  "Romania": ["Europe/Bucharest (UTC+02:00 / EET)"],
  "Russia": [
    "Europe/Moscow (UTC+03:00 / MSK)",
    "Asia/Yekaterinburg (UTC+05:00)",
    "Asia/Novosibirsk (UTC+07:00)",
    "Asia/Irkutsk (UTC+08:00)",
    "Asia/Yakutsk (UTC+09:00)",
    "Asia/Vladivostok (UTC+10:00)",
    "Asia/Magadan (UTC+11:00)",
    "Asia/Kamchatka (UTC+12:00)"
  ],
  "Rwanda": ["Africa/Kigali (UTC+02:00 / CAT)"],
  "Saint Kitts and Nevis": ["America/St_Kitts (UTC-04:00)"],
  "Saint Lucia": ["America/St_Lucia (UTC-04:00)"],
  "Saint Vincent and the Grenadines": ["America/St_Vincent (UTC-04:00)"],
  "Samoa": ["Pacific/Apia (UTC+13:00)"],
  "San Marino": ["Europe/San_Marino (UTC+01:00 / CET)"],
  "Sao Tome and Principe": ["Africa/Sao_Tome (UTC+00:00 / GMT)"],
  "Saudi Arabia": ["Asia/Riyadh (UTC+03:00 / AST)"],
  "Senegal": ["Africa/Dakar (UTC+00:00 / GMT)"],
  "Serbia": ["Europe/Belgrade (UTC+01:00 / CET)"],
  "Seychelles": ["Indian/Mahe (UTC+04:00)"],
  "Sierra Leone": ["Africa/Freetown (UTC+00:00 / GMT)"],
  "Singapore": ["Asia/Singapore (UTC+08:00 / SGT)"],
  "Slovakia": ["Europe/Bratislava (UTC+01:00 / CET)"],
  "Slovenia": ["Europe/Ljubljana (UTC+01:00 / CET)"],
  "Solomon Islands": ["Pacific/Guadalcanal (UTC+11:00)"],
  "Somalia": ["Africa/Mogadishu (UTC+03:00 / EAT)"],
  "South Africa": ["Africa/Johannesburg (UTC+02:00 / SAST)"],
  "South Korea": ["Asia/Seoul (UTC+09:00 / KST)"],
  "South Sudan": ["Africa/Juba (UTC+02:00 / CAT)"],
  "Spain": [
    "Europe/Madrid (UTC+01:00 / CET)",
    "Atlantic/Canary (UTC+00:00 / WET)"
  ],
  "Sri Lanka": ["Asia/Colombo (UTC+05:30 / IST)"],
  "Sudan": ["Africa/Khartoum (UTC+02:00 / CAT)"],
  "Suriname": ["America/Paramaribo (UTC-03:00)"],
  "Sweden": ["Europe/Stockholm (UTC+01:00 / CET)"],
  "Switzerland": ["Europe/Zurich (UTC+01:00 / CET)"],
  "Syria": ["Asia/Damascus (UTC+03:00)"],
  "Taiwan": ["Asia/Taipei (UTC+08:00 / CST)"],
  "Tajikistan": ["Asia/Dushanbe (UTC+05:00)"],
  "Tanzania": ["Africa/Dar_es_Salaam (UTC+03:00 / EAT)"],
  "Thailand": ["Asia/Bangkok (UTC+07:00 / ICT)"],
  "Timor-Leste": ["Asia/Dili (UTC+09:00)"],
  "Togo": ["Africa/Lome (UTC+00:00 / GMT)"],
  "Tonga": ["Pacific/Tongatapu (UTC+13:00)"],
  "Trinidad and Tobago": ["America/Port_of_Spain (UTC-04:00 / AST)"],
  "Tunisia": ["Africa/Tunis (UTC+01:00 / CET)"],
  "Turkey": ["Europe/Istanbul (UTC+03:00 / TRT)"],
  "Turkmenistan": ["Asia/Ashgabat (UTC+05:00)"],
  "Tuvalu": ["Pacific/Funafuti (UTC+12:00)"],
  "Uganda": ["Africa/Kampala (UTC+03:00 / EAT)"],
  "Ukraine": ["Europe/Kyiv (UTC+02:00 / EET)"],
  "United Arab Emirates": ["Asia/Dubai (UTC+04:00 / GST)"],
  "United Kingdom": ["Europe/London (UTC+00:00 / GMT)"],
  "United States": [
    "America/New_York (UTC-05:00 / EST)",
    "America/Chicago (UTC-06:00 / CST)",
    "America/Denver (UTC-07:00 / MST)",
    "America/Los_Angeles (UTC-08:00 / PST)",
    "America/Anchorage (UTC-09:00 / AKST)",
    "Pacific/Honolulu (UTC-10:00 / HST)"
  ],
  "Uruguay": ["America/Montevideo (UTC-03:00 / UYT)"],
  "Uzbekistan": ["Asia/Tashkent (UTC+05:00)"],
  "Vanuatu": ["Pacific/Efate (UTC+11:00)"],
  "Vatican City": ["Europe/Vatican (UTC+01:00 / CET)"],
  "Venezuela": ["America/Caracas (UTC-04:00 / VET)"],
  "Vietnam": ["Asia/Ho_Chi_Minh (UTC+07:00 / ICT)"],
  "Yemen": ["Asia/Aden (UTC+03:00 / AST)"],
  "Zambia": ["Africa/Lusaka (UTC+02:00 / CAT)"],
  "Zimbabwe": ["Africa/Harare (UTC+02:00 / CAT)"]
};

const autoDetectCountry = (): string => {
  try {
    const locale = navigator.language || "";
    if (locale.includes("-")) {
      const parts = locale.split("-");
      const region = parts[parts.length - 1].toUpperCase();
      const regionToCountry: Record<string, string> = {
        AF: "Afghanistan",
        AL: "Albania",
        DZ: "Algeria",
        AD: "Andorra",
        AO: "Angola",
        AG: "Antigua and Barbuda",
        AR: "Argentina",
        AM: "Armenia",
        AU: "Australia",
        AT: "Austria",
        AZ: "Azerbaijan",
        BS: "Bahamas",
        BH: "Bahrain",
        BD: "Bangladesh",
        BB: "Barbados",
        BY: "Belarus",
        BE: "Belgium",
        BZ: "Belize",
        BJ: "Benin",
        BT: "Bhutan",
        BO: "Bolivia",
        BA: "Bosnia and Herzegovina",
        BW: "Botswana",
        BR: "Brazil",
        BN: "Brunei",
        BG: "Bulgaria",
        BF: "Burkina Faso",
        BI: "Burundi",
        KH: "Cambodia",
        CM: "Cameroon",
        CA: "Canada",
        CF: "Central African Republic",
        TD: "Chad",
        CL: "Chile",
        CN: "China",
        CO: "Colombia",
        KM: "Comoros",
        CG: "Congo (Congo-Brazzaville)",
        CR: "Costa Rica",
        HR: "Croatia",
        CU: "Cuba",
        CY: "Cyprus",
        CZ: "Czech Republic",
        CD: "Democratic Republic of the Congo",
        DK: "Denmark",
        DJ: "Djibouti",
        DM: "Dominica",
        DO: "Dominican Republic",
        EC: "Ecuador",
        EG: "Egypt",
        SV: "El Salvador",
        GQ: "Equatorial Guinea",
        ER: "Eritrea",
        EE: "Estonia",
        SZ: "Eswatini",
        ET: "Ethiopia",
        FJ: "Fiji",
        FI: "Finland",
        FR: "France",
        GA: "Gabon",
        GM: "Gambia",
        GE: "Georgia",
        DE: "Germany",
        GH: "Ghana",
        GR: "Greece",
        GD: "Grenada",
        GT: "Guatemala",
        GN: "Guinea",
        GW: "Guinea-Bissau",
        GY: "Guyana",
        HT: "Haiti",
        HN: "Honduras",
        HK: "Hong Kong",
        HU: "Hungary",
        IS: "Iceland",
        IN: "India",
        ID: "Indonesia",
        IR: "Iran",
        IQ: "Iraq",
        IE: "Ireland",
        IL: "Israel",
        IT: "Italy",
        JM: "Jamaica",
        JP: "Japan",
        JO: "Jordan",
        KZ: "Kazakhstan",
        KE: "Kenya",
        KI: "Kiribati",
        KW: "Kuwait",
        KG: "Kyrgyzstan",
        LA: "Laos",
        LV: "Latvia",
        LB: "Lebanon",
        LS: "Lesotho",
        LR: "Liberia",
        LY: "Libya",
        LI: "Liechtenstein",
        LT: "Lithuania",
        LU: "Luxembourg",
        MG: "Madagascar",
        MW: "Malawi",
        MY: "Malaysia",
        MV: "Maldives",
        ML: "Mali",
        MT: "Malta",
        MH: "Marshall Islands",
        MR: "Mauritania",
        MU: "Mauritius",
        MX: "Mexico",
        FM: "Micronesia",
        MD: "Moldova",
        MC: "Monaco",
        MN: "Mongolia",
        ME: "Montenegro",
        MA: "Morocco",
        MZ: "Mozambique",
        MM: "Myanmar",
        NA: "Namibia",
        NR: "Nauru",
        NP: "Nepal",
        NL: "Netherlands",
        NZ: "New Zealand",
        NI: "Nicaragua",
        NE: "Niger",
        NG: "Nigeria",
        KP: "North Korea",
        MK: "North Macedonia",
        NO: "Norway",
        OM: "Oman",
        PK: "Pakistan",
        PW: "Palau",
        PS: "Palestine",
        PA: "Panama",
        PG: "Papua New Guinea",
        PY: "Paraguay",
        PE: "Peru",
        PH: "Philippines",
        PL: "Poland",
        PT: "Portugal",
        QA: "Qatar",
        RO: "Romania",
        RU: "Russia",
        RW: "Rwanda",
        KN: "Saint Kitts and Nevis",
        LC: "Saint Lucia",
        VC: "Saint Vincent and the Grenadines",
        WS: "Samoa",
        SM: "San Marino",
        ST: "Sao Tome and Principe",
        SA: "Saudi Arabia",
        SN: "Senegal",
        RS: "Serbia",
        SC: "Seychelles",
        SL: "Sierra Leone",
        SG: "Singapore",
        SK: "Slovakia",
        SI: "Slovenia",
        SB: "Solomon Islands",
        SO: "Somalia",
        ZA: "South Africa",
        KR: "South Korea",
        SS: "South Sudan",
        ES: "Spain",
        LK: "Sri Lanka",
        SD: "Sudan",
        SR: "Suriname",
        SE: "Sweden",
        CH: "Switzerland",
        SY: "Syria",
        TW: "Taiwan",
        TJ: "Tajikistan",
        TZ: "Tanzania",
        TH: "Thailand",
        TL: "Timor-Leste",
        TG: "Togo",
        TO: "Tonga",
        TT: "Trinidad and Tobago",
        TN: "Tunisia",
        TR: "Turkey",
        TM: "Turkmenistan",
        TV: "Tuvalu",
        UG: "Uganda",
        UA: "Ukraine",
        AE: "United Arab Emirates",
        GB: "United Kingdom",
        US: "United States",
        UY: "Uruguay",
        UZ: "Uzbekistan",
        VU: "Vanuatu",
        VA: "Vatican City",
        VE: "Venezuela",
        VN: "Vietnam",
        YE: "Yemen",
        ZM: "Zambia",
        ZW: "Zimbabwe"
      };
      return regionToCountry[region] || "";
    }
  } catch (e) {}
  return "";
};

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Booking Form State
  const [videoCount, setVideoCount] = useState<string>("10 videos a month");
  const [userName, setUserName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Location & Timezone (Automatic Detection, fully Optional, with dynamic listings)
  const [country, setCountry] = useState<string>(() => {
    return autoDetectCountry();
  });

  const [timezone, setTimezone] = useState<string>(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch (e) {
      return "";
    }
  });
  
  // Optional Fields
  const [whyNeeded, setWhyNeeded] = useState("");
  const [howCanHelp, setHowCanHelp] = useState("");
  const [endGoal, setEndGoal] = useState("");

  // Validation state
  const [errors, setErrors] = useState<{ 
    userName?: string; 
    userEmail?: string; 
    businessName?: string;
  }>({});

  // Scheduler States
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  // Simple Interactive July 2026 Calendar Generator
  const daysInMonth = 31;
  const startingDayOfWeek = 3; // July 1, 2026 is a Wednesday (0-indexed Sunday=0, so Wed=3)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const timeSlots = ["09:00 AM", "10:30 AM", "11:45 AM", "01:30 PM", "03:00 PM", "04:30 PM"];

  const getTimezoneOptions = (selectedCountry: string) => {
    if (selectedCountry && COUNTRY_TIMEZONES[selectedCountry]) {
      return COUNTRY_TIMEZONES[selectedCountry];
    }
    const browserTZ = (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      } catch (e) {
        return "UTC";
      }
    })();
    const defaults = [browserTZ, "UTC", "GMT", "America/New_York (EST/EDT)", "Europe/London (GMT/BST)", "Asia/Kolkata (IST)", "Asia/Dhaka (BST)"];
    return Array.from(new Set(defaults));
  };

  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
    if (selectedCountry && COUNTRY_TIMEZONES[selectedCountry]) {
      // Pick the first associated timezone
      setTimezone(COUNTRY_TIMEZONES[selectedCountry][0]);
    } else {
      try {
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
      } catch (e) {
        setTimezone("UTC");
      }
    }
  };

  const handleBookSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Validation
    const newErrors: typeof errors = {};
    if (!userName.trim()) newErrors.userName = "Name is required";
    if (!businessName.trim()) newErrors.businessName = "Business name is required";
    if (!userEmail.trim()) {
      newErrors.userEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      newErrors.userEmail = "Please enter a valid email address";
    }

    if (selectedDate && !selectedTime) {
      setApiError("You have selected a date, but you must select a time slot to complete the booking.");
      const pane = document.getElementById("scheduler-action-box");
      if (pane) pane.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll form panel to top if needed
      const formPane = document.getElementById("booking-form-pane");
      if (formPane) {
        formPane.scrollTop = 0;
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setApiError("");

    try {
      let isSuccess = false;

      // 10s Timeout for API endpoint
      const apiController = new AbortController();
      const apiTimeoutId = setTimeout(() => apiController.abort(), 10000);

      try {
        const response = await fetch("/api/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            videoCount,
            userName,
            businessName,
            userEmail,
            whyNeeded,
            howCanHelp,
            endGoal,
            selectedDate,
            selectedTime,
            country: country || "Not selected",
            timezone: timezone || "Not selected",
          }),
          signal: apiController.signal,
        });

        clearTimeout(apiTimeoutId);

        const contentType = response.headers.get("content-type");
        const isJson = contentType && contentType.includes("application/json");

        if (response.ok) {
          if (isJson) {
            const data = await response.json();
            if (data.success || data.mode) {
              isSuccess = true;
            }
          } else {
            // If 200 OK but HTML (SPA fallback in development), trigger fallback
            throw new Error("Local dev environment detected (SPA static fallback).");
          }
        } else {
          if (isJson) {
            const errData = await response.json();
            throw new Error(errData.error || `Server error ${response.status}`);
          } else {
            throw new Error(`Server returned status ${response.status}`);
          }
        }
      } catch (endpointError: any) {
        clearTimeout(apiTimeoutId);
        
        // If it was explicitly aborted by user timeout, bubble it up
        if (endpointError.name === "AbortError") {
          throw new Error("The request timed out. Please check your internet connection.");
        }

        console.warn("API Endpoint failed or is static. Falling back to direct Formspree submission:", endpointError);

        // 10s Timeout for Fallback Formspree
        const fsController = new AbortController();
        const fsTimeoutId = setTimeout(() => fsController.abort(), 10000);

        try {
          const formspreeFormId = ((import.meta as any).env?.VITE_FORMSPREE_FORM_ID as string) || "xwvdaoyn";
          const formspreeResponse = await fetch(`https://formspree.io/f/${formspreeFormId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              subject: `🚨 NEW STRATEGY LEAD (Direct Client-Side): ${userName} (${businessName})`,
              name: userName,
              email: userEmail,
              businessName: businessName,
              videoCount: videoCount,
              country: country || "Not selected",
              timezone: timezone || "Not selected",
              whyNeeded: whyNeeded || "Not selected",
              howCanHelp: howCanHelp || "Not selected",
              endGoal: endGoal || "Not selected",
              selectedDate: selectedDate ? `July ${selectedDate}, 2026` : "Flexible Call",
              selectedTime: selectedTime || "Flexible Time"
            }),
            signal: fsController.signal,
          });

          clearTimeout(fsTimeoutId);

          const fsContentType = formspreeResponse.headers.get("content-type");
          const isFsJson = fsContentType && fsContentType.includes("application/json");

          if (formspreeResponse.ok) {
            isSuccess = true;
          } else {
            if (isFsJson) {
              const fsErrorBody = await formspreeResponse.json();
              throw new Error(fsErrorBody.error || `Formspree returned status ${formspreeResponse.status}`);
            } else {
              throw new Error(`Formspree returned status ${formspreeResponse.status}`);
            }
          }
        } catch (fsError: any) {
          clearTimeout(fsTimeoutId);
          if (fsError.name === "AbortError") {
            throw new Error("Formspree submission timed out. Please verify your connection.");
          }
          throw fsError;
        }
      }

      if (isSuccess) {
        setIsBooked(true);
        triggerAnalyticsEvent(`Lead submitted successfully: ${userName} (${businessName})`, "interaction");
      } else {
        throw new Error("Unable to complete booking submission.");
      }
    } catch (err: any) {
      console.error("Booking Submission Error:", err);
      setApiError(err.message || "Something went wrong while securing your slot. Please try again.");
      triggerAnalyticsEvent(`Booking failed: ${err.message || "Unknown error"}`, "system");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setVideoCount("10 videos a month");
    setBusinessName("");
    setWhyNeeded("");
    setHowCanHelp("");
    setEndGoal("");
    setUserName("");
    setUserEmail("");
    
    // Redetect location and timezone
    try {
      setCountry(autoDetectCountry());
    } catch (e) {}

    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York");
    } catch (e) {}

    setSelectedDate(null);
    setSelectedTime(null);
    setErrors({});
    setApiError("");
    setIsBooked(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto" id="booking-modal-overlay">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md"
            id="booking-modal-backdrop"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-8 z-10 my-4 sm:my-8 max-h-[92vh] flex flex-col shadow-2xl"
            id="booking-modal-content"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-950 transition-colors p-1.5 rounded-full hover:bg-zinc-100 z-20"
              id="booking-modal-close-btn"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable Content Container */}
            <div className="overflow-y-auto pr-1 flex-1" id="booking-modal-scroll-area">
              {!isBooked ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8" id="booking-grid">
                  
                  {/* LEFT PANE: RECOMMENDED PREP BRIEF */}
                  <div className="lg:col-span-7 flex flex-col justify-between" id="booking-form-pane">
                    <div>
                      <div className="flex items-center gap-2 text-indigo-600 mb-2">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-widest font-bold font-mono">Strategy Prep Brief</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 mb-1">
                        Customize Your Session
                      </h3>
                      <p className="text-zinc-500 text-xs mb-5 leading-relaxed">
                        Please fill in the required fields. The additional business questions are <span className="font-semibold text-zinc-700">optional but highly recommended</span> so we can perform thorough research before our call!
                      </p>

                      <div className="space-y-4 text-left">
                        {/* 1. Video Count Choice */}
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-2 font-bold">
                            Required Video Volume (Recommended)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {[
                              "10 videos a month",
                              "Less than 10 videos",
                              "More than 10 videos"
                            ].map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setVideoCount(option)}
                                className={`px-3 py-2 text-xs rounded-full border text-center font-bold transition-all cursor-pointer ${
                                  videoCount === option
                                    ? "border-indigo-600 bg-indigo-50/50 text-indigo-700 shadow-sm"
                                    : "border-zinc-200 bg-zinc-50/50 text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Mandatories Separator */}
                        <div className="border-t border-zinc-100 pt-3">
                          <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                            Primary Details (Required)
                          </span>
                        </div>

                        {/* 2. Your Name */}
                        <div>
                          <label className="flex justify-between items-center text-[11px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                            <span>Your Name <span className="text-red-500">*</span></span>
                            {errors.userName && <span className="text-red-500 normal-case font-semibold">{errors.userName}</span>}
                          </label>
                          <div className="relative">
                            <User className={`absolute left-3.5 top-2.5 h-4 w-4 transition-colors ${errors.userName ? 'text-red-400' : 'text-zinc-400'}`} />
                            <input
                              type="text"
                              value={userName}
                              onChange={(e) => {
                                setUserName(e.target.value);
                                if (errors.userName) setErrors(prev => ({ ...prev, userName: undefined }));
                              }}
                              placeholder="Jane Doe"
                              className={`w-full bg-zinc-50 border rounded-full pl-10 pr-4 py-2 text-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs ${
                                errors.userName ? 'border-red-300 bg-red-50/10 focus:border-red-500' : 'border-zinc-200 focus:border-indigo-600'
                              }`}
                            />
                          </div>
                        </div>

                        {/* 3. Business Name */}
                        <div>
                          <label className="flex justify-between items-center text-[11px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                            <span>Business Name / Brand <span className="text-red-500">*</span></span>
                            {errors.businessName && <span className="text-red-500 normal-case font-semibold">{errors.businessName}</span>}
                          </label>
                          <div className="relative">
                            <Building className={`absolute left-3.5 top-2.5 h-4 w-4 transition-colors ${errors.businessName ? 'text-red-400' : 'text-zinc-400'}`} />
                            <input
                              type="text"
                              value={businessName}
                              onChange={(e) => {
                                setBusinessName(e.target.value);
                                if (errors.businessName) setErrors(prev => ({ ...prev, businessName: undefined }));
                              }}
                              placeholder="e.g. Acme Studio"
                              className={`w-full bg-zinc-50 border rounded-full pl-10 pr-4 py-2 text-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs ${
                                errors.businessName ? 'border-red-300 bg-red-50/10 focus:border-red-500' : 'border-zinc-200 focus:border-indigo-600'
                              }`}
                            />
                          </div>
                        </div>

                        {/* 4. Email Address */}
                        <div>
                          <label className="flex justify-between items-center text-[11px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                            <span>Email Address <span className="text-red-500">*</span></span>
                            {errors.userEmail && <span className="text-red-500 normal-case font-semibold">{errors.userEmail}</span>}
                          </label>
                          <div className="relative">
                            <Mail className={`absolute left-3.5 top-2.5 h-4 w-4 transition-colors ${errors.userEmail ? 'text-red-400' : 'text-zinc-400'}`} />
                            <input
                              type="email"
                              value={userEmail}
                              onChange={(e) => {
                                  setUserEmail(e.target.value);
                                  if (errors.userEmail) setErrors(prev => ({ ...prev, userEmail: undefined }));
                              }}
                              placeholder="jane@example.com"
                              className={`w-full bg-zinc-50 border rounded-full pl-10 pr-4 py-2 text-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs ${
                                errors.userEmail ? 'border-red-300 bg-red-50/10 focus:border-red-500' : 'border-zinc-200 focus:border-indigo-600'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Country & Timezone (Detected automatically, manual override, optional) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="flex justify-between items-center text-[11px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                              <span>Country <span className="text-zinc-400 font-normal lowercase">(optional)</span></span>
                            </label>
                            <div className="relative">
                              <Globe className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
                              <select
                                value={country}
                                onChange={(e) => handleCountryChange(e.target.value)}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-full pl-10 pr-8 py-2 text-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs cursor-pointer appearance-none"
                              >
                                <option value="">-- Select Country (Optional) --</option>
                                {Object.keys(COUNTRY_TIMEZONES).map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                                <option value="Other">Other / Not Listed</option>
                              </select>
                              <div className="absolute right-3.5 top-3 pointer-events-none text-zinc-400 text-[10px]">▼</div>
                            </div>
                            <span className="text-[9px] text-zinc-400 block mt-1 ml-2 font-mono font-medium">📍 {country ? "Selected / Detected" : "Optional field"}</span>
                          </div>

                          <div>
                            <label className="flex justify-between items-center text-[11px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                              <span>Timezone <span className="text-zinc-400 font-normal lowercase">(optional)</span></span>
                            </label>
                            <div className="relative">
                              <Clock className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
                              <select
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-full pl-10 pr-8 py-2 text-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs cursor-pointer appearance-none"
                              >
                                <option value="">-- Select Timezone (Optional) --</option>
                                {getTimezoneOptions(country).map((tz) => (
                                  <option key={tz} value={tz}>{tz}</option>
                                ))}
                              </select>
                              <div className="absolute right-3.5 top-3 pointer-events-none text-zinc-400 text-[10px]">▼</div>
                            </div>
                            <span className="text-[9px] text-zinc-400 block mt-1 ml-2 font-mono font-medium">🌐 {timezone ? "Active Zone" : "Optional timezone"}</span>
                          </div>
                        </div>

                        {/* Optional Separator */}
                        <div className="border-t border-zinc-100 pt-3">
                          <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">
                            Additional Research Brief (Optional)
                          </span>
                        </div>

                        {/* 5. Why do you need our service? */}
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                            Why do you need our service?
                          </label>
                          <textarea
                            value={whyNeeded}
                            onChange={(e) => setWhyNeeded(e.target.value)}
                            onInput={(e) => {
                              const target = e.currentTarget;
                              target.style.height = "auto";
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                            placeholder="What struggles or challenges are you currently facing with your videos?"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-2.5 text-zinc-950 focus:outline-none focus:border-indigo-600 transition-colors text-xs resize-none min-h-[64px] h-auto overflow-y-hidden"
                          />
                        </div>

                        {/* 6. How can we help you? */}
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                            How can we help you?
                          </label>
                          <textarea
                            value={howCanHelp}
                            onChange={(e) => setHowCanHelp(e.target.value)}
                            onInput={(e) => {
                              const target = e.currentTarget;
                              target.style.height = "auto";
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                            placeholder="Describe specific editing details, styles, or services you want us to handle..."
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-2.5 text-zinc-950 focus:outline-none focus:border-indigo-600 transition-colors text-xs resize-none min-h-[64px] h-auto overflow-y-hidden"
                          />
                        </div>

                        {/* 7. What is your expected result / end goal? */}
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                            What is your expected result / end goal?
                          </label>
                          <textarea
                            value={endGoal}
                            onChange={(e) => setEndGoal(e.target.value)}
                            onInput={(e) => {
                              const target = e.currentTarget;
                              target.style.height = "auto";
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                            placeholder="e.g. Double subscriber count, scale TikTok lead generation..."
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-2.5 text-zinc-950 focus:outline-none focus:border-indigo-600 transition-colors text-xs resize-none min-h-[64px] h-auto overflow-y-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT PANE: CALENDLY-POWERED INTEGRATION & SCHEDULER */}
                  <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-zinc-100 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between" id="booking-calendly-pane">
                    <div>
                      <div className="flex items-center gap-2 text-indigo-600 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-widest font-bold font-mono">Real-Time Booking</span>
                      </div>
                      <h4 className="font-display text-lg font-extrabold text-zinc-950 mb-1">
                        Select Date & Time
                      </h4>
                      <p className="text-zinc-500 text-xs mb-4">
                        Book instantly using our embedded scheduler, or launch our external Calendly.
                      </p>

                      {/* Integrated Calendly Scheduler */}
                      <div className="bg-zinc-50/80 rounded-2xl border border-zinc-100 p-4" id="embedded-scheduler">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold font-mono text-zinc-700">July 2026</span>
                          <div className="flex gap-1">
                            <button type="button" className="p-1 rounded-full text-zinc-400 hover:text-zinc-800 disabled:opacity-30" disabled>
                              <ChevronLeft className="h-3.5 w-3.5" />
                            </button>
                            <button type="button" className="p-1 rounded-full text-zinc-400 hover:text-zinc-800 disabled:opacity-30" disabled>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Day Labels */}
                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-zinc-400 mb-2 font-bold">
                          {weekDays.map((wd) => (
                            <div key={wd}>{wd}</div>
                          ))}
                        </div>

                        {/* July Days Grid */}
                        <div className="grid grid-cols-7 gap-1">
                          {/* Empty cells for leading offset (Wednesday starts at index 3) */}
                          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {/* Days list */}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const dayNum = i + 1;
                            const dayOfWeek = (dayNum + startingDayOfWeek - 1) % 7;
                            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                            const isSelected = selectedDate === dayNum;

                            return (
                              <button
                                key={`day-${dayNum}`}
                                type="button"
                                disabled={isWeekend}
                                onClick={() => {
                                  setSelectedDate(dayNum);
                                  setSelectedTime(null);
                                  setApiError("");
                                }}
                                className={`h-7 w-7 text-xs rounded-full font-bold transition-all flex items-center justify-center mx-auto cursor-pointer ${
                                  isWeekend
                                    ? "text-zinc-200 cursor-not-allowed"
                                    : isSelected
                                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20 scale-105"
                                      : "text-zinc-700 hover:bg-zinc-200/60"
                                }`}
                              >
                                {dayNum}
                              </button>
                            );
                          })}
                        </div>

                        {/* Time Slots (appear once date is selected) */}
                        <AnimatePresence mode="wait">
                          {selectedDate && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="mt-4 pt-3 border-t border-zinc-200/50"
                              id="time-slots-container"
                            >
                              <span className="block text-[10px] font-mono uppercase text-zinc-400 mb-2 font-bold">
                                Available slots for July {selectedDate}:
                              </span>
                              <div className="grid grid-cols-3 gap-1.5">
                                {timeSlots.map((time) => (
                                  <button
                                    key={time}
                                    type="button"
                                    onClick={() => {
                                      setSelectedTime(time);
                                      setApiError("");
                                    }}
                                    className={`py-1.5 px-1 text-[10px] font-bold rounded-full border text-center transition-all cursor-pointer ${
                                      selectedTime === time
                                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                                        : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
                                    }`}
                                  >
                                    {time}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Direct External Calendly Link */}
                      <div className="mt-4 text-center">
                        <a
                          href="https://calendly.com/mehedihassanfahim70722/30min" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500 text-xs font-bold transition-colors font-mono uppercase tracking-wider"
                        >
                          <Link2 className="h-3.5 w-3.5" /> Book directly on Calendly
                        </a>
                      </div>
                    </div>

                    {/* Submission and Confirmation buttons */}
                    <div className="mt-6 pt-4 border-t border-zinc-100" id="scheduler-action-box">
                      {selectedDate && !selectedTime && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-amber-800 text-[11px] leading-relaxed shadow-sm shadow-amber-500/5"
                        >
                          <span className="text-sm mt-0.5">⚠️</span>
                          <div>
                            <p className="font-bold">Select Call Time</p>
                            <p className="text-[11px] text-amber-700/90 leading-normal mt-0.5">
                              You have selected July {selectedDate}. Please select one of our available slots above to complete your booking.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {apiError && (
                        <div className="mb-3 p-3 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-medium text-center">
                          {apiError}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleBookSubmit()}
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center gap-2 font-bold px-5 py-2.5 rounded-full shadow-md transition-all duration-300 text-xs uppercase tracking-wider cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 ${
                          isSubmitting 
                            ? "bg-indigo-600/70 text-white opacity-75 cursor-not-allowed scale-[0.98]" 
                            : selectedDate && !selectedTime
                              ? "bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100/80 shadow-none"
                              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/10 focus:ring-indigo-500/40"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Saving details...
                          </>
                        ) : selectedDate && !selectedTime ? (
                          "⚠️ Select Call Time Slot"
                        ) : selectedDate && selectedTime ? (
                          `Book Slot: July ${selectedDate} at ${selectedTime}`
                        ) : (
                          "Secure Strategy Call Instantly"
                        )}
                        {!isSubmitting && <Check className="h-4 w-4" />}
                      </button>
                      <p className="text-[10px] text-zinc-400 text-center mt-2 leading-relaxed">
                        By submitting, our board will review your brief instantly.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* SUCCESS SCREEN */
                <div className="text-center py-12" id="booking-success-pane">
                  <div className="mx-auto h-16 w-16 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6 animate-pulse">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-3xl font-extrabold tracking-tight text-zinc-950 mb-2">
                    Session Booked!
                  </h3>
                  <p className="text-indigo-600 font-mono text-xs uppercase tracking-widest mb-4 font-bold">
                    Strategy Call Confirmed
                  </p>
                  
                  <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 text-left max-w-md mx-auto mb-6 text-xs text-zinc-700 space-y-3">
                    <div className="grid grid-cols-2 gap-y-2 border-b border-zinc-200/60 pb-3">
                      <p className="text-zinc-400">Selected Package:</p>
                      <p className="font-semibold text-zinc-800 text-right">{videoCount}</p>

                      <p className="text-zinc-400">Your Name:</p>
                      <p className="font-semibold text-zinc-800 text-right">{userName}</p>

                      <p className="text-zinc-400">Business Name:</p>
                      <p className="font-semibold text-zinc-800 text-right">{businessName}</p>

                      <p className="text-zinc-400">Meeting Date:</p>
                      <p className="font-semibold text-zinc-800 text-right">
                        {selectedDate ? `July ${selectedDate}, 2026` : "Flexible Call Selected"}
                      </p>

                      {selectedTime && (
                        <>
                          <p className="text-zinc-400">Meeting Time:</p>
                          <p className="font-semibold text-zinc-800 text-right">{selectedTime}</p>
                        </>
                      )}
                    </div>
                    
                    <p className="text-zinc-500 leading-relaxed text-center pt-2">
                      Thank you, <span className="font-bold text-zinc-800">{userName}</span>! We have saved your brief. We'll perform detailed niche research for <span className="font-bold text-zinc-800">{businessName}</span> and reach out to <span className="font-bold text-zinc-800">{userEmail}</span> with the direct Google Meet invite.
                    </p>
                  </div>

                  <button
                    onClick={resetForm}
                    className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-6 py-2.5 rounded-full transition-all text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
