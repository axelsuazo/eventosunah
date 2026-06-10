(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/features/events/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categories",
    ()=>categories,
    "getImageUrl",
    ()=>getImageUrl,
    "getModalityBadgeClass",
    ()=>getModalityBadgeClass,
    "getModalityLabel",
    ()=>getModalityLabel,
    "normalizeEvent",
    ()=>normalizeEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const categories = [
    "Académico",
    "Tecnología",
    "Cultura",
    "Deportes",
    "Investigación",
    "Conferencia",
    "Taller",
    "General"
];
const fallbackEventImage = "/eventos/placeholder-evento.svg";
function getCmsPublicUrl() {
    const rawUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CMS_URL;
    if (!rawUrl) {
        return "";
    }
    return rawUrl.trim().replace(/\/+$/, "");
}
function withCmsUrl(path) {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }
    const cmsUrl = getCmsPublicUrl();
    if (!cmsUrl) {
        return path.startsWith("/") ? path : `/${path}`;
    }
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${cmsUrl}${normalizedPath}`;
}
function normalizeModality(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
function getImageUrl(image) {
    if (!image) return fallbackEventImage;
    if (typeof image === "string") {
        if (image.startsWith("http://") || image.startsWith("https://")) {
            return image;
        }
        if (image.startsWith("/")) {
            return withCmsUrl(image);
        }
        return withCmsUrl(`/api/media/file/${image}`);
    }
    if (image.url) {
        return image.url.startsWith("/") ? withCmsUrl(image.url) : image.url;
    }
    if (image.filename) {
        return withCmsUrl(`/api/media/file/${image.filename}`);
    }
    return fallbackEventImage;
}
function getModalityLabel(modality) {
    const normalized = normalizeModality(modality);
    if (normalized === "virtual") return "Virtual";
    if (normalized === "hibrido") return "Híbrido";
    return "Presencial";
}
function getModalityBadgeClass(modality) {
    const normalized = normalizeModality(modality);
    if (normalized === "virtual") {
        return "bg-sky-100 text-sky-800 ring-sky-200 dark:bg-sky-400/15 dark:text-sky-100 dark:ring-sky-300/30";
    }
    if (normalized === "hibrido") {
        return "bg-violet-100 text-violet-800 ring-violet-200 dark:bg-violet-400/15 dark:text-violet-100 dark:ring-violet-300/30";
    }
    return "bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-400/15 dark:text-emerald-100 dark:ring-emerald-300/30";
}
function normalizeEvent(event) {
    const title = event.title?.trim() || "Evento sin título";
    const date = event.date || "";
    return {
        id: String(event.id || `${title}-${date}`),
        title,
        category: event.category || "General",
        description: event.description || "Sin descripción disponible.",
        date,
        endDate: event.endDate || "",
        location: event.location || "UNAH",
        organizer: event.organizer || "UNAH",
        modality: event.modality || "presencial",
        published: event.published ?? true,
        image: event.image || null
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/events/date.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatEventDate",
    ()=>formatEventDate,
    "getEventDay",
    ()=>getEventDay,
    "getEventHour",
    ()=>getEventHour,
    "getEventMonth",
    ()=>getEventMonth,
    "getEventWeek",
    ()=>getEventWeek,
    "getEventYear",
    ()=>getEventYear,
    "parseEventDate",
    ()=>parseEventDate
]);
const shortMonths = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic"
];
function parseEventDate(dateValue) {
    if (!dateValue) return null;
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    if (Number.isNaN(date.getTime())) return null;
    return date;
}
function getHondurasDateParts(date) {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Tegucigalpa",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    const parts = formatter.formatToParts(date);
    const values = parts.reduce((acc, part)=>{
        if (part.type !== "literal") acc[part.type] = part.value;
        return acc;
    }, {});
    let hours24 = Number(values.hour);
    if (hours24 === 24) hours24 = 0;
    return {
        day: Number(values.day),
        month: Number(values.month),
        year: Number(values.year),
        hours24,
        minutes: Number(values.minute)
    };
}
function formatTime(hours24, minutes) {
    const period = hours24 >= 12 ? "p. m." : "a. m.";
    const hours12 = hours24 % 12 || 12;
    const paddedMinutes = String(minutes).padStart(2, "0");
    return `${hours12}:${paddedMinutes} ${period}`;
}
function formatEventDate(dateValue) {
    const date = parseEventDate(dateValue);
    if (!date) return "Fecha no disponible";
    const { day, month, year, hours24, minutes } = getHondurasDateParts(date);
    return `${day} de ${shortMonths[month - 1]} de ${year}, ${formatTime(hours24, minutes)}`;
}
function getEventYear(dateValue) {
    const date = parseEventDate(dateValue);
    if (!date) return "";
    return String(getHondurasDateParts(date).year);
}
function getEventMonth(dateValue) {
    const date = parseEventDate(dateValue);
    if (!date) return "";
    return String(getHondurasDateParts(date).month).padStart(2, "0");
}
function getEventDay(dateValue) {
    const date = parseEventDate(dateValue);
    if (!date) return "";
    const { day, month, year } = getHondurasDateParts(date);
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function getEventHour(dateValue) {
    const date = parseEventDate(dateValue);
    if (!date) return "";
    return String(getHondurasDateParts(date).hours24).padStart(2, "0");
}
function getEventWeek(dateValue) {
    const date = parseEventDate(dateValue);
    if (!date) return "";
    const { day, month, year } = getHondurasDateParts(date);
    const tempDate = new Date(Date.UTC(year, month - 1, day));
    const dayNumber = tempDate.getUTCDay() || 7;
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNumber);
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return `${tempDate.getUTCFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/Components/EventCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/events/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$date$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/events/date.ts [app-client] (ecmascript)");
;
;
;
function EventCard({ event, onOpen }) {
    function handleKeyDown(keyboardEvent) {
        if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
            keyboardEvent.preventDefault();
            onOpen(event);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        role: "button",
        tabIndex: 0,
        onClick: ()=>onOpen(event),
        onKeyDown: handleKeyDown,
        className: "group flex h-full cursor-pointer flex-col overflow-hidden rounded-[0.5rem] bg-white ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#183972]/20 dark:bg-slate-900 dark:ring-slate-700",
        "aria-label": `Abrir información del evento ${event.title}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(event.image),
                        alt: event.title,
                        className: "h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    }, void 0, false, {
                        fileName: "[project]/app/Components/EventCard.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute left-4 top-4 max-w-[55%] rounded-full bg-white/95 px-3 py-1 text-xs font-black text-[#183972] shadow-sm dark:bg-slate-950/95 dark:text-slate-100",
                        children: event.category
                    }, void 0, false, {
                        fileName: "[project]/app/Components/EventCard.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `absolute right-4 bottom-4 rounded-full px-3 py-1 text-xs font-black shadow-sm ring-1 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModalityBadgeClass"])(event.modality)}`,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModalityLabel"])(event.modality)
                    }, void 0, false, {
                        fileName: "[project]/app/Components/EventCard.tsx",
                        lineNumber: 43,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/Components/EventCard.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 flex-col p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-[#183972] dark:text-slate-100",
                        children: event.title
                    }, void 0, false, {
                        fileName: "[project]/app/Components/EventCard.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-slate-300",
                        children: event.description
                    }, void 0, false, {
                        fileName: "[project]/app/Components/EventCard.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 space-y-2 text-sm text-gray-700 dark:text-slate-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Fecha:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/Components/EventCard.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$date$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEventDate"])(event.date)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/Components/EventCard.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Lugar:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/Components/EventCard.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    event.location
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/Components/EventCard.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Components/EventCard.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto pt-5 text-sm font-black text-[#183972] transition group-hover:text-[#FDC300] dark:text-yellow-200",
                        children: "Ver más..."
                    }, void 0, false, {
                        fileName: "[project]/app/Components/EventCard.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/Components/EventCard.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/Components/EventCard.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = EventCard;
var _c;
__turbopack_context__.k.register(_c, "EventCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/Components/EventManager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$Components$2f$EventCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/Components/EventCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$date$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/events/date.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/events/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const EVENTS_PER_PAGE = 6;
const emptyFilters = {
    search: "",
    dateRange: "all",
    exactDate: "",
    exactMonth: "",
    category: "",
    modality: "",
    location: ""
};
function EventManager({ initialEvents, initialLoadError = null }) {
    _s();
    const [events] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialEvents);
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyFilters);
    const [searchInput, setSearchInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyFilters.search);
    const [selectedEvent, setSelectedEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialLoadError);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const categoryOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EventManager.useMemo[categoryOptions]": ()=>{
            return getUniqueOptions(events.map({
                "EventManager.useMemo[categoryOptions]": (event)=>event.category
            }["EventManager.useMemo[categoryOptions]"]));
        }
    }["EventManager.useMemo[categoryOptions]"], [
        events
    ]);
    const modalityOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EventManager.useMemo[modalityOptions]": ()=>{
            return getUniqueOptions(events.map({
                "EventManager.useMemo[modalityOptions]": (event)=>event.modality
            }["EventManager.useMemo[modalityOptions]"]));
        }
    }["EventManager.useMemo[modalityOptions]"], [
        events
    ]);
    const locationOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EventManager.useMemo[locationOptions]": ()=>{
            return getUniqueOptions(events.map({
                "EventManager.useMemo[locationOptions]": (event)=>event.location
            }["EventManager.useMemo[locationOptions]"]));
        }
    }["EventManager.useMemo[locationOptions]"], [
        events
    ]);
    const hasAdvancedFilters = filters.dateRange !== "all" || Boolean(filters.exactDate) || Boolean(filters.exactMonth) || Boolean(filters.category) || Boolean(filters.modality) || Boolean(filters.location);
    const showAdvancedFilters = Boolean(searchInput.trim()) || Boolean(filters.search.trim()) || hasAdvancedFilters;
    const filteredEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EventManager.useMemo[filteredEvents]": ()=>{
            const normalizedSearch = normalizeText(filters.search);
            return events.filter({
                "EventManager.useMemo[filteredEvents]": (event)=>{
                    const matchesSearch = !normalizedSearch || normalizeText(event.title).includes(normalizedSearch) || normalizeText(event.description).includes(normalizedSearch) || normalizeText(event.location).includes(normalizedSearch) || normalizeText(event.organizer).includes(normalizedSearch) || normalizeText(event.category).includes(normalizedSearch) || normalizeText(event.modality).includes(normalizedSearch);
                    const matchesDate = matchesDateRange(event.date, filters.dateRange, filters.exactDate, filters.exactMonth);
                    const matchesCategory = !filters.category || event.category === filters.category;
                    const matchesModality = !filters.modality || event.modality === filters.modality;
                    const matchesLocation = !filters.location || event.location === filters.location;
                    return matchesSearch && matchesDate && matchesCategory && matchesModality && matchesLocation;
                }
            }["EventManager.useMemo[filteredEvents]"]);
        }
    }["EventManager.useMemo[filteredEvents]"], [
        events,
        filters
    ]);
    const totalPages = Math.max(1, Math.ceil(filteredEvents.length / EVENTS_PER_PAGE));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EventManager.useMemo[paginatedEvents]": ()=>{
            const startIndex = (safeCurrentPage - 1) * EVENTS_PER_PAGE;
            const endIndex = startIndex + EVENTS_PER_PAGE;
            return filteredEvents.slice(startIndex, endIndex);
        }
    }["EventManager.useMemo[paginatedEvents]"], [
        filteredEvents,
        safeCurrentPage
    ]);
    const paginationStart = filteredEvents.length === 0 ? 0 : (safeCurrentPage - 1) * EVENTS_PER_PAGE + 1;
    const paginationEnd = Math.min(safeCurrentPage * EVENTS_PER_PAGE, filteredEvents.length);
    function updateFilter(name, value) {
        setFilters((current)=>({
                ...current,
                [name]: value
            }));
        setCurrentPage(1);
    }
    function submitSearch(event) {
        event.preventDefault();
        updateFilter("search", searchInput);
    }
    function clearFilters() {
        setSearchInput("");
        setFilters(emptyFilters);
        setCurrentPage(1);
    }
    function goToPage(page) {
        if (page < 1 || page > totalPages) {
            return;
        }
        setCurrentPage(page);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "eventos",
        className: "bg-gray-50 px-4 py-10 dark:bg-slate-950 sm:px-6 md:py-14",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-7xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto max-w-4xl text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-black uppercase tracking-[0.22em] text-[#f5c400]",
                                children: "Agenda universitaria"
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-3 text-3xl font-black leading-tight text-[#183972] dark:text-slate-100 sm:text-4xl md:text-5xl",
                                children: "UNAH Eventos informate y participa"
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Components/EventManager.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: submitSearch,
                        className: "mt-8 w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto w-full max-w-5xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative mx-auto flex w-full max-w-2xl items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "search",
                                            value: searchInput,
                                            onChange: (event)=>setSearchInput(event.target.value),
                                            placeholder: "Buscar eventos por nombre, lugar, categoría...",
                                            className: "h-12 w-full min-w-0 rounded-full border border-gray-200 bg-white px-5 pr-14 text-sm font-semibold text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#183972] focus:ring-4 focus:ring-[#183972]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 sm:px-7 sm:pr-16 sm:text-base"
                                        }, void 0, false, {
                                            fileName: "[project]/app/Components/EventManager.tsx",
                                            lineNumber: 199,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#183972] text-white shadow-md transition-all duration-300 hover:bg-[#f5c400] hover:text-[#183972] active:scale-95 dark:bg-yellow-300 dark:text-[#183972] dark:hover:bg-yellow-200 sm:right-1.5",
                                            "aria-label": "Buscar eventos",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                className: "h-5 w-5 sm:h-6 sm:w-6",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                strokeWidth: "2.3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    d: "m21 21-4.35-4.35m1.1-5.4a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Components/EventManager.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/Components/EventManager.tsx",
                                                lineNumber: 212,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/Components/EventManager.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/Components/EventManager.tsx",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, this),
                                showAdvancedFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 animate-[fadeIn_.35s_ease-in-out] rounded-3xl border border-gray-100 bg-gray-50/90 p-4 dark:border-slate-800 dark:bg-slate-950/70",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSelect, {
                                                    label: "Fecha",
                                                    value: filters.dateRange,
                                                    onChange: (value)=>{
                                                        const dateRange = value;
                                                        updateFilter("dateRange", dateRange);
                                                        if (dateRange !== "day") {
                                                            updateFilter("exactDate", "");
                                                        }
                                                        if (dateRange !== "month") {
                                                            updateFilter("exactMonth", "");
                                                        }
                                                    },
                                                    options: [
                                                        {
                                                            value: "all",
                                                            label: "Todas las fechas"
                                                        },
                                                        {
                                                            value: "today",
                                                            label: "Hoy"
                                                        },
                                                        {
                                                            value: "tomorrow",
                                                            label: "Mañana"
                                                        },
                                                        {
                                                            value: "next7days",
                                                            label: "Próximos 7 días"
                                                        },
                                                        {
                                                            value: "thisWeek",
                                                            label: "Esta semana"
                                                        },
                                                        {
                                                            value: "nextWeek",
                                                            label: "Próxima semana"
                                                        },
                                                        {
                                                            value: "day",
                                                            label: "Escoger día"
                                                        },
                                                        {
                                                            value: "month",
                                                            label: "Escoger mes"
                                                        }
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Components/EventManager.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 21
                                                }, this),
                                                filters.dateRange === "day" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterInput, {
                                                    label: "Día",
                                                    type: "date",
                                                    value: filters.exactDate,
                                                    onChange: (value)=>updateFilter("exactDate", value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Components/EventManager.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 23
                                                }, this),
                                                filters.dateRange === "month" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterInput, {
                                                    label: "Mes",
                                                    type: "month",
                                                    value: filters.exactMonth,
                                                    onChange: (value)=>updateFilter("exactMonth", value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Components/EventManager.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSelect, {
                                                    label: "Categoría",
                                                    value: filters.category,
                                                    onChange: (value)=>updateFilter("category", value),
                                                    options: [
                                                        {
                                                            value: "",
                                                            label: "Todas"
                                                        },
                                                        ...categoryOptions.map((category)=>({
                                                                value: category,
                                                                label: category
                                                            }))
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Components/EventManager.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSelect, {
                                                    label: "Modalidad",
                                                    value: filters.modality,
                                                    onChange: (value)=>updateFilter("modality", value),
                                                    options: [
                                                        {
                                                            value: "",
                                                            label: "Todas"
                                                        },
                                                        ...modalityOptions.map((modality)=>({
                                                                value: modality,
                                                                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModalityLabel"])(modality)
                                                            }))
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Components/EventManager.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSelect, {
                                                    label: "Lugar",
                                                    value: filters.location,
                                                    onChange: (value)=>updateFilter("location", value),
                                                    options: [
                                                        {
                                                            value: "",
                                                            label: "Todos"
                                                        },
                                                        ...locationOptions.map((location)=>({
                                                                value: location,
                                                                label: location
                                                            }))
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Components/EventManager.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/Components/EventManager.tsx",
                                            lineNumber: 231,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-bold text-gray-500 dark:text-slate-400",
                                                    children: [
                                                        filteredEvents.length,
                                                        " eventos encontrados"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/Components/EventManager.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 21
                                                }, this),
                                                (filters.search || hasAdvancedFilters) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: clearFilters,
                                                    className: "w-full rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-black text-[#183972] transition hover:bg-[#183972] hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-yellow-300 dark:hover:text-[#183972] sm:w-auto",
                                                    children: "Limpiar filtros"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Components/EventManager.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/Components/EventManager.tsx",
                                            lineNumber: 320,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/Components/EventManager.tsx",
                                    lineNumber: 230,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/Components/EventManager.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/Components/EventManager.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex flex-col gap-2 rounded-[0.5rem] e/70 px-4 py-3 text-center shadow-sm dark:bg-slate-900/60 sm:flex-row sm:items-center sm:justify-between sm:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-gray-600 dark:text-slate-300",
                                children: [
                                    "Mostrando ",
                                    paginationStart,
                                    "-",
                                    paginationEnd,
                                    " de",
                                    " ",
                                    filteredEvents.length,
                                    " eventos."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 342,
                                columnNumber: 11
                            }, this),
                            (filters.search || hasAdvancedFilters) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-black text-[#183972] dark:text-yellow-200",
                                children: "Filtros aplicados"
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 348,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Components/EventManager.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this),
                    loadError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-center shadow-sm dark:border-red-900/60 dark:bg-red-950/40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-black text-red-800 dark:text-red-200",
                                children: "No se pudo conectar con Payload CMS"
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm leading-6 text-red-700 dark:text-red-100",
                                children: loadError
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 360,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-red-700 dark:text-red-100",
                                children: "Revise que el CMS esté activo y que la API protegida responda."
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 364,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Components/EventManager.tsx",
                        lineNumber: 355,
                        columnNumber: 11
                    }, this),
                    !loadError && events.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-black text-[#183972] dark:text-slate-100",
                                children: "No hay eventos publicados"
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-slate-300",
                                children: "Cuando el administrador o co-administrador cree eventos publicados, aparecerán automáticamente en esta sección."
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 376,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Components/EventManager.tsx",
                        lineNumber: 371,
                        columnNumber: 11
                    }, this),
                    !loadError && events.length > 0 && filteredEvents.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-black text-[#183972] dark:text-slate-100",
                                children: "No hay eventos con esos filtros"
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm text-gray-600 dark:text-slate-300",
                                children: "Cambie la búsqueda o limpie los filtros para ver más eventos."
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 389,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Components/EventManager.tsx",
                        lineNumber: 384,
                        columnNumber: 11
                    }, this),
                    !loadError && filteredEvents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
                                children: paginatedEvents.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$Components$2f$EventCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        event: event,
                                        onOpen: setSelectedEvent
                                    }, event.id, false, {
                                        fileName: "[project]/app/Components/EventManager.tsx",
                                        lineNumber: 399,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 397,
                                columnNumber: 13
                            }, this),
                            totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-10 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>goToPage(safeCurrentPage - 1),
                                            disabled: safeCurrentPage === 1,
                                            className: "min-w-[7rem] rounded-full border border-gray-300 px-4 py-2 text-sm font-black text-[#183972] transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800",
                                            children: "Anterior"
                                        }, void 0, false, {
                                            fileName: "[project]/app/Components/EventManager.tsx",
                                            lineNumber: 410,
                                            columnNumber: 19
                                        }, this),
                                        Array.from({
                                            length: totalPages
                                        }).map((_, index)=>{
                                            const page = index + 1;
                                            const isActive = page === safeCurrentPage;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>goToPage(page),
                                                className: `h-10 w-10 rounded-full text-sm font-black transition ${isActive ? "bg-[#183972] text-white dark:bg-yellow-300 dark:text-[#183972]" : "border border-gray-300 text-[#183972] hover:bg-gray-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"}`,
                                                children: page
                                            }, page, false, {
                                                fileName: "[project]/app/Components/EventManager.tsx",
                                                lineNumber: 424,
                                                columnNumber: 23
                                            }, this);
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>goToPage(safeCurrentPage + 1),
                                            disabled: safeCurrentPage === totalPages,
                                            className: "min-w-[7rem] rounded-full border border-gray-300 px-4 py-2 text-sm font-black text-[#183972] transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800",
                                            children: "Siguiente"
                                        }, void 0, false, {
                                            fileName: "[project]/app/Components/EventManager.tsx",
                                            lineNumber: 439,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/Components/EventManager.tsx",
                                    lineNumber: 409,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/Components/EventManager.tsx",
                                lineNumber: 408,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/app/Components/EventManager.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            selectedEvent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EventDetailModal, {
                event: selectedEvent,
                onClose: ()=>setSelectedEvent(null)
            }, void 0, false, {
                fileName: "[project]/app/Components/EventManager.tsx",
                lineNumber: 455,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/Components/EventManager.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
_s(EventManager, "jyFakFbanbsjdIfrnXYVZN731EE=");
_c = EventManager;
function FilterSelect({ label, value, onChange, options }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-1 block text-xs font-black uppercase tracking-wide text-gray-400 dark:text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/Components/EventManager.tsx",
                lineNumber: 477,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: value,
                onChange: (event)=>onChange(event.target.value),
                className: "w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-bold text-gray-700 outline-none transition focus:border-[#183972] focus:ring-4 focus:ring-[#183972]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100",
                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: option.value,
                        children: option.label
                    }, `${label}-${option.value}`, false, {
                        fileName: "[project]/app/Components/EventManager.tsx",
                        lineNumber: 487,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/Components/EventManager.tsx",
                lineNumber: 481,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/Components/EventManager.tsx",
        lineNumber: 476,
        columnNumber: 5
    }, this);
}
_c1 = FilterSelect;
function FilterInput({ label, type, value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-1 block text-xs font-black uppercase tracking-wide text-gray-400 dark:text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/Components/EventManager.tsx",
                lineNumber: 509,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: type,
                value: value,
                onChange: (event)=>onChange(event.target.value),
                className: "w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-bold text-gray-700 outline-none transition focus:border-[#183972] focus:ring-4 focus:ring-[#183972]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            }, void 0, false, {
                fileName: "[project]/app/Components/EventManager.tsx",
                lineNumber: 513,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/Components/EventManager.tsx",
        lineNumber: 508,
        columnNumber: 5
    }, this);
}
_c2 = FilterInput;
function EventDetailModal({ event, onClose }) {
    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImageUrl"])(event.image);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4 md:p-8",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "max-h-[92dvh] w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:bg-slate-900 sm:max-w-3xl sm:rounded-3xl",
            onClick: (event)=>event.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-slate-800 sm:h-72 md:h-96",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: imageUrl,
                            alt: event.title,
                            className: "h-full w-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/app/Components/EventManager.tsx",
                            lineNumber: 542,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"
                        }, void 0, false, {
                            fileName: "[project]/app/Components/EventManager.tsx",
                            lineNumber: 548,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            className: "absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-black text-[#183972] shadow-lg transition hover:bg-[#f5c400] dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-yellow-300 dark:hover:text-[#183972] sm:right-4 sm:top-4",
                            "aria-label": "Cerrar detalle",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/Components/EventManager.tsx",
                            lineNumber: 550,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/Components/EventManager.tsx",
                    lineNumber: 541,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-[calc(92dvh-12rem)] overflow-y-auto p-4 sm:max-h-[calc(92dvh-18rem)] sm:p-6 md:max-h-[calc(92dvh-24rem)] md:p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2 sm:gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-full bg-[#183972]/10 px-3 py-1 text-xs font-black uppercase text-[#183972] dark:bg-yellow-300/15 dark:text-yellow-200",
                                    children: event.category
                                }, void 0, false, {
                                    fileName: "[project]/app/Components/EventManager.tsx",
                                    lineNumber: 562,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `rounded-full px-3 py-1 text-xs font-black ring-1 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModalityBadgeClass"])(event.modality)}`,
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModalityLabel"])(event.modality)
                                }, void 0, false, {
                                    fileName: "[project]/app/Components/EventManager.tsx",
                                    lineNumber: 566,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/Components/EventManager.tsx",
                            lineNumber: 561,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "mt-4 text-2xl font-black leading-tight text-[#183972] dark:text-slate-100 sm:text-3xl",
                            children: event.title
                        }, void 0, false, {
                            fileName: "[project]/app/Components/EventManager.tsx",
                            lineNumber: 575,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 grid gap-3 text-sm text-gray-700 dark:text-slate-300 sm:grid-cols-2 md:mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                                    label: "Fecha y hora",
                                    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$date$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEventDate"])(event.date)
                                }, void 0, false, {
                                    fileName: "[project]/app/Components/EventManager.tsx",
                                    lineNumber: 580,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                                    label: "Lugar",
                                    value: event.location
                                }, void 0, false, {
                                    fileName: "[project]/app/Components/EventManager.tsx",
                                    lineNumber: 581,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                                    label: "Organizador",
                                    value: event.organizer
                                }, void 0, false, {
                                    fileName: "[project]/app/Components/EventManager.tsx",
                                    lineNumber: 582,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                                    label: "Modalidad",
                                    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$events$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getModalityLabel"])(event.modality)
                                }, void 0, false, {
                                    fileName: "[project]/app/Components/EventManager.tsx",
                                    lineNumber: 583,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/Components/EventManager.tsx",
                            lineNumber: 579,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-5 whitespace-pre-line text-sm leading-7 text-gray-700 dark:text-slate-300 sm:mt-6 sm:text-base sm:leading-8",
                            children: event.description
                        }, void 0, false, {
                            fileName: "[project]/app/Components/EventManager.tsx",
                            lineNumber: 589,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            className: "mt-7 w-full rounded-xl bg-[#183972] px-6 py-3 text-sm font-black text-white transition hover:bg-[#f5c400] hover:text-[#183972] active:bg-[#f5c400] active:text-[#183972] dark:bg-yellow-300 dark:text-[#183972] dark:hover:bg-yellow-200 sm:w-auto",
                            children: "Cerrar detalle"
                        }, void 0, false, {
                            fileName: "[project]/app/Components/EventManager.tsx",
                            lineNumber: 593,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/Components/EventManager.tsx",
                    lineNumber: 560,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/Components/EventManager.tsx",
            lineNumber: 537,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/Components/EventManager.tsx",
        lineNumber: 533,
        columnNumber: 5
    }, this);
}
_c3 = EventDetailModal;
function InfoBox({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "rounded-2xl bg-gray-50 p-4 dark:bg-slate-950",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                className: "mb-1 block text-[#183972] dark:text-yellow-200",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/Components/EventManager.tsx",
                lineNumber: 609,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "break-words",
                children: value
            }, void 0, false, {
                fileName: "[project]/app/Components/EventManager.tsx",
                lineNumber: 612,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/Components/EventManager.tsx",
        lineNumber: 608,
        columnNumber: 5
    }, this);
}
_c4 = InfoBox;
function getUniqueOptions(values) {
    return Array.from(new Set(values.filter((value)=>Boolean(value && value.trim())))).sort((a, b)=>a.localeCompare(b));
}
function normalizeText(value) {
    return value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function matchesDateRange(eventDate, dateRange, exactDate, exactMonth) {
    if (dateRange === "all") {
        return true;
    }
    const date = new Date(eventDate);
    if (Number.isNaN(date.getTime())) {
        return false;
    }
    const eventDay = startOfDay(date);
    const today = startOfDay(new Date());
    if (dateRange === "today") {
        return isSameDay(eventDay, today);
    }
    if (dateRange === "tomorrow") {
        return isSameDay(eventDay, addDays(today, 1));
    }
    if (dateRange === "next7days") {
        const lastDay = addDays(today, 6);
        return eventDay >= today && eventDay <= lastDay;
    }
    if (dateRange === "thisWeek") {
        const weekStart = startOfWeek(today);
        const weekEnd = endOfWeek(today);
        return eventDay >= weekStart && eventDay <= weekEnd;
    }
    if (dateRange === "nextWeek") {
        const nextWeekStart = addDays(startOfWeek(today), 7);
        const nextWeekEnd = addDays(endOfWeek(today), 7);
        return eventDay >= nextWeekStart && eventDay <= nextWeekEnd;
    }
    if (dateRange === "day") {
        if (!exactDate) {
            return true;
        }
        const selectedDay = startOfDay(new Date(`${exactDate}T00:00:00`));
        return isSameDay(eventDay, selectedDay);
    }
    if (dateRange === "month") {
        if (!exactMonth) {
            return true;
        }
        const eventYear = date.getFullYear();
        const eventMonth = String(date.getMonth() + 1).padStart(2, "0");
        const eventYearMonth = `${eventYear}-${eventMonth}`;
        return eventYearMonth === exactMonth;
    }
    return true;
}
function startOfDay(date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function isSameDay(firstDate, secondDate) {
    return firstDate.getTime() === secondDate.getTime();
}
function startOfWeek(date) {
    const result = startOfDay(date);
    const day = result.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    result.setDate(result.getDate() + diff);
    return result;
}
function endOfWeek(date) {
    const result = startOfWeek(date);
    result.setDate(result.getDate() + 6);
    return result;
}
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "EventManager");
__turbopack_context__.k.register(_c1, "FilterSelect");
__turbopack_context__.k.register(_c2, "FilterInput");
__turbopack_context__.k.register(_c3, "EventDetailModal");
__turbopack_context__.k.register(_c4, "InfoBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/Components/HeroCarousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const AUTO_PLAY_TIME = 6000;
function HeroCarousel({ slides }) {
    _s();
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const safeSlides = slides.length > 0 ? slides : [];
    const activeSlide = safeSlides[activeIndex] ?? safeSlides[0];
    const nextIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HeroCarousel.useMemo[nextIndex]": ()=>{
            if (safeSlides.length <= 1) {
                return 0;
            }
            return activeIndex === safeSlides.length - 1 ? 0 : activeIndex + 1;
        }
    }["HeroCarousel.useMemo[nextIndex]"], [
        activeIndex,
        safeSlides.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroCarousel.useEffect": ()=>{
            if (!isPlaying || safeSlides.length <= 1) {
                return;
            }
            const interval = window.setInterval({
                "HeroCarousel.useEffect.interval": ()=>{
                    setActiveIndex({
                        "HeroCarousel.useEffect.interval": (currentIndex)=>currentIndex === safeSlides.length - 1 ? 0 : currentIndex + 1
                    }["HeroCarousel.useEffect.interval"]);
                }
            }["HeroCarousel.useEffect.interval"], AUTO_PLAY_TIME);
            return ({
                "HeroCarousel.useEffect": ()=>window.clearInterval(interval)
            })["HeroCarousel.useEffect"];
        }
    }["HeroCarousel.useEffect"], [
        isPlaying,
        safeSlides.length
    ]);
    if (!activeSlide) {
        return null;
    }
    function limitText(text, maxLength) {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }
    function goToSlide(index) {
        setActiveIndex(index);
    }
    function goToNextSlide() {
        setActiveIndex((currentIndex)=>currentIndex === safeSlides.length - 1 ? 0 : currentIndex + 1);
    }
    function goToPreviousSlide() {
        setActiveIndex((currentIndex)=>currentIndex === 0 ? safeSlides.length - 1 : currentIndex - 1);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "inicio",
        className: "relative isolate overflow-hidden bg-[#183972] px-6 py-20 text-white dark:bg-slate-950 md:py-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 -z-20",
                children: safeSlides.map((slide, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: slide.image,
                        alt: slide.imageAlt,
                        className: `absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${index === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0"}`
                    }, `background-${slide.id}`, false, {
                        fileName: "[project]/app/Components/HeroCarousel.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/Components/HeroCarousel.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 -z-10 bg-gradient-to-r from-[#071225]/10 via-[#183972]/5 to-black/25"
            }, void 0, false, {
                fileName: "[project]/app/Components/HeroCarousel.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-transparent to-black/20"
            }, void 0, false, {
                fileName: "[project]/app/Components/HeroCarousel.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            title: activeSlide.title,
                            className: "mt-6 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl animate-[heroFade_.65s_ease-in-out] overflow-hidden",
                            children: limitText(activeSlide.title, 45)
                        }, `title-${activeSlide.id}`, false, {
                            fileName: "[project]/app/Components/HeroCarousel.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            title: activeSlide.description,
                            className: "mt-5 max-w-2xl text-base leading-7 text-blue-50 md:text-lg animate-[heroFade_.75s_ease-in-out] overflow-hidden",
                            children: limitText(activeSlide.description, 150)
                        }, `description-${activeSlide.id}`, false, {
                            fileName: "[project]/app/Components/HeroCarousel.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 flex flex-col gap-3 sm:flex-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: activeSlide.buttonHref,
                                    className: "rounded-[0.5rem] bg-[#f5c400] px-6 py-3 text-center font-bold text-[#183972] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#ffd52e]",
                                    children: activeSlide.buttonText
                                }, void 0, false, {
                                    fileName: "[project]/app/Components/HeroCarousel.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                safeSlides.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setIsPlaying((current)=>!current),
                                    className: "rounded-[0.5rem] border border-white/25 bg-white/10 px-6 py-3 text-center font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20",
                                    children: isPlaying ? "Pausar carrusel" : "Reproducir carrusel"
                                }, void 0, false, {
                                    fileName: "[project]/app/Components/HeroCarousel.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/Components/HeroCarousel.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        safeSlides.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-10 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: goToPreviousSlide,
                                    className: "flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xl font-black text-white backdrop-blur transition hover:bg-white hover:text-[#183972]",
                                    "aria-label": "Diapositiva anterior",
                                    children: "‹"
                                }, void 0, false, {
                                    fileName: "[project]/app/Components/HeroCarousel.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: goToNextSlide,
                                    className: "flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xl font-black text-white backdrop-blur transition hover:bg-white hover:text-[#183972]",
                                    "aria-label": "Siguiente diapositiva",
                                    children: "›"
                                }, void 0, false, {
                                    fileName: "[project]/app/Components/HeroCarousel.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ml-2 flex items-center gap-2",
                                    children: safeSlides.map((slide, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>goToSlide(index),
                                            className: `h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-[#f5c400]" : "w-2.5 bg-white/40 hover:bg-white"}`,
                                            "aria-label": `Ir a la diapositiva ${index + 1}`
                                        }, `dot-${slide.id}`, false, {
                                            fileName: "[project]/app/Components/HeroCarousel.tsx",
                                            lineNumber: 160,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/Components/HeroCarousel.tsx",
                                    lineNumber: 158,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/Components/HeroCarousel.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/Components/HeroCarousel.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/Components/HeroCarousel.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/Components/HeroCarousel.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(HeroCarousel, "HWDL7iyhc7504fp+6ZlPr9VPJbU=");
_c = HeroCarousel;
var _c;
__turbopack_context__.k.register(_c, "HeroCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/Components/switch/switch-10.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeSwitch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ThemeSwitch() {
    _s();
    const [isDark, setIsDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeSwitch.useEffect": ()=>{
            const savedTheme = localStorage.getItem("theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;
            setIsDark(shouldUseDark);
            document.documentElement.classList.toggle("dark", shouldUseDark);
        }
    }["ThemeSwitch.useEffect"], []);
    function toggleTheme() {
        const nextTheme = !isDark;
        setIsDark(nextTheme);
        document.documentElement.classList.toggle("dark", nextTheme);
        localStorage.setItem("theme", nextTheme ? "dark" : "light");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: toggleTheme,
        "aria-label": "Cambiar tema",
        className: `relative flex h-8 w-16 items-center rounded-full p-1 transition-all duration-300 ${isDark ? " bg-[#05487f]" : " bg-[#FDC300]"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs shadow-md transition-transform duration-300 ${isDark ? "translate-x-8 text-[#183972]" : "translate-x-0 text-[#183972]"}`,
            children: isDark ? "☾" : "☀"
        }, void 0, false, {
            fileName: "[project]/app/Components/switch/switch-10.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/Components/switch/switch-10.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(ThemeSwitch, "q9ovQTvwIdpxeVii6kJLTuTYpwE=");
_c = ThemeSwitch;
var _c;
__turbopack_context__.k.register(_c, "ThemeSwitch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/Components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$Components$2f$switch$2f$switch$2d$10$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/Components/switch/switch-10.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Navbar() {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const navLinks = [
        {
            href: "#inicio",
            label: "Inicio"
        },
        {
            href: "#eventos",
            label: "Eventos"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#inicio",
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/UNAH-escudo.png",
                                alt: "UNAH Logo",
                                className: "h-12 w-auto"
                            }, void 0, false, {
                                fileName: "[project]/app/Components/Navbar.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "leading-tight"
                            }, void 0, false, {
                                fileName: "[project]/app/Components/Navbar.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Components/Navbar.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden items-center gap-6 md:flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "flex items-center gap-7 text-sm font-bold text-gray-700 dark:text-slate-200",
                                children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: link.href,
                                            className: "transition hover:text-[#183972] dark:hover:text-yellow-300",
                                            children: link.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/Components/Navbar.tsx",
                                            lineNumber: 29,
                                            columnNumber: 17
                                        }, this)
                                    }, link.href, false, {
                                        fileName: "[project]/app/Components/Navbar.tsx",
                                        lineNumber: 28,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/Components/Navbar.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$Components$2f$switch$2f$switch$2d$10$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/Components/Navbar.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Components/Navbar.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setIsOpen((current)=>!current),
                        className: "rounded-xl border border-gray-300 px-3 py-2 text-sm font-bold text-[#183972] dark:border-slate-700 dark:text-slate-100 md:hidden",
                        "aria-label": "Abrir menú",
                        children: "Menú"
                    }, void 0, false, {
                        fileName: "[project]/app/Components/Navbar.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/Components/Navbar.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3 text-sm font-bold text-gray-700 dark:text-slate-200",
                    children: [
                        navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: link.href,
                                onClick: ()=>setIsOpen(false),
                                className: "rounded-xl px-3 py-2 hover:bg-gray-100 hover:text-[#183972] dark:hover:bg-slate-800 dark:hover:text-yellow-300",
                                children: link.label
                            }, link.href, false, {
                                fileName: "[project]/app/Components/Navbar.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$Components$2f$switch$2f$switch$2d$10$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/Components/Navbar.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/Components/Navbar.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/Components/Navbar.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/Components/Navbar.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/Components/Navbar.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_s(Navbar, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0~1cns5._.js.map