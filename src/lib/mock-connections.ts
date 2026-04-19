import type { Connection } from "./types";

export const connectionsMock: Connection[] = [
  {
    platform: "snap",
    status: "connected",
    connectedAt: "٢٠٢٥/١١/٠٨",
    accountId: "snap_6421039857",
    accountName: "Maha Agency — Snap Business",
    adAccounts: 3,
    lastSyncAt: "منذ ٨ دقائق",
    pixelActive: true,
    eventsApi: true,
    tokenExpiresAt: "بعد ٢٩ دقيقة (تجديد تلقائي)",
    scopes: ["snapchat-marketing-api", "read_user"],
  },
  {
    platform: "tiktok",
    status: "connected",
    connectedAt: "٢٠٢٥/١٠/٢٢",
    accountId: "tiktok_7284930012",
    accountName: "Maha Agency — TikTok Business Center",
    adAccounts: 5,
    lastSyncAt: "منذ ١٢ دقيقة",
    pixelActive: true,
    eventsApi: true,
    tokenExpiresAt: "٢٠٢٧/١٠/٢٢",
    scopes: [
      "user.info.basic",
      "campaign.list",
      "campaign.create",
      "ad.list",
      "ad.create",
    ],
  },
  {
    platform: "insta",
    status: "expiring",
    connectedAt: "٢٠٢٥/٠٩/١٤",
    accountId: "act_928471635829104",
    accountName: "Maha Agency — Meta Business Suite",
    adAccounts: 2,
    lastSyncAt: "منذ ٤٥ دقيقة",
    pixelActive: true,
    eventsApi: false,
    tokenExpiresAt: "بعد ٣ أيام — ينتهي ٢٠٢٦/٠٤/٢٢",
    scopes: [
      "ads_management",
      "ads_read",
      "business_management",
      "instagram_basic",
    ],
  },
];

export const morePlatforms = [
  {
    id: "facebook",
    name: "Facebook Ads",
    desc: "امتداد لـ Meta — نفس حساب Instagram",
    color: "#1877F2",
    bg: "#E7F0FE",
  },
  {
    id: "x",
    name: "X Ads",
    desc: "إعلانات على منصة X (تويتر سابقًا)",
    color: "#111111",
    bg: "#EDEDEF",
  },
  {
    id: "youtube",
    name: "YouTube Ads",
    desc: "عبر Google Ads — فيديو قبل وأثناء",
    color: "#FF0000",
    bg: "#FCE6E6",
  },
  {
    id: "linkedin",
    name: "LinkedIn Ads",
    desc: "استهداف B2B ووظيفي دقيق",
    color: "#0A66C2",
    bg: "#E1EDFA",
  },
];

export const faqItems = [
  {
    q: "هل تُخزَّن كلمات مرور حسابات المنصات؟",
    a: "لا أبدًا. نستخدم OAuth 2.0 فقط — المنصات تصدر رموز وصول مشفّرة نخزنها بـ AES-256، ويمكنك إلغاؤها في أي وقت.",
  },
  {
    q: "كم مرة تُسحب البيانات من المنصات؟",
    a: "افتراضيًا كل ١٥ دقيقة عبر وظيفة خلفية. يمكنك تعديل التردّد إلى ٥ أو ٣٠ أو ٦٠ دقيقة حسب خطتك.",
  },
  {
    q: "لماذا انتهاء صلاحية Meta أقصر؟",
    a: "سياسة Meta تفرض ٦٠ يوم على رموز المستخدمين. نُرسل تذكير قبل ٧ أيام من انتهاء الصلاحية لتجديدها يدويًا.",
  },
  {
    q: "ماذا يحدث لو فصلت منصة؟",
    a: "تتوقف المزامنة فورًا وتُعطّل الحملات المرتبطة بها في gioco، لكن لا تُحذف في المنصة الأصلية. تستطيع إعادة الربط لاحقًا.",
  },
];
