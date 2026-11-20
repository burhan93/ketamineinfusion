/** Organization / LocalBusiness (MedicalClinic) + Physician + WebSite + WebPage + Breadcrumb graph for the homepage.
 *  TODO: confirm NAP, hours, prices and Dr. Jafri's credentials; replace placeholder domain. */
export const clinicGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": [
        "MedicalClinic",
        "LocalBusiness"
      ],
      "@id": "https://www.balancedketamine.com/#clinic",
      "name": "Balanced Ketamine",
      "alternateName": "Ketamine Infusion Kansas City",
      "description": "Physician-led ketamine infusion clinic in Overland Park, Kansas serving the Kansas City metro for treatment-resistant depression, anxiety, PTSD, bipolar depression, migraine and chronic pain.",
      "url": "https://www.balancedketamine.com/",
      "logo": "https://www.balancedketamine.com/assets/images/ketamine-logo.webp",
      "image": "https://www.balancedketamine.com/assets/images/hero-ketamine-infusion.webp",
      "telephone": "+1-913-871-9888",
      "faxNumber": "+1-913-871-1477",
      "priceRange": "$300–$680 per infusion",
      "currenciesAccepted": "USD",
      "paymentAccepted": "Cash, Credit Card, CareCredit, Advance Care financing",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6700 W 121st St, Ste 300 A1",
        "addressLocality": "Overland Park",
        "addressRegion": "KS",
        "postalCode": "66209",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 38.906004,
        "longitude": -94.6650811
      },
      "hasMap": "https://www.google.com/maps/place/Balanced+Ketamine/@38.906004,-94.6672698,17z",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "08:00",
          "closes": "16:30"
        }
      ],
      "areaServed": [
        "Kansas City, MO",
        "Overland Park, KS",
        "Leawood, KS",
        "Mission Hills, KS",
        "Prairie Village, KS",
        "Lenexa, KS",
        "Olathe, KS",
        "Shawnee, KS"
      ],
      "medicalSpecialty": [
        "Psychiatric",
        "Anesthesia",
        "PainMedicine"
      ],
      "availableService": [
        {
          "@type": "MedicalTherapy",
          "name": "Ketamine infusion therapy for depression"
        },
        {
          "@type": "MedicalTherapy",
          "name": "Ketamine infusion therapy for anxiety"
        },
        {
          "@type": "MedicalTherapy",
          "name": "Ketamine infusion therapy for PTSD"
        },
        {
          "@type": "MedicalTherapy",
          "name": "Ketamine infusion therapy for bipolar depression"
        },
        {
          "@type": "MedicalTherapy",
          "name": "Ketamine infusion therapy for migraine"
        },
        {
          "@type": "MedicalTherapy",
          "name": "Ketamine infusion therapy for chronic and nerve pain"
        }
      ],
      "employee": {
        "@id": "https://www.balancedketamine.com/#dr-raza-jafri"
      },
      "award": "Kansas Top Doctors 2023",
      "sameAs": [
        "https://www.facebook.com/ketaminekansas",
        "https://www.youtube.com/channel/UCwnC_gvtQHK8G7uaF1FDCLQ"
      ]
    },
    {
      "@type": "Physician",
      "@id": "https://www.balancedketamine.com/#dr-raza-jafri",
      "name": "Dr. Raza Jafri",
      "image": "https://www.balancedketamine.com/assets/images/img-drRazaJafri.webp",
      "worksFor": {
        "@id": "https://www.balancedketamine.com/#clinic"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.balancedketamine.com/#website",
      "url": "https://www.balancedketamine.com/",
      "name": "Balanced Ketamine",
      "inLanguage": "en-US",
      "publisher": {
        "@id": "https://www.balancedketamine.com/#clinic"
      }
    },
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.balancedketamine.com/#webpage",
      "url": "https://www.balancedketamine.com/",
      "name": "Ketamine Infusion Therapy Kansas City | Balanced Ketamine",
      "isPartOf": {
        "@id": "https://www.balancedketamine.com/#website"
      },
      "about": {
        "@id": "https://www.balancedketamine.com/#clinic"
      },
      "reviewedBy": {
        "@id": "https://www.balancedketamine.com/#dr-raza-jafri"
      },
      "lastReviewed": "2026-11-20",
      "dateModified": "2026-11-20",
      "breadcrumb": {
        "@id": "https://www.balancedketamine.com/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.balancedketamine.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.balancedketamine.com/"
        }
      ]
    }
  ]
} as const;
