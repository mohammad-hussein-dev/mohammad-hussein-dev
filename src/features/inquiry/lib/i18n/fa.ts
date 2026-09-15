/**
 * @fileoverview Persian strings — Persian only, no mixing.
 * @description
 *   Defines the translation schema interface. English (en.ts) must
 *   structurally implement this exact shape to guarantee parity.
 *
 * @author    Mohammad Hussein
 * @version   1.0.1
 * @since     2026-09-15
 */

/**
 * Canonical translation schema. Every locale file must satisfy this shape.
 * Do NOT use `as const` — the interface is the source of truth.
 */
export interface TranslationSchema {
  entry: {
    title: string;
    subtitle: string;
    modes: {
      guided: string;
      freeform: string;
      chat: string;
      terminal: string;
    };
    somethingElse: string;
    somethingElseHint: string;
    chatHint: string;
  };
  steps: {
    intent: string;
    domain: string;
    scope: string;
    engagement: string;
    timeline: string;
    contact: string;
    review: string;
    success: string;
  };
  nav: {
    next: string;
    back: string;
    skip: string;
    submit: string;
    reset: string;
    discuss: string;
    custom: string;
  };
  depth: {
    label: string;
    quick: string;
    detailed: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
    telegram: string;
    github: string;
    organization: string;
    description: string;
  };
  validation: {
    name_too_short: string;
    invalid_email: string;
    invalid_phone: string;
  };
  success: {
    title: string;
    subtitle: string;
    trackingCode: string;
    sendTelegram: string;
    sendEmail: string;
    copyMessage: string;
    copyCompact: string;
    copied: string;
    copyHint: string;
  };
  estimate: {
    weeks: string;
    cost: string;
    weeksUnit: string;
  };
}

/**
 * Persian translations. Persian only — never mix languages.
 */
export const fa: TranslationSchema = {
  entry: {
    title: 'چطور می‌توانم کمکتان کنم؟',
    subtitle: 'یک مسیر را انتخاب کنید یا آزادانه بنویسید',
    modes: {
      guided:   'انتخاب از لیست',
      freeform: 'نوشتن آزاد',
      chat:     'گفتگوی مستقیم',
      terminal: 'ترمینال',
    },
    somethingElse: 'موضوع دیگر',
    somethingElseHint: 'هر چیزی که در لیست نیست — آزادانه بنویسید',
    chatHint: 'مطمئن نیستید؟ مستقیم صحبت کنیم',
  },
  steps: {
    intent:     'نوع درخواست',
    domain:     'حوزه‌های پروژه',
    scope:      'مشخصات فنی',
    engagement: 'نحوه همکاری',
    timeline:   'زمان و بودجه',
    contact:    'اطلاعات تماس',
    review:     'مرور نهایی',
    success:    'تکمیل',
  },
  nav: {
    next: 'بعدی',
    back: 'قبلی',
    skip: 'رد کردن',
    submit: 'ثبت درخواست',
    reset: 'ثبت درخواست جدید',
    discuss: 'مشورت با من',
    custom: 'پاسخ دلخواه',
  },
  depth: {
    label: 'سطح جزئیات',
    quick: 'سریع',
    detailed: 'کامل',
  },
  contact: {
    name:         'نام و نام خانوادگی',
    email:        'ایمیل',
    phone:        'شماره تماس (اختیاری)',
    telegram:     'تلگرام (اختیاری)',
    github:       'گیت‌هاب (اختیاری)',
    organization: 'نام سازمان (اختیاری)',
    description:  'توضیحات تکمیلی (اختیاری)',
  },
  validation: {
    name_too_short: 'نام باید حداقل ۲ کاراکتر باشد',
    invalid_email:  'فرمت ایمیل صحیح نیست',
    invalid_phone:  'فرمت شماره تماس صحیح نیست',
  },
  success: {
    title: 'درخواست شما ثبت شد',
    subtitle: 'برای تکمیل، متن آماده را از یکی از کانال‌های زیر ارسال کنید.',
    trackingCode: 'کد پیگیری',
    sendTelegram: 'ارسال در تلگرام',
    sendEmail:    'ارسال با ایمیل',
    copyMessage:  'کپی متن کامل',
    copyCompact:  'کپی متن خلاصه',
    copied:       'کپی شد',
    copyHint:     'برای اینستاگرام، واتساپ، یا هر کانال دیگر',
  },
  estimate: {
    weeks: 'زمان تقریبی',
    cost: 'بازه هزینه',
    weeksUnit: 'هفته',
  },
};
