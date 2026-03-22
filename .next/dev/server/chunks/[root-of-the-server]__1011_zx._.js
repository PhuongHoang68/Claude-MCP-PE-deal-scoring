module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/shared/schemas.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeDealInputSchema",
    ()=>analyzeDealInputSchema,
    "analyzeDealResponseSchema",
    ()=>analyzeDealResponseSchema,
    "claudeMcpPayloadSchema",
    ()=>claudeMcpPayloadSchema,
    "dealAnalysisOutputSchema",
    ()=>dealAnalysisOutputSchema,
    "normalizedDealProfileSchema",
    ()=>normalizedDealProfileSchema,
    "thesisInputSchema",
    ()=>thesisInputSchema,
    "toolTracePayloadSchema",
    ()=>toolTracePayloadSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
const revenueRangeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "unknown",
    "<1M",
    "1-5M",
    "5-20M",
    "20-50M",
    "50M+"
]);
const growthIndicatorSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "low",
    "medium",
    "high",
    "unknown"
]);
const profitabilityIndicatorSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "yes",
    "no",
    "unknown"
]);
const thesisInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    target_industry: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    revenue_range: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    growth_preference: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    profitability_preference: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    geography_preference: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    minimum_fit_threshold: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(100)
});
const analyzeDealInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    company_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    website: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().default(""),
    thesis: thesisInputSchema
});
const normalizedDealProfileSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    company_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    website: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    industry: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    headquarters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    revenue_range: revenueRangeSchema,
    growth_indicator: growthIndicatorSchema,
    profitability_indicator: profitabilityIndicatorSchema,
    employee_range: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    risk_flags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()),
    data_confidence: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(100),
    thesis_fit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(100),
    source_labels: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string())
});
const dealAnalysisOutputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    company_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    thesis_match: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "Strong",
        "Moderate",
        "Weak"
    ]),
    score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(100),
    decision: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "Go",
        "Review",
        "No-Go"
    ]),
    reasons: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).min(1),
    risks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()),
    missing_data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()),
    confidence: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(100),
    next_step: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    crm_update: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("updated"),
        stage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("Preliminary Review"),
        note: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
    })
});
const toolTracePayloadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    company_profile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        company_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        domain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        industry: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        short_description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        headquarters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        founding_year: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional()
    }),
    financial_signals: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        revenue_range: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        growth_indicator: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        profitability_indicator: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        employee_range: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        confidence_level: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    }),
    risk_flags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        customer_concentration_risk: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
        missing_data_flags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()),
        geography_risk: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
        business_model_concerns: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()),
        data_completeness_score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        risk_flags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string())
    }),
    thesis_context: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        target_industry: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        preferred_revenue_band: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        geography_preference: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        growth_preference: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        profitability_preference: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        minimum_fit_threshold: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    })
});
const claudeMcpPayloadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    used_mcp_subprocess: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    assistant_summary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    tool_invocations: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        arguments: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()),
        result_preview: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })),
    model: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    fallback_reason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const analyzeDealResponseSchema = dealAnalysisOutputSchema.extend({
    normalized_profile: normalizedDealProfileSchema,
    tool_trace: toolTracePayloadSchema,
    claude_mcp: claudeMcpPayloadSchema
});
}),
"[project]/server/mockData/scenarios.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_THESIS",
    ()=>DEFAULT_THESIS,
    "SCENARIOS",
    ()=>SCENARIOS,
    "SUMMIT_DEFAULT_THESIS",
    ()=>SUMMIT_DEFAULT_THESIS,
    "getScenarioByName",
    ()=>getScenarioByName
]);
const SUMMIT_DEFAULT_THESIS = {
    target_industry: "B2B SaaS",
    revenue_range: "5-50M",
    growth_preference: "15-30%+",
    profitability_preference: "EBITDA-positive preferred (15%+)",
    geography_preference: "US",
    minimum_fit_threshold: 70
};
const DEFAULT_THESIS = {
    ...SUMMIT_DEFAULT_THESIS
};
const SCENARIOS = {
    strong_fit: {
        key: "strong_fit",
        profile: {
            company_name: "Northstar Cloud Ops",
            website: "northstarcloudops.com",
            industry: "B2B SaaS",
            headquarters: "Austin, TX",
            revenue_range: "5-20M",
            growth_indicator: "high",
            profitability_indicator: "unknown",
            employee_range: "25-75",
            risk_flags: [
                "profitability not disclosed"
            ],
            data_confidence: 82,
            source_labels: [
                "website",
                "mock firmographic enrichment"
            ]
        }
    },
    weak_fit: {
        key: "weak_fit",
        profile: {
            company_name: "Riverbend Industrial Services",
            website: "riverbendindustrial.com",
            industry: "Industrial Services",
            headquarters: "Tulsa, OK",
            revenue_range: "20-50M",
            growth_indicator: "low",
            profitability_indicator: "yes",
            employee_range: "100-250",
            risk_flags: [
                "sector mismatch with thesis"
            ],
            data_confidence: 76,
            source_labels: [
                "mock company registry",
                "mock web enrichment"
            ]
        }
    },
    incomplete: {
        key: "incomplete",
        profile: {
            company_name: "Aster Analytics",
            website: "asteranalytics.io",
            industry: "B2B SaaS",
            headquarters: "Unknown",
            revenue_range: "unknown",
            growth_indicator: "medium",
            profitability_indicator: "unknown",
            employee_range: "unknown",
            risk_flags: [
                "revenue missing",
                "location missing"
            ],
            data_confidence: 41,
            source_labels: [
                "website only"
            ]
        }
    },
    risky_but_interesting: {
        key: "risky_but_interesting",
        profile: {
            company_name: "BluePeak Finance Tech",
            website: "bluepeakfintech.com",
            industry: "B2B SaaS",
            headquarters: "New York, NY",
            revenue_range: "20-50M",
            growth_indicator: "high",
            profitability_indicator: "no",
            employee_range: "75-150",
            risk_flags: [
                "customer concentration risk",
                "unprofitable"
            ],
            data_confidence: 88,
            source_labels: [
                "mock company registry",
                "mock financial enrichment"
            ]
        }
    }
};
function getScenarioByName(companyName) {
    const normalized = companyName.toLowerCase();
    if (normalized.includes("northstar")) return SCENARIOS.strong_fit;
    if (normalized.includes("riverbend")) return SCENARIOS.weak_fit;
    if (normalized.includes("aster")) return SCENARIOS.incomplete;
    if (normalized.includes("bluepeak")) return SCENARIOS.risky_but_interesting;
    return SCENARIOS.strong_fit;
}
}),
"[project]/shared/types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCORING_WEIGHTS",
    ()=>SCORING_WEIGHTS
]);
const SCORING_WEIGHTS = {
    industryFit: 25,
    sizeFit: 20,
    growthFit: 15,
    profitabilityFit: 10,
    geographyFit: 10,
    dataCompleteness: 10,
    maxRiskPenalty: 30
};
}),
"[project]/server/utils/scoring.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeDeterministic",
    ()=>analyzeDeterministic,
    "computeScoreBreakdown",
    ()=>computeScoreBreakdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shared/types.ts [app-route] (ecmascript)");
;
/** Spec: critical risk flags block Go (e.g. customer concentration). */ function hasCriticalRiskFlag(profile) {
    return profile.risk_flags.some((f)=>f.toLowerCase().includes("customer concentration"));
}
function industryFitPoints(profile, thesis) {
    return profile.industry.toLowerCase() === thesis.target_industry.toLowerCase() ? __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].industryFit : 0;
}
function revenueBandInThesis(profile, thesis) {
    if (profile.revenue_range === "unknown") return false;
    const tr = thesis.revenue_range.toLowerCase().replace(/\s/g, "");
    const pr = profile.revenue_range.toLowerCase();
    if (tr.includes("5-50m")) {
        return pr === "5-20m" || pr === "20-50m" || pr === "1-5m" || pr === "50m+";
    }
    return tr.includes(pr) || pr.includes(tr.split("-")[0] ?? "");
}
function sizeFitPoints(profile, thesis) {
    return revenueBandInThesis(profile, thesis) ? __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].sizeFit : 0;
}
function growthFitPoints(profile) {
    if (profile.growth_indicator === "high") return __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].growthFit;
    if (profile.growth_indicator === "medium") return Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].growthFit * (2 / 3));
    if (profile.growth_indicator === "low") return Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].growthFit * (1 / 3));
    return 0;
}
function profitabilityFitPoints(profile) {
    if (profile.profitability_indicator === "yes") return __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].profitabilityFit;
    if (profile.profitability_indicator === "unknown") return Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].profitabilityFit * 0.5);
    return 0;
}
/** North America / US thesis geography match */ function geographyFitPoints(profile, thesis) {
    const geo = thesis.geography_preference.toLowerCase();
    const hq = profile.headquarters.toLowerCase();
    const naHints = hq.includes("us") || hq.includes("usa") || hq.includes("canada") || hq.includes("toronto") || hq.includes("montreal") || hq.includes("vancouver") || /\b(tx|ca|ny|fl|il|wa|co|ga|nc|az|ma|pa|oh|mi)\b/i.test(profile.headquarters) || /,\s*[a-z]{2}\b/i.test(profile.headquarters);
    if (geo.includes("north america") || geo.includes("us") || geo.includes("canada")) {
        return naHints ? __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].geographyFit : 0;
    }
    return naHints ? __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].geographyFit : 0;
}
function dataCompletenessPoints(profile) {
    return Math.round(profile.data_confidence / 100 * __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].dataCompleteness);
}
function riskPenaltyAbs(profile) {
    const total = profile.risk_flags.reduce((sum, flag)=>{
        const s = flag.toLowerCase();
        if (s.includes("customer concentration")) return sum + 12;
        if (s.includes("unprofitable")) return sum + 10;
        if (s.includes("sector mismatch")) return sum + 12;
        if (s.includes("missing")) return sum + 4;
        return sum + 3;
    }, 0);
    return Math.min(total, __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].maxRiskPenalty);
}
function thesisMatch(score) {
    if (score >= 80) return "Strong";
    if (score >= 60) return "Moderate";
    return "Weak";
}
/**
 * Missing diligence items that force Review (Incomplete archetype).
 * Single unknown profitability with otherwise strong data does not alone force Review.
 */ function missingKeyFields(profile) {
    if (profile.revenue_range === "unknown") return true;
    if (profile.headquarters.toLowerCase() === "unknown") return true;
    if (profile.profitability_indicator === "unknown" && profile.data_confidence < 55) return true;
    return false;
}
/** Severe mismatch: wrong industry AND revenue band vs thesis (spec). */ function severeMismatch(profile, thesis) {
    const industryMismatch = profile.industry.toLowerCase() !== thesis.target_industry.toLowerCase();
    const sizeMismatch = !revenueBandInThesis(profile, thesis);
    return industryMismatch && sizeMismatch;
}
/**
 * Spec decision rules:
 * - Go if score >= threshold AND no critical risk flags
 * - Review if within 10 points below threshold OR missing key fields
 * - No-Go if score < (threshold - 10) OR severe mismatch (industry + size)
 */ function decisionFromPolicy(score, profile, thesis) {
    const threshold = thesis.minimum_fit_threshold;
    const critical = hasCriticalRiskFlag(profile);
    if (missingKeyFields(profile)) return "Review";
    if (severeMismatch(profile, thesis)) return "No-Go";
    if (score < threshold - 10) return "No-Go";
    if (score >= threshold && !critical) return "Go";
    if (critical) return "Review";
    if (score >= threshold - 10 && score < threshold) return "Review";
    return "No-Go";
}
function computeScoreBreakdown(profile, thesis) {
    const industry_fit = industryFitPoints(profile, thesis);
    const size_fit = sizeFitPoints(profile, thesis);
    const growth_fit = growthFitPoints(profile);
    const profitability_fit = profitabilityFitPoints(profile);
    const geography_fit = geographyFitPoints(profile, thesis);
    const data_completeness = dataCompletenessPoints(profile);
    const risk_penalty = riskPenaltyAbs(profile);
    const positive = industry_fit + size_fit + growth_fit + profitability_fit + geography_fit + data_completeness;
    const raw_score = Math.max(0, Math.min(100, positive - risk_penalty));
    return {
        industry_fit,
        size_fit,
        growth_fit,
        profitability_fit,
        geography_fit,
        data_completeness,
        risk_penalty,
        raw_score
    };
}
/** Short PE-style memo bullets (deterministic); each kept ≤130 chars where practical. */ function buildDeterministicReasonBullets(breakdown, thesis, profile, score) {
    const bullets = [];
    const indMatch = profile.industry.toLowerCase() === thesis.target_industry.toLowerCase();
    bullets.push(indMatch ? `Industry fit: ${profile.industry} matches thesis target.` : `Industry gap: ${profile.industry} vs thesis's stated industry of ${thesis.target_industry}.`);
    if (profile.revenue_range === "unknown") {
        bullets.push("Revenue unknown—no size fit credit until diligence.");
    } else if (breakdown.size_fit > 0) {
        bullets.push(`Size fit: ${profile.revenue_range} aligns with thesis band (${thesis.revenue_range}).`);
    } else {
        bullets.push(`Size gap: ${profile.revenue_range} vs thesis band (${thesis.revenue_range}).`);
    }
    bullets.push(`Profile: growth ${profile.growth_indicator}; profitability ${profile.profitability_indicator}.`);
    if (profile.headquarters.toLowerCase() === "unknown") {
        bullets.push("Geography: HQ unknown—no geography credit.");
    } else if (breakdown.geography_fit > 0) {
        bullets.push(`Geography fit: ${profile.headquarters} within ${thesis.geography_preference} scope.`);
    } else {
        bullets.push(`Geography: ${profile.headquarters} vs thesis ${thesis.geography_preference}.`);
    }
    bullets.push(`Data: +${breakdown.data_completeness}/${__TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].dataCompleteness}; conf ${profile.data_confidence}; score ${score} vs thresh ${thesis.minimum_fit_threshold}.`);
    if (breakdown.risk_penalty > 0) {
        bullets.push(`Risk: −${breakdown.risk_penalty} pts (cap ${__TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCORING_WEIGHTS"].maxRiskPenalty}).`);
    }
    const trimmed = bullets.map((b)=>b.length > 130 ? `${b.slice(0, 129).trimEnd()}…` : b);
    return trimmed.slice(0, 6);
}
function analyzeDeterministic(profile, thesis) {
    const breakdown = computeScoreBreakdown({
        ...profile,
        thesis_fit: 0
    }, thesis);
    const score = breakdown.raw_score;
    const normalizedProfile = {
        ...profile,
        thesis_fit: score
    };
    const decision = decisionFromPolicy(score, normalizedProfile, thesis);
    const label = thesisMatch(score);
    const missingData = [];
    if (normalizedProfile.revenue_range === "unknown") missingData.push("revenue data missing");
    if (normalizedProfile.profitability_indicator === "unknown") missingData.push("profitability data missing");
    if (normalizedProfile.headquarters.toLowerCase() === "unknown") missingData.push("headquarters data missing");
    const reasons = buildDeterministicReasonBullets(breakdown, thesis, normalizedProfile, score);
    return {
        company_name: normalizedProfile.company_name,
        thesis_match: label,
        score,
        decision,
        reasons,
        risks: normalizedProfile.risk_flags,
        missing_data: missingData,
        confidence: normalizedProfile.data_confidence,
        next_step: decision === "Go" ? "Move to preliminary diligence." : decision === "Review" ? "Assign analyst to validate missing items and risk flags." : "Do not advance unless thesis or deal facts change.",
        crm_update: {
            status: "updated",
            stage: "Preliminary Review",
            note: `Decision ${decision}; score ${score}; stage updated for ${normalizedProfile.company_name}.`
        }
    };
}
}),
"[project]/server/tools/openCorporates.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchOpenCorporatesEnrichment",
    ()=>fetchOpenCorporatesEnrichment
]);
function normalizeCountryCode(code) {
    if (!code) return undefined;
    const map = {
        us: "US",
        ca: "Canada",
        gb: "United Kingdom"
    };
    return map[code.toLowerCase()] ?? code.toUpperCase();
}
async function fetchOpenCorporatesEnrichment(companyName) {
    const enabled = process.env.REAL_DATA_SOURCE_ENABLED === "true";
    if (!enabled) return {
        enriched: false
    };
    try {
        const query = encodeURIComponent(companyName);
        const res = await fetch(`https://api.opencorporates.com/v0.4/companies/search?q=${query}&per_page=1`, {
            method: "GET",
            cache: "no-store"
        });
        if (!res.ok) return {
            enriched: false
        };
        const json = await res.json();
        const jurisdiction = json.results?.companies?.[0]?.company?.jurisdiction_code;
        const country = normalizeCountryCode(jurisdiction);
        return {
            enriched: true,
            sourceLabel: "opencorporates_public",
            headquartersHint: country
        };
    } catch  {
        return {
            enriched: false
        };
    }
}
}),
"[project]/server/tools/getCompanyProfile.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCompanyProfileTool",
    ()=>getCompanyProfileTool,
    "mergeCompanyProfileIntoBase",
    ()=>mergeCompanyProfileIntoBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$mockData$2f$scenarios$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/mockData/scenarios.ts [app-route] (ecmascript)");
;
function getCompanyProfileTool(input) {
    const scenario = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$mockData$2f$scenarios$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getScenarioByName"])(input.company_name);
    const p = scenario.profile;
    const domain = input.website?.replace(/^https?:\/\//, "").split("/")[0] || p.website;
    return {
        company_name: p.company_name,
        domain,
        industry: p.industry,
        short_description: `${p.company_name} — ${p.industry} operator (${p.revenue_range} revenue band).`,
        headquarters: p.headquarters,
        founding_year: undefined
    };
}
function mergeCompanyProfileIntoBase(base, tool, submittedWebsite) {
    const website = submittedWebsite.trim() || base.website;
    const labels = [
        ...base.source_labels
    ];
    if (submittedWebsite.trim()) {
        labels.push("analyst-submitted domain");
    }
    return {
        ...base,
        company_name: tool.company_name,
        website,
        industry: tool.industry,
        headquarters: tool.headquarters,
        source_labels: labels
    };
}
}),
"[project]/server/tools/getFinancialSignals.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFinancialSignalsTool",
    ()=>getFinancialSignalsTool
]);
function getFinancialSignalsTool(base) {
    return {
        revenue_range: base.revenue_range,
        growth_indicator: base.growth_indicator,
        profitability_indicator: base.profitability_indicator,
        employee_range: base.employee_range,
        confidence_level: base.data_confidence
    };
}
}),
"[project]/server/tools/getRiskFlags.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRiskFlagsTool",
    ()=>getRiskFlagsTool
]);
function getRiskFlagsTool(base) {
    const flags = base.risk_flags.map((f)=>f.toLowerCase());
    const customer_concentration_risk = flags.some((f)=>f.includes("customer concentration"));
    const missing_data_flags = [];
    if (base.revenue_range === "unknown") missing_data_flags.push("revenue");
    if (base.profitability_indicator === "unknown") missing_data_flags.push("profitability");
    if (base.headquarters.toLowerCase() === "unknown") missing_data_flags.push("headquarters");
    const geography_risk = flags.some((f)=>f.includes("geography"));
    const business_model_concerns = [];
    if (flags.some((f)=>f.includes("unprofitable"))) business_model_concerns.push("profitability pressure");
    if (flags.some((f)=>f.includes("sector mismatch"))) business_model_concerns.push("thesis sector mismatch");
    const data_completeness_score = base.data_confidence;
    return {
        customer_concentration_risk,
        missing_data_flags,
        geography_risk,
        business_model_concerns,
        data_completeness_score,
        risk_flags: base.risk_flags
    };
}
}),
"[project]/server/tools/getThesisContext.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getThesisContextTool",
    ()=>getThesisContextTool
]);
function getThesisContextTool(thesis) {
    return {
        target_industry: thesis.target_industry,
        preferred_revenue_band: thesis.revenue_range,
        geography_preference: thesis.geography_preference,
        growth_preference: thesis.growth_preference,
        profitability_preference: thesis.profitability_preference,
        minimum_fit_threshold: thesis.minimum_fit_threshold
    };
}
}),
"[project]/server/orchestrator/buildNormalizedProfile.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildNormalizedProfileFromTools",
    ()=>buildNormalizedProfileFromTools
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$mockData$2f$scenarios$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/mockData/scenarios.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$tools$2f$getCompanyProfile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/tools/getCompanyProfile.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$tools$2f$getFinancialSignals$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/tools/getFinancialSignals.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$tools$2f$getRiskFlags$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/tools/getRiskFlags.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$tools$2f$getThesisContext$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/tools/getThesisContext.ts [app-route] (ecmascript)");
;
;
;
;
;
function buildNormalizedProfileFromTools(input) {
    const scenario = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$mockData$2f$scenarios$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getScenarioByName"])(input.company_name);
    const submittedWebsite = input.website?.trim() ?? "";
    const companyProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$tools$2f$getCompanyProfile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCompanyProfileTool"])({
        company_name: input.company_name,
        website: submittedWebsite || scenario.profile.website
    });
    let base = {
        ...scenario.profile,
        website: scenario.profile.website
    };
    base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$tools$2f$getCompanyProfile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mergeCompanyProfileIntoBase"])(base, companyProfile, submittedWebsite);
    const financialSignals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$tools$2f$getFinancialSignals$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFinancialSignalsTool"])(base);
    const riskView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$tools$2f$getRiskFlags$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRiskFlagsTool"])(base);
    const thesisContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$tools$2f$getThesisContext$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getThesisContextTool"])(input.thesis);
    const profile = {
        ...base,
        revenue_range: financialSignals.revenue_range,
        growth_indicator: financialSignals.growth_indicator,
        profitability_indicator: financialSignals.profitability_indicator,
        employee_range: financialSignals.employee_range,
        data_confidence: financialSignals.confidence_level,
        risk_flags: riskView.risk_flags
    };
    return {
        profile,
        trace: {
            company_profile: companyProfile,
            financial_signals: financialSignals,
            risk_flags: riskView,
            thesis_context: thesisContext
        }
    };
}
}),
"[project]/server/claude/anthropicModel.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Default matches Anthropic Console model id (Haiku 4.5).
 * Override with ANTHROPIC_MODEL, or ANTHROPIC_MODEL_PRIMARY / ANTHROPIC_MODEL_FALLBACK if unset.
 */ __turbopack_context__.s([
    "DEFAULT_ANTHROPIC_MODEL",
    ()=>DEFAULT_ANTHROPIC_MODEL,
    "resolveAnthropicModel",
    ()=>resolveAnthropicModel
]);
const DEFAULT_ANTHROPIC_MODEL = "claude-haiku-4-5-20251001";
function resolveAnthropicModel() {
    const explicit = process.env.ANTHROPIC_MODEL?.trim();
    if (explicit) return explicit;
    const primary = process.env.ANTHROPIC_MODEL_PRIMARY?.trim();
    if (primary) return primary;
    return DEFAULT_ANTHROPIC_MODEL;
}
}),
"[project]/server/claude/enhanceReasons.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "maybeEnhanceReasonsWithClaude",
    ()=>maybeEnhanceReasonsWithClaude
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/client.mjs [app-route] (ecmascript) <export Anthropic as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$claude$2f$anthropicModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/claude/anthropicModel.ts [app-route] (ecmascript)");
;
;
async function maybeEnhanceReasonsWithClaude(params) {
    const key = process.env.ANTHROPIC_API_KEY;
    const enabled = process.env.ENABLE_CLAUDE_NARRATIVE === "true";
    if (!key || !enabled) return params.reasons;
    try {
        const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__["default"]({
            apiKey: key
        });
        const msg = await client.messages.create({
            model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$claude$2f$anthropicModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAnthropicModel"])(),
            max_tokens: 512,
            messages: [
                {
                    role: "user",
                    content: `You are a PE associate. Rewrite the following bullet reasons to be concise, professional, and thesis-aware. Do not change any numbers or the decision. Output JSON only: { "reasons": string[] } with the same count of items as input.\n\nThesis: ${JSON.stringify(params.thesis)}\nDecision: ${params.analysis.decision}\nScore: ${params.analysis.score}\nIndustry: ${params.profile.industry}\n\nInput reasons:\n${params.reasons.map((r, i)=>`${i + 1}. ${r}`).join("\n")}`
                }
            ]
        });
        const text = msg.content[0].type === "text" ? msg.content[0].text : "";
        const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
        const json = JSON.parse(cleaned);
        if (Array.isArray(json.reasons) && json.reasons.length > 0) return json.reasons;
    } catch  {
    // fallback silently
    }
    return params.reasons;
}
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[project]/server/claude/claudeMcpOrchestrator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runClaudeMcpOrchestration",
    ()=>runClaudeMcpOrchestration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/client.mjs [app-route] (ecmascript) <export Anthropic as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$helpers$2f$beta$2f$mcp$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@anthropic-ai/sdk/helpers/beta/mcp.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$client$2f$stdio$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$claude$2f$anthropicModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/claude/anthropicModel.ts [app-route] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("server/claude/claudeMcpOrchestrator.ts")}`;
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
;
;
;
;
;
;
function repoRootFromHere() {
    const here = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url));
    // server/claude/*.ts -> repo root is ../..
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(here, "..", "..");
}
function extractAssistantText(message) {
    const parts = [];
    for (const block of message.content){
        if (block.type === "text") parts.push(block.text);
    }
    return parts.join("\n").trim();
}
function createLoggingMcpClient(inner, log) {
    return {
        async callTool (params) {
            const result = await inner.callTool({
                name: params.name,
                arguments: params.arguments ?? {}
            });
            const content = result.content;
            const preview = content.filter((c)=>c.type === "text" && typeof c.text === "string").map((c)=>c.text).join(" ").slice(0, 800);
            log.push({
                name: params.name,
                arguments: params.arguments ?? {},
                result_preview: preview
            });
            return result;
        }
    };
}
async function runClaudeMcpOrchestration(input) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return {
            ok: false,
            tool_invocations: [],
            model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$claude$2f$anthropicModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAnthropicModel"])(),
            used_mcp_subprocess: false,
            error: "ANTHROPIC_API_KEY not set"
        };
    }
    if (process.env.USE_CLAUDE_MCP_ORCHESTRATION === "false") {
        return {
            ok: false,
            tool_invocations: [],
            model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$claude$2f$anthropicModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAnthropicModel"])(),
            used_mcp_subprocess: false,
            error: "USE_CLAUDE_MCP_ORCHESTRATION is false"
        };
    }
    const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$claude$2f$anthropicModel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAnthropicModel"])();
    const timeoutMs = Math.min(Math.max(Number(process.env.CLAUDE_MCP_TIMEOUT_MS ?? 55000), 5000), 120000);
    const root = repoRootFromHere();
    const toolLog = [];
    const transport = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$client$2f$stdio$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StdioClientTransport"]({
        command: "npx",
        args: [
            "tsx",
            "server/mcp-server.ts"
        ],
        cwd: root,
        stderr: process.env.MCP_SERVER_LOG_STDERR === "true" ? "inherit" : "pipe"
    });
    const mcpClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"]({
        name: "pe-deal-intake-web",
        version: "0.1.0"
    });
    const anthropic = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__Anthropic__as__default$3e$__["default"]({
        apiKey
    });
    const run = async ()=>{
        await mcpClient.connect(transport);
        const listed = await mcpClient.listTools();
        const logging = createLoggingMcpClient(mcpClient, toolLog);
        const tools = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$2f$helpers$2f$beta$2f$mcp$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mcpTools"])(listed.tools, logging);
        const system = `You are a PE deal intake copilot. You MUST use the available MCP tools to retrieve:
1) company profile, 2) financial signals, 3) risk flags, and 4) thesis context for this intake.
Call each tool at least once with the provided company name and thesis. Use realistic arguments.
After tool results are back, write a concise 2–4 sentence analyst-style summary of findings.
Do NOT invent numeric scores or Go/No-Go decisions — the application computes those deterministically from policy.`;
        const user = `Company name: ${input.company_name}
Website (optional): ${input.website || "(none)"}
Thesis (JSON): ${JSON.stringify(input.thesis)}

Instructions: Run the tools, then summarize key facts (sector fit signals, size band, risk themes, data gaps) in professional PE language.`;
        const runner = anthropic.beta.messages.toolRunner({
            model,
            max_tokens: 4096,
            max_iterations: 12,
            system,
            messages: [
                {
                    role: "user",
                    content: user
                }
            ],
            tools
        });
        const final = await runner.runUntilDone();
        const assistant_summary = extractAssistantText(final);
        return {
            ok: true,
            assistant_summary,
            tool_invocations: toolLog,
            model,
            used_mcp_subprocess: true
        };
    };
    try {
        const result = await Promise.race([
            run(),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error(`Claude+MCP orchestration timed out after ${timeoutMs}ms`)), timeoutMs))
        ]);
        return result;
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return {
            ok: false,
            tool_invocations: toolLog,
            model,
            used_mcp_subprocess: true,
            error: msg
        };
    } finally{
        try {
            await mcpClient.close();
        } catch  {
        /* ignore */ }
    }
}
}),
"[project]/app/api/analyze-deal/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shared/schemas.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$mockData$2f$scenarios$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/mockData/scenarios.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$utils$2f$scoring$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/utils/scoring.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$tools$2f$openCorporates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/tools/openCorporates.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$orchestrator$2f$buildNormalizedProfile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/orchestrator/buildNormalizedProfile.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$claude$2f$enhanceReasons$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/claude/enhanceReasons.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$claude$2f$claudeMcpOrchestrator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/server/claude/claudeMcpOrchestrator.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
async function POST(req) {
    try {
        const body = await req.json();
        const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeDealInputSchema"].safeParse(body);
        if (!parsed.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid payload",
                details: parsed.error.flatten()
            }, {
                status: 400
            });
        }
        const input = parsed.data;
        const thesis = input.thesis ?? __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$mockData$2f$scenarios$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_THESIS"];
        const orchestration = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$claude$2f$claudeMcpOrchestrator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runClaudeMcpOrchestration"])({
            company_name: input.company_name,
            website: input.website ?? "",
            thesis
        });
        const claude_mcp = orchestration.ok ? {
            enabled: true,
            used_mcp_subprocess: orchestration.used_mcp_subprocess,
            assistant_summary: orchestration.assistant_summary,
            tool_invocations: orchestration.tool_invocations,
            model: orchestration.model
        } : {
            enabled: false,
            used_mcp_subprocess: orchestration.used_mcp_subprocess,
            tool_invocations: orchestration.tool_invocations,
            model: orchestration.model || undefined,
            fallback_reason: orchestration.error
        };
        const { profile: baseProfile, trace } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$orchestrator$2f$buildNormalizedProfile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildNormalizedProfileFromTools"])({
            company_name: input.company_name,
            website: input.website ?? "",
            thesis
        });
        let profile = {
            ...baseProfile
        };
        const enrichment = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$tools$2f$openCorporates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchOpenCorporatesEnrichment"])(input.company_name);
        if (enrichment.enriched) {
            if (enrichment.sourceLabel) profile.source_labels = [
                ...profile.source_labels,
                enrichment.sourceLabel
            ];
            if (enrichment.headquartersHint && profile.headquarters.toLowerCase() === "unknown") {
                profile.headquarters = enrichment.headquartersHint;
            }
        }
        let analysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$utils$2f$scoring$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeDeterministic"])(profile, thesis);
        if (orchestration.ok && orchestration.assistant_summary) {
            analysis = {
                ...analysis,
                reasons: [
                    ...analysis.reasons,
                    `Claude intake summary (via MCP tools): ${orchestration.assistant_summary}`
                ]
            };
        } else if (!orchestration.ok) {
            analysis = {
                ...analysis,
                reasons: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$server$2f$claude$2f$enhanceReasons$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybeEnhanceReasonsWithClaude"])({
                    reasons: analysis.reasons,
                    analysis,
                    profile: {
                        ...profile,
                        thesis_fit: analysis.score
                    },
                    thesis
                })
            };
        }
        const normalized_profile = {
            ...profile,
            thesis_fit: analysis.score
        };
        const tool_trace = {
            company_profile: trace.company_profile,
            financial_signals: trace.financial_signals,
            risk_flags: trace.risk_flags,
            thesis_context: trace.thesis_context
        };
        const response = {
            ...analysis,
            normalized_profile,
            tool_trace,
            claude_mcp
        };
        const validated = __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeDealResponseSchema"].safeParse(response);
        if (!validated.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Output schema validation failed",
                details: validated.error.flatten()
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(validated.data);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unexpected error while analyzing deal"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1011_zx._.js.map