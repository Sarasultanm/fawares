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
            ///////
            "Registration List":"Registration List",
            "Logout":"Logout",
            "Enter the email you'd like to receive the newsletter on." : "Enter the email you'd like to receive the newsletter on.",
            "Please Wait" : "Please wait...",
            "Number of Horses Registered":"Number of Horses Registered",
            "Number of Riders Registered":"Number of Riders Registered",
            "Registrations per Schedule":"Registrations per Schedule,",
            "Dashboard":"Dashboard",
            "Registrations": "Registrations",
            "Search":"Search",
            "Full Name" : "Full Name",
            "Error" : "Error",
            "Something went wrong. Try again" : "Something went wrong. Try again.",
            "Success":"Success",
            "Getting data" : "Getting data",
            "Search by rider name, federation ID, horse name or horse registration number" : "Search by rider name, federation ID, horse name or horse registration number.", 
            "Show" : "Show",
            "Hide" : "Hide",
            "Horse name is required" : "Horse name is required",
            "Horse registration number is required" : "Horse registration number is required",
            "Back" : "Back",
            "You have successfully registered!" : "You have successfully registered!",
            "Rider name is required" : "Rider name is required",
            "Rider age is required" : "Rider age is required",
            "Age must be a number" : "Age must be a number",
            "Federation ID Number is required" : "Federation ID Number is required",
            "Register Again" : "Register Again",
            "Proceed" : "Proceed",
            "First Day" : "First Day",
            "Second Day" : "Second Day",
            "Please select schedule for second and first day." : "Please select schedule for second and first day.",
            "Or" :  "Or"

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
          "Rules Description": "شروط التسجيل في بطولات رمكة لخيول الأعمار الصغيرة",
          "Rule 1": "- لا يسمح للفارس تغيير مستوى الجواد حتى نهاية موسم رمكة (موسم رمكة يبدأ من بداية السنة الميلادية وينتهي بنهايتها).",
          "Rule 2": "- يحق للفارس المشاركة بجوادين بكل شوط.",
          "Rule 3": "- لا يسمح للجياد المشاركة في المستوى الأقل لعمرها إلا إذا كانت أول سنة لمشاركتها.",
          "Rule 4": "- يجب على الفرسان إحضار(جواز/وثيقة) جيادهم فبل بداية البطولة أو رفعها على موقع التسجيل.",
          "Rule 5": "- تخضع أشواط رمكة للقوانين الدولية فيما يخص أشواط الخيول الصغيرة وكل ما يستجد في ذلك.",
          "Rule 6": "- لا يسمح للـ (المبتدأين / الأطفال أقل من 16 سنة) بالمشاركة في بطولات رمكة للأعمار الصغيرة.",
          "Google sign in": "يرجى تسجيل الدخول باستخدام حساب Google الخاص بك لمتابعة التسجيل.",
          "Horse Document Instruction": "يمكنك تحميل أو إحضار الوثيقة الرسمية للحصان خلال المسابقة.",
          Login: "تسجيل الدخول",
          "Sign Up": "سجل",
          "Email is required": "البريد الإلكتروني مطلوب",
          "Password is required": "كلمة المرور مطلوبة",
          Password: "كلمة المرور",
          Schedules: "الجداول",
          Close: "إغلاق",
          "Password and confirm password does not match.": "كلمة المرور وتأكيد كلمة المرور غير متطابقين.",
          "You have successfully registered! You may now proceed to login.": "لقد قمت بالتسجيل بنجاح! يمكنك الآن الاستمرار في تسجيل الدخول.",
          "An error occurred. Please try again.": "حدث خطأ. يرجى المحاولة مرة أخرى.",
          "Full name is required": "الاسم الكامل مطلوب",
          Email: "البريد الإلكتروني",
          "Confirm password is required": "تأكيد كلمة المرور مطلوب",
          "Confirm Password": "تأكيد كلمة المرور",
          "Registration List": "قائمة التسجيل",
          Logout: "تسجيل الخروج",
          "Enter the email you'd like to receive the newsletter on.": "أدخل البريد الإلكتروني الذي ترغب في استلام النشرة الإخبارية عليه.",
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
          "Search by rider name, federation ID, horse name or horse registration number": "البحث حسب اسم الفارس أو رقم هوية الاتحاد أو اسم الحصان أو رقم تسجيل الحصان.",
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
          "Proceed": "المتابعة",
          "First Day": "اليوم الأول",
          "Second Day": "اليوم الثاني",
          "Please select schedule for second and first day.": "يرجى اختيار الجدول الزمني لليوم الثاني والأول.",
          "Or": "أو"
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
