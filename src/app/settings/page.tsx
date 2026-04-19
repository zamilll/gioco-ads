"use client";

import { useState } from "react";
import {
  Building2,
  CreditCard,
  Globe,
  Palette,
  UserCog,
  Bell,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Field, SmallCapsLabel } from "@/components/ui/field";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Segmented } from "@/components/ui/segmented";
import { Divider } from "@/components/ui/divider";
import { toast } from "@/components/ui/toast";
import { useUIStore } from "@/lib/stores";

export default function SettingsPage() {
  const { theme, accent, density, setTheme, setAccent, setDensity } =
    useUIStore();
  const [workspaceName, setWorkspaceName] = useState("واعد للتسويق");
  const [workspaceSlug, setWorkspaceSlug] = useState("waad-marketing");
  const [userName, setUserName] = useState("واعد");
  const [userEmail, setUserEmail] = useState("");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifInApp, setNotifInApp] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);
  const [twoFa, setTwoFa] = useState(false);

  const handleSave = () =>
    toast({
      tone: "success",
      title: "تم حفظ التغييرات",
      description: "تحديث إعدادات مساحة العمل والملف الشخصي.",
    });

  return (
    <AppShell crumbTitle="الإعدادات">
      <div className="mb-[22px] flex items-end justify-between gap-[14px]">
        <div>
          <h1 className="text-[24px] font-bold tracking-tightish">الإعدادات</h1>
          <p className="mt-[4px] text-[13px] text-ink-3">
            إدارة مساحة العمل، الملف الشخصي، المظهر، والفواتير.
          </p>
        </div>
        <Button variant="accent" size="md" onClick={handleSave}>
          حفظ التغييرات
        </Button>
      </div>

      <div className="grid gap-[18px] lg:grid-cols-2">
        <Card>
          <CardHeader
            title={
              <span className="inline-flex items-center gap-[8px]">
                <Building2 size={14} strokeWidth={1.8} />
                مساحة العمل
              </span>
            }
            subtitle="معلومات الوكالة أو العلامة التجارية"
          />
          <CardBody className="flex flex-col gap-[14px]">
            <Field label="اسم مساحة العمل" required>
              <Input
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
            </Field>
            <Field label="المعرّف (URL)" hint="يظهر في روابط التقارير">
              <div className="flex items-center gap-[6px]">
                <span className="mono text-[12.5px] text-ink-3">gioco.ad/</span>
                <Input
                  className="mono"
                  value={workspaceSlug}
                  onChange={(e) => setWorkspaceSlug(e.target.value)}
                />
              </div>
            </Field>
            <Field label="المنطقة الزمنية">
              <Select defaultValue="Asia/Riyadh">
                <option value="Asia/Riyadh">آسيا / الرياض (GMT+3)</option>
                <option value="Asia/Dubai">آسيا / دبي (GMT+4)</option>
                <option value="Asia/Kuwait">آسيا / الكويت (GMT+3)</option>
              </Select>
            </Field>
            <Field label="العملة">
              <Select defaultValue="SAR">
                <option value="SAR">ريال سعودي (ر.س)</option>
                <option value="AED">درهم إماراتي (د.إ)</option>
                <option value="KWD">دينار كويتي (د.ك)</option>
                <option value="USD">دولار أمريكي ($)</option>
              </Select>
            </Field>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title={
              <span className="inline-flex items-center gap-[8px]">
                <UserCog size={14} strokeWidth={1.8} />
                الملف الشخصي
              </span>
            }
            subtitle="معلوماتك كمستخدم"
          />
          <CardBody className="flex flex-col gap-[14px]">
            <div className="flex items-center gap-[12px]">
              <div
                className="grid h-[48px] w-[48px] place-items-center rounded-full text-[16px] font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #D6AE7B, #8A6D43)",
                }}
              >
                {userName.slice(0, 1) || "و"}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  toast({
                    tone: "info",
                    title: "تغيير الصورة",
                    description: "ارفع صورة مربعة ≤ ٢ ميجابايت.",
                  })
                }
              >
                تغيير الصورة
              </Button>
            </div>
            <Field label="الاسم" required>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Field>
            <Field label="البريد الإلكتروني" required>
              <Input
                type="email"
                placeholder="name@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Field>
            <Field label="اللغة">
              <Select defaultValue="ar">
                <option value="ar">العربية</option>
                <option value="en">الإنجليزية</option>
              </Select>
            </Field>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title={
              <span className="inline-flex items-center gap-[8px]">
                <Palette size={14} strokeWidth={1.8} />
                المظهر
              </span>
            }
            subtitle="الوضع، الألوان، والكثافة"
          />
          <CardBody className="flex flex-col gap-[14px]">
            <Field label="الوضع">
              <Segmented
                items={[
                  { value: "light", label: "فاتح" },
                  { value: "dark", label: "داكن" },
                ]}
                value={theme}
                onChange={(v) => setTheme(v)}
              />
            </Field>
            <Field label="اللون المميّز">
              <Segmented
                items={[
                  { value: "violet", label: "بنفسجي" },
                  { value: "emerald", label: "زمرّدي" },
                  { value: "amber", label: "كهرماني" },
                  { value: "ink", label: "محايد" },
                ]}
                value={accent}
                onChange={(v) => setAccent(v)}
              />
            </Field>
            <Field label="الكثافة">
              <Segmented
                items={[
                  { value: "comfortable", label: "مريحة" },
                  { value: "compact", label: "مكثّفة" },
                ]}
                value={density}
                onChange={(v) => setDensity(v)}
              />
            </Field>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title={
              <span className="inline-flex items-center gap-[8px]">
                <Bell size={14} strokeWidth={1.8} />
                الإشعارات
              </span>
            }
            subtitle="كيف نُعلمك بالتحديثات"
          />
          <CardBody className="flex flex-col gap-[14px]">
            <ToggleRow
              title="بريد إلكتروني"
              desc="تنبيهات فورية عند أحداث مهمة (انتهاء صلاحية، تجاوز ميزانية)."
              checked={notifEmail}
              onChange={setNotifEmail}
            />
            <Divider />
            <ToggleRow
              title="داخل التطبيق"
              desc="إشعارات في الـtopbar."
              checked={notifInApp}
              onChange={setNotifInApp}
            />
            <Divider />
            <ToggleRow
              title="ملخّص أسبوعي"
              desc="تقرير أداء كل يوم اثنين صباحًا."
              checked={notifWeekly}
              onChange={setNotifWeekly}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title={
              <span className="inline-flex items-center gap-[8px]">
                <CreditCard size={14} strokeWidth={1.8} />
                الفوترة
              </span>
            }
            subtitle="الخطة ووسيلة الدفع"
          />
          <CardBody className="flex flex-col gap-[14px]">
            <div className="rounded-[10px] border border-line bg-chip/40 p-[14px]">
              <SmallCapsLabel>الخطة الحالية</SmallCapsLabel>
              <div className="mt-[6px] flex items-center justify-between">
                <div>
                  <div className="text-[15px] font-bold">تجريبية</div>
                  <div className="text-[12px] text-ink-3">
                    ١٤ يوم — حتى ربط أول منصة
                  </div>
                </div>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() =>
                    toast({
                      tone: "info",
                      title: "ترقية الخطة",
                      description: "ستفتح صفحة مقارنة الخطط قريبًا.",
                    })
                  }
                >
                  ترقية الخطة
                </Button>
              </div>
            </div>
            <Field label="وسيلة الدفع">
              <div className="flex items-center gap-[10px] rounded-[10px] border border-dashed border-line-2 p-[12px] text-[12.5px] text-ink-3">
                <CreditCard size={14} strokeWidth={1.8} />
                لم تُضَف بطاقة بعد
                <Button
                  variant="ghost"
                  size="xs"
                  className="ms-auto"
                  onClick={() =>
                    toast({
                      tone: "info",
                      title: "إضافة بطاقة",
                      description: "سيفتح نموذج بطاقة آمن عبر Stripe قريبًا.",
                    })
                  }
                >
                  إضافة
                </Button>
              </div>
            </Field>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title={
              <span className="inline-flex items-center gap-[8px]">
                <ShieldCheck size={14} strokeWidth={1.8} />
                الأمان
              </span>
            }
            subtitle="كلمة المرور والتحقق بخطوتين"
          />
          <CardBody className="flex flex-col gap-[14px]">
            <div className="flex items-center gap-[12px]">
              <KeyRound size={14} strokeWidth={1.8} className="text-ink-3" />
              <div className="flex-1">
                <div className="text-[13px] font-semibold">كلمة المرور</div>
                <div className="text-[11.5px] text-ink-3">
                  آخر تحديث: لم تُحدّث بعد
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  toast({
                    tone: "info",
                    title: "تغيير كلمة المرور",
                    description: "سيصلك رابط تعيين كلمة مرور جديدة بالبريد.",
                  })
                }
              >
                تغيير
              </Button>
            </div>
            <Divider />
            <ToggleRow
              title="التحقق بخطوتين (2FA)"
              desc="رمز تطبيق المصادقة عند كل تسجيل دخول."
              checked={twoFa}
              onChange={(v) => {
                setTwoFa(v);
                toast({
                  tone: v ? "success" : "info",
                  title: v ? "تم تفعيل 2FA" : "تم إيقاف 2FA",
                  description: v
                    ? "سيُطلب رمز المصادقة في كل تسجيل دخول."
                    : "إيقاف التحقق بخطوتين يُقلل الأمان.",
                });
              }}
            />
            <Divider />
            <div className="flex items-center gap-[12px]">
              <Globe size={14} strokeWidth={1.8} className="text-ink-3" />
              <div className="flex-1">
                <div className="text-[13px] font-semibold">الجلسات النشطة</div>
                <div className="text-[11.5px] text-ink-3">
                  جهاز واحد — هذا الجهاز
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  toast({
                    tone: "info",
                    title: "إدارة الجلسات",
                    description: "عرض الأجهزة المسجّلة وتسجيل الخروج منها.",
                  })
                }
              >
                إدارة
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}

function ToggleRow({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-[12px]">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-ink">{title}</div>
        <div className="mt-[2px] text-[12px] text-ink-3">{desc}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
