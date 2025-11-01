import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    // General
                    "Welcome": "Welcome",
                    "State": "State",
                    "District": "District",
                    "Year": "Year",
                    "Select State": "Select State",
                    "Select District": "Select District",
                    "Select Year": "Select Year",
                    "Loading district data...": "Loading district data...",
                    "Unable to load district data.": "Unable to load district data.",
                    "Monthly Performance Report": "Monthly Performance Report",
                    // Metrics / Card Titles and Details
                    "Families Provided Work": "Families Provided Work",
                    "Families Provided Work Desc": "The number of families who got at least one job under MGNREGA this month.",
                    "Families Provided Work Info": "Number of families benefiting during the selected period.",
                    "Total Work-Days Generated": "Total Work-Days Generated",
                    "Total Work-Days Generated Desc": "Total work-days completed by all workers in this month.",
                    "Total Work-Days Generated Info": "Work-days = person × days worked under the scheme.",
                    "Works Completed": "Works Completed",
                    "Works Completed Desc": "Community or farm works finished in the district during this month.",
                    "Works Completed Info": "Total finished projects boosting rural development.",
                    "Funds Used (in Crores)": "Funds Used (in Crores)",
                    "Funds Used (in Crores) Desc": "Total government funds spent on wages and materials this month.",
                    "Funds Used (in Crores) Info": "Public expenditure for jobs and assets.",
                    "Households Worked": "Total Households Worked",
                    "Households Worked Desc": "Households where at least one member got work this month.",
                    "Households Worked Info": "How widely the scheme reached district families.",
                    "Average Wage Rate per Day (₹)": "Average Wage Rate per Day (₹)",
                    "Average Wage Rate per Day (₹) Desc": "Average daily wage paid per person in this district.",
                    "Average Wage Rate per Day (₹) Info": "Shows the direct welfare benefit being provided.",
                    "% Payments within 15 Days": "% Payments within 15 Days",
                    "% Payments within 15 Days Desc": "Percentage of wages processed and paid out within 15 days.",
                    "% Payments within 15 Days Info": "Efficiency of payment system to beneficiaries.",
                    "Individuals Worked": "Individuals Worked",
                    "Individuals Worked Desc": "Number of unique individuals who received work this month.",
                    "Individuals Worked Info": "Total persons benefited under this scheme.",
                    "Could not fetch available states.": "Could not fetch available states.",
                    "Could not fetch districts.": "Could not fetch districts.",
                    "Could not fetch years.": "Could not fetch years.",
                    // ...add other keys as need arises
                }
            },
            hi: {
                translation: {
                    // General
                    "Welcome": "स्वागत है",
                    "State": "राज्य",
                    "District": "ज़िला",
                    "Year": "वर्ष",
                    "Select State": "राज्य चुनें",
                    "Select District": "ज़िला चुनें",
                    "Select Year": "वर्ष चुनें",
                    "Loading district data...": "ज़िला डेटा लोड हो रहा है...",
                    "Unable to load district data.": "ज़िला डेटा लोड नहीं कर पाए।",
                    "Monthly Performance Report": "मासिक प्रदर्शन रिपोर्ट",
                    // Metrics / Card Titles and Details
                    "Families Provided Work": "परिवारों को मिला कार्य",
                    "Families Provided Work Desc": "इस महीने के दौरान कम से कम एक कार्य पाने वाले परिवारों की संख्या।",
                    "Families Provided Work Info": "चयनित अवधि में लाभान्वित परिवारों की संख्या।",
                    "Total Work-Days Generated": "कुल कार्य-दिवस",
                    "Total Work-Days Generated Desc": "इस महीने में सभी श्रमिकों द्वारा पूरे किए गए कार्य-दिवस।",
                    "Total Work-Days Generated Info": "कार्य-दिवस = व्यक्ति × योजना के तहत काम किए गए दिन।",
                    "Works Completed": "समाप्त कार्य",
                    "Works Completed Desc": "इस महीने जिले में पूर्ण समुदाय या कृषि कार्य।",
                    "Works Completed Info": "कुल पूर्ण परियोजनाएँ जो ग्रामीण विकास को बढ़ाती हैं।",
                    "Funds Used (in Crores)": "उपयोग की गई निधि (करोड़ में)",
                    "Funds Used (in Crores) Desc": "इस महीने मजदूरी और सामग्री पर खर्च की गई सरकारी निधि।",
                    "Funds Used (in Crores) Info": "नौकरियों और परिसंपत्तियों के लिए सार्वजनिक व्यय।",
                    "Households Worked": "कुल घरों ने कार्य किया",
                    "Households Worked Desc": "ऐसे घर जहाँ कम से कम एक सदस्य को इस महीने कार्य मिला।",
                    "Households Worked Info": "योजना द्वारा कितने परिवारों तक पहुँचा गया।",
                    "Average Wage Rate per Day (₹)": "औसत दैनिक वेतन दर (₹)",
                    "Average Wage Rate per Day (₹) Desc": "इस जिले में प्रति व्यक्ति दी गई औसत दैनिक मजदूरी।",
                    "Average Wage Rate per Day (₹) Info": "दिया जा रहा प्रत्यक्ष कल्याण लाभ दिखाता है।",
                    "% Payments within 15 Days": "15 दिन में % भुगतान",
                    "% Payments within 15 Days Desc": "15 दिनों के अंदर प्रोसेस किए गए और भुगतान हुए मजदूरी का प्रतिशत।",
                    "% Payments within 15 Days Info": "लाभार्थियों के लिए भुगतान प्रणाली की दक्षता।",
                    "Individuals Worked": "व्यक्तियों ने कार्य किया",
                    "Individuals Worked Desc": "इस महीने कार्य प्राप्त करने वाले अद्वितीय व्यक्तियों की संख्या।",
                    "Individuals Worked Info": "इस योजना के तहत लाभान्वित कुल व्यक्ति।",
                    "Could not fetch available states.": "राज्य नहीं ला सके।",
                    "Could not fetch districts.": "ज़िले नहीं ला सके।",
                    "Could not fetch years.": "वर्ष नहीं ला सके।",
                    // ...add other keys as needed
                }
            }
        },
        lng: localStorage.getItem("language") || "en",
        fallbackLng: "en",
        interpolation: { escapeValue: false }
    });

export default i18n;
