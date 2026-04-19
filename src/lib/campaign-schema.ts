import { z } from "zod";

export const objectiveSchema = z.enum([
  "awareness",
  "traffic",
  "conversions",
  "engagement",
  "video_views",
  "catalog",
]);

export const platformSchema = z.enum(["snap", "tiktok", "insta"]);

export const genderSchema = z.enum(["all", "female", "male"]);

export const audienceSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  countries: z.array(z.string()).min(1, "اختر دولة واحدة على الأقل"),
  language: z.string().min(1, "اللغة مطلوبة"),
  ageRange: z.tuple([z.number().min(13), z.number().max(65)]),
  gender: genderSchema,
  interests: z.array(z.string()),
  customAudiences: z.array(z.string()),
});

export const budgetSchema = z.object({
  type: z.enum(["daily", "lifetime"]),
  amount: z.number().min(20, "الحد الأدنى ٢٠ ر.س"),
  startDate: z.string().min(1, "تاريخ البداية مطلوب"),
  endDate: z.string().optional(),
});

export const creativeSchema = z.object({
  id: z.string(),
  type: z.enum(["video", "image", "carousel"]),
  title: z.string().min(2),
  copy: z.string().min(2).max(500),
  cta: z.string().min(1),
  duration: z.number().optional(),
  url: z.string().optional(),
});

export const campaignSchema = z.object({
  objective: objectiveSchema,
  platforms: z.array(platformSchema).min(1, "اختر منصة واحدة على الأقل"),
  audience: audienceSchema,
  budget: budgetSchema,
  creatives: z.array(creativeSchema).min(1, "أضف إبداع واحد على الأقل"),
});

export type CampaignDraft = z.infer<typeof campaignSchema>;

export const defaultCampaignDraft: Partial<CampaignDraft> = {
  objective: undefined,
  platforms: [],
  audience: {
    name: "",
    countries: ["SA"],
    language: "ar",
    ageRange: [18, 34],
    gender: "all",
    interests: [],
    customAudiences: [],
  },
  budget: {
    type: "daily",
    amount: 200,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: undefined,
  },
  creatives: [],
};

export const OBJECTIVE_OPTIONS = [
  {
    value: "awareness" as const,
    title: "الوعي بالعلامة",
    desc: "الوصول لأكبر عدد من الأشخاص",
    icon: "🌊",
  },
  {
    value: "traffic" as const,
    title: "زيارات الموقع",
    desc: "توجيه المستخدمين لصفحات محددة",
    icon: "🔗",
  },
  {
    value: "conversions" as const,
    title: "التحويلات",
    desc: "شراء، تسجيل، تحميل تطبيق",
    icon: "🎯",
  },
  {
    value: "engagement" as const,
    title: "التفاعل",
    desc: "إعجاب، تعليق، مشاركة",
    icon: "💬",
  },
  {
    value: "video_views" as const,
    title: "مشاهدات الفيديو",
    desc: "ThruPlay و ٦ ثوانٍ",
    icon: "▶︎",
  },
  {
    value: "catalog" as const,
    title: "بيع الكاتالوج",
    desc: "إعلانات ديناميكية للمنتجات",
    icon: "🛍",
  },
];

export const COUNTRY_OPTIONS = [
  { code: "SA", name: "السعودية" },
  { code: "AE", name: "الإمارات" },
  { code: "KW", name: "الكويت" },
  { code: "QA", name: "قطر" },
  { code: "BH", name: "البحرين" },
  { code: "OM", name: "عُمان" },
  { code: "EG", name: "مصر" },
  { code: "JO", name: "الأردن" },
];

export const LANGUAGE_OPTIONS = [
  { code: "ar", name: "العربية" },
  { code: "en", name: "الإنجليزية" },
  { code: "ar_en", name: "العربية + الإنجليزية" },
];

export const INTEREST_OPTIONS = [
  "الموضة والجمال",
  "السفر والسياحة",
  "الطعام والمطاعم",
  "الرياضة واللياقة",
  "التقنية والإلكترونيات",
  "السيارات",
  "العقارات",
  "الأطفال والأسرة",
  "الألعاب",
  "الموسيقى",
  "الأفلام والمسلسلات",
  "الصحة والعافية",
  "الكتب والقراءة",
  "التسوق الإلكتروني",
];

export const CUSTOM_AUDIENCE_OPTIONS = [
  {
    id: "ca1",
    title: "زوار الموقع — آخر ٣٠ يوم",
    size: "١٢٤٬٠٠٠",
  },
  {
    id: "ca2",
    title: "قائمة العملاء (CSV مرفوعة)",
    size: "٤٬٢٨٠",
  },
  {
    id: "ca3",
    title: "Lookalike ٣٪ — مشترين",
    size: "١٫٢ مليون",
  },
  {
    id: "ca4",
    title: "سلة مهجورة — آخر ٧ أيام",
    size: "٨٬٦٥٠",
  },
];

export const CTA_OPTIONS = [
  "تسوق الآن",
  "تعلّم المزيد",
  "سجّل الآن",
  "حمّل التطبيق",
  "اطلب الآن",
  "احجز موعدك",
];
