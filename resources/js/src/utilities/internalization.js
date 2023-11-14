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
            Rules: "Rules and regulations of the competition",
            "Rules Description":
                "Conditions for registration in the Ramaka Championships for young horses.",
            "Rule 1":
                "The rider is not allowed to change the level of the horse until the end of the Ramkah season (the Ramkah season begins at the beginning of the calendar year and ends at the end)",
            "Rule 2":
                "The rider has the right to participate with two horses in every race.",
            "Rule 3":
                "Horses are not allowed to participate at the level below their age unless it is their first year of participation",
            "Rule 4":
                "Riders must bring their horses’ passport/document before the start of the tournament or upload it to the registration site.",
            "Rule 5":
                "Ramkah races are subject to international laws regarding the races of young horses and everything new in that regard.",
            "Rule 6":
                "Beginners/children under 16 years old are not allowed to participate in Ramka tournaments for young ages.",
            "Google sign in":
                "Please log in with your Google account to proceed to the registration.",
            "Horse Document Instruction":
                "You can upload or bring the horse official document during the competition.",
            ////
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
            "Rules Description":
                "شروط التسجيل في بطولات رمكة لخيول الأعمار الصغيرة",
            "Rule 1":
                "- لا يسمح للفارس تغيير مستوى الجواد حتى نهاية موسم رمكة (موسم رمكة يبدأ من بداية السنة الميلادية وينتهي بنهايتها).",
            "Rule 2": "- يحق للفارس المشاركة بجوادين بكل شوط.",
            "Rule 3":
                "- لا يسمح للجياد المشاركة في المستوى الأقل لعمرها إلا إذا كانت أول سنة لمشاركتها.",
            "Rule 4":
                "- يجب على الفرسان إحضار(جواز/وثيقة) جيادهم فبل بداية البطولة أو رفعها على موقع التسجيل.",
            "Rule 5":
                "- تخضع أشواط رمكة للقوانين الدولية فيما يخص أشواط الخيول الصغيرة وكل ما يستجد في ذلك.",
            "Rule 6":
                "- لا يسمح للـ (المبتدأين / الأطفال أقل من 16 سنة) بالمشاركة في بطولات رمكة للأعمار الصغيرة.",
            "Google sign in":
                "يرجى تسجيل الدخول باستخدام حساب Google الخاص بك لمتابعة التسجيل.",
            "Horse Document Instruction":
                "يمكنك تحميل أو إحضار الوثيقة الرسمية للحصان خلال المسابقة.",
        },
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
