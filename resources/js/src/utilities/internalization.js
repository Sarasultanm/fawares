import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "Rider Information": "Rider Information",
            "Horse Details": "Horse Details",
            Schedule: "Schedule",
            "Rider name": "Rider name",
            "Rider age": "Rider age",
            "Federation ID Number": "Federation ID Number",
            "Horse Name": "Horse Name",
            "Pedigree (if available)": "Pedigree (if available)",
            "Horse Registration Number": "Horse Registration Number",
            "Horse Official Document": "Horse Official Document",
            "Select Schedule": "Select Schedule",
            Submit: "Submit",
            Next: "Next",
            "Google sign in":
                "Please log in with your Google account to proceed to the registration.",
            "Horse Document Instruction":
                "You can upload or bring the horse official document during the competition.",
            Login: "Login",
            "Sign Up": "Sign Up",
            "Email is required": "Email is required",
            "Password is required": "Password is required",
            Password: "Password",
            Schedules: "Schedules",
            Close: "Close",
            "Password and confirm password does not match.":
                "Password and confirm password does not match.",
            "You have successfully registered! You may now proceed to login.":
                "You have successfully registered! You may now proceed to login.",
            "An error occurred. Please try again.":
                "An error occurred. Please try again.",
            "Full name is required": "Full name is required",
            "Email is required": "Email is required",
            Email: "Email",
            Password: "Password",
            "Password is required": "Password is required",
            "Confirm password is required": "Confirm password is required",
            "Confirm Password": "Confirm Password",
            "Registration List": "Registration List",
            Logout: "Logout",
            "Enter the email you'd like to receive the newsletter on.":
                "Enter the email you'd like to receive the newsletter on.",
            "Please Wait": "Please wait...",
            "Number of Horses Registered": "Number of Horses Registered",
            "Number of Riders Registered": "Number of Riders Registered",
            "Registrations per Schedule": "Registrations per Schedule,",
            Dashboard: "Dashboard",
            Registrations: "Registrations",
            Search: "Search",
            "Full Name": "Full Name",
            Error: "Error",
            "Something went wrong. Try again":
                "Something went wrong. Try again.",
            Success: "Success",
            "Getting data": "Getting data",
            "Search by rider name, federation ID, horse name or horse registration number":
                "Search by rider name, federation ID, horse name or horse registration number.",
            Show: "Show",
            Hide: "Hide",
            "Horse name is required": "Horse name is required",
            "Horse registration number is required":
                "Horse registration number is required",
            Back: "Back",
            "You have successfully registered!":
                "You have successfully registered!",
            "Rider name is required": "Rider name is required",
            "Rider age is required": "Rider age is required",
            "Age must be a number": "Age must be a number",
            "Federation ID Number is required":
                "Federation ID Number is required",
            "Register Again": "Register Again",
            Proceed: "Proceed",
            "First Day": "First Day",
            "Second Day": "Second Day",
            "Please select at least one schedule.":
                "Please select at least one schedule.",
            Or: "Or",
            "Reset Selection": "Reset Selection",
            Rules: "Rules and regulations of the competition",
            ramaka_rules_desc:
                "Conditions for registration in the Ramaka Championships for young horses.",
            ramaka_rule_1:
                "The rider is not allowed to change the horse’s level until the end of the Ramkah season (the Ramkah season begins at the beginning of the calendar year and ends at its end).",
            ramaka_rule_2:
                "The rider has the right to participate with two horses in each race.",
            ramaka_rule_3:
                "Horses are not allowed to participate at the level below their age unless it is their first year of participation.",
            ramaka_rule_4:
                "Horsemen must bring their horses’ passport/document before the start of the tournament or upload it to the registration site.",
            ramaka_rule_5:
                "Ramkah races are subject to international laws regarding races for young horses and everything new in that regard.",
            ramaka_rule_6:
                "Beginners/children under 16 years old are not allowed to participate in Ramka tournaments for young ages.",
            fawares_rules_desc: "Rules And Regulations of Fawares competition",
            fawares_rule_1:
                "The rider is allowed to participate with two horses for each level.",
            fawares_rule_2:
                "The horse is allowed to participate in one race during the day, with the exception of the beginners race.",
            fawares_rule_3: "Commitment to the official tournament uniform.",
            fawares_rule_4:
                "Adherence to the regulations of the Saudi Equestrian Federation.",
            fawares_rule_5:
                "Championship participants must be members of the Saudi Equestrian Federation.",
            fawares_rule_6: "Registration opens starting December 14th.",
            fawares_rule_7: "Registration closes on December 20.",
            fawares_rule_8:
                "Payment of subscriptions before entering the rounds.",
            fawares_rule_9:
                "Horses are prohibited from participating in the federation’s races for horses of young ages participating in the Knights’ races.",
        },
    },
    ar: {
        translation: {
            "Rider Information": "معلومات الراكب",
            "Horse Details": "تفاصيل الحصان",
            Schedule: "جدول",
            "Rider name": "اسم الراكب",
            "Rider age": "عمر الراكب",
            "Federation ID Number": "رقم هوية الاتحاد",
            "Horse Name": "اسم الحصان",
            "Pedigree (if available)": "النسب (إن وجد)",
            "Horse Registration Number": "رقم تسجيل الحصان",
            "Horse Official Document": "الوثيقة الرسمية للحصان",
            "Select Schedule": "حدد الجدول الزمني",
            Submit: "يُقدِّم",
            Next: "التالي",
            Rules: "شروط التسجيل في اشواط بطولات رمكة لخيول الاعمار الصغيره",
            "Google sign in":
                "يرجى تسجيل الدخول باستخدام حساب Google الخاص بك لمتابعة التسجيل.",
            "Horse Document Instruction":
                "يمكنك تحميل أو إحضار الوثيقة الرسمية للحصان خلال المسابقة.",
            Login: "تسجيل الدخول",
            "Sign Up": "سجل",
            "Email is required": "البريد الإلكتروني مطلوب",
            "Password is required": "كلمة المرور مطلوبة",
            Password: "كلمة المرور",
            Schedules: "الجداول",
            Close: "إغلاق",
            "Password and confirm password does not match.":
                "كلمة المرور وتأكيد كلمة المرور غير متطابقين.",
            "You have successfully registered! You may now proceed to login.":
                "لقد قمت بالتسجيل بنجاح! يمكنك الآن الاستمرار في تسجيل الدخول.",
            "An error occurred. Please try again.":
                "حدث خطأ. يرجى المحاولة مرة أخرى.",
            "Full name is required": "الاسم الكامل مطلوب",
            Email: "البريد الإلكتروني",
            "Confirm password is required": "تأكيد كلمة المرور مطلوب",
            "Confirm Password": "تأكيد كلمة المرور",
            "Registration List": "قائمة التسجيل",
            Logout: "تسجيل الخروج",
            "Enter the email you'd like to receive the newsletter on.":
                "أدخل البريد الإلكتروني الذي ترغب في استلام النشرة الإخبارية عليه.",
            "Please Wait": "يرجى الانتظار...",
            "Number of Horses Registered": "عدد الخيول المسجلة",
            "Number of Riders Registered": "عدد الفرسان المسجلين",
            "Registrations per Schedule": "التسجيلات حسب الجدول الزمني",
            Dashboard: "لوحة القيادة",
            Registrations: "التسجيلات",
            Search: "بحث",
            "Full Name": "الاسم الكامل",
            Error: "خطأ",
            "Something went wrong. Try again": "حدث خطأ. حاول مرة أخرى.",
            Success: "نجاح",
            "Getting data": "الحصول على البيانات",
            "Search by rider name, federation ID, horse name or horse registration number":
                "البحث حسب اسم الفارس أو رقم هوية الاتحاد أو اسم الحصان أو رقم تسجيل الحصان.",
            Show: "عرض",
            Hide: "إخفاء",
            "Horse name is required": "اسم الحصان مطلوب",
            "Horse registration number is required": "رقم تسجيل الحصان مطلوب",
            Back: "العودة",
            "You have successfully registered!": "لقد قمت بالتسجيل بنجاح!",
            "Rider name is required": "اسم الفارس مطلوب",
            "Rider age is required": "عمر الفارس مطلوب",
            "Age must be a number": "يجب أن يكون العمر رقمًا",
            "Federation ID Number is required": "رقم هوية الاتحاد مطلوب",
            "Register Again": "التسجيل مرة أخرى",
            Proceed: "المتابعة",
            "First Day": "اليوم الأول",
            "Second Day": "اليوم الثاني",
            "Please select at least one schedule.":
                "الرجاء تحديد جدول زمني واحد على الأقل",
            Or: "أو",
            ramaka_rules_desc:
                "شروط التسجيل في بطولات رمكة لخيول الأعمار الصغيرة",
            ramaka_rule_1:
                "- لا يسمح للفارس تغيير مستوى الجواد حتى نهاية موسم رمكة (موسم رمكة يبدأ من بداية السنة الميلادية وينتهي بنهايتها).",
            ramaka_rule_2: "- يحق للفارس المشاركة بجوادين بكل شوط.",
            ramaka_rule_3:
                "- لا يسمح للجياد المشاركة في المستوى الأقل لعمرها إلا إذا كانت أول سنة لمشاركتها.",
            ramaka_rule_4:
                "- يجب على الفرسان إحضار(جواز/وثيقة) جيادهم فبل بداية البطولة أو رفعها على موقع التسجيل.",
            ramaka_rule_5:
                "- تخضع أشواط رمكة للقوانين الدولية فيما يخص أشواط الخيول الصغيرة وكل ما يستجد في ذلك.",
            ramaka_rule_6:
                "- لا يسمح للـ (المبتدأين / الأطفال أقل من 16 سنة) بالمشاركة في بطولات رمكة للأعمار الصغيرة.",
            fawares_rules_desc: "شروط التسجيل في بطولات فوارس",
            fawares_rule_1: "يسمح للفارس المشاركة بجوادين لكل مستوى",
            fawares_rule_2:
                "يسمح للجواد المشاركة بشوط واحد خلال اليوم باستثناء شوط المبتدئين.",
            fawares_rule_3: "الالتزام بالزي الرسمي للبطولة",
            fawares_rule_4: "الالتزام بأنظمة الاتحاد السعودي للفروسية",
            fawares_rule_5:
                " يجب على المشاركين بالبطولة ان يكونوا اعضاء بالاتحاد السعودي للفروسية",
            fawares_rule_6: "يفتح التسجيل بداية من يوم ١٤ ديسمبر",
            fawares_rule_7: "يغلق التسجيل يوم ٢٠ ديسمبر",
            fawares_rule_8: "تسديد الاشتراكات قبل دخول الأشواط",
            fawares_rule_9:
                "يمنع الخيول المشاركة في اشواط الاتحاد لخيول الاعمار الصغيرة المشاركة في اشواط فوارس",
            "Reset Selection": "إعادة تعيين التحديد",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
