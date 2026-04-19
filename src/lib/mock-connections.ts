import type { Connection } from "./types";

export const connectionsMock: Connection[] = [];

export const morePlatforms = [
  {
    id: "snap",
    name: "Snap Ads",
    desc: "إعلانات فيديو عمودية للفئة ١٣-٣٤",
    color: "#8A6D00",
    bg: "#FFF4CF",
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    desc: "TikTok Business API — حملات فيديو قصير",
    color: "#111111",
    bg: "#E8E8EA",
  },
  {
    id: "insta",
    name: "Instagram Ads",
    desc: "Meta Marketing API — Instagram و Facebook",
    color: "#D64B7E",
    bg: "#FBE6EE",
  },
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
