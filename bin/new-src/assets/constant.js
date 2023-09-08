// export const BaseUrl = "http://127.0.0.1:8000"
// export const BaseUrl = "http://105.96.17.58"
export const BaseUrl = "http://192.168.1.7:80";

// export const BaseUrl = "http://105.96.17.58"

export const responseCreater = (response, message) => {
  return {
    status: response.status,
    data: response.data.data
      ? response.data.data
      : response.data.token
      ? response.data.token
      : response.data
      ? response.data
      : [],
    message: message,
    meta: response.data.meta ? response.data.meta : [],
    links: response.data.links ? response.data.links : [],
  };
};

export const errorResponseCreater = (status, name) => {
  switch (status) {
    case 404:
      return `${name} not Found`;
    case 422:
      return `the giving data is invalid`;
    case 401:
      return `unauthorized`;
    case 405:
      return `Method Not Allowed`;
    case 408:
      return `Request Timeout`;
    case 429:
      return `Too Many Requests`;
    case 500:
      return `Internal Server Error`;
    default:
      "error";
      break;
  }
};

// to get the deffrent element from  two arrays in one array

export function findDifferentElements(array1, array2) {
  const differentElements = [];

  for (const element of array1) {
    if (!array2.includes(element) && !differentElements.includes(element)) {
      differentElements.push(element);
    }
  }

  for (const element of array2) {
    if (!array1.includes(element) && !differentElements.includes(element)) {
      differentElements.push(element);
    }
  }

  return differentElements;
}

// i have  an array contains  strings and an object i want to check if no of the object keys exists in the  array if it exists it'll returns true else false in js

export function checkObjectKeysInArray(array, object) {
  const objectKeys = Object.keys(object);

  for (const key of objectKeys) {
    console.log(array.includes(key));
    if (array?.includes(key)) {
      return true;
    }
  }

  return false;
}

// totatl validation

export const TotalvalidateForm = (formData, validationRules) => {
  const errors = {};

  for (const field in validationRules) {
    const fieldValidations = validationRules[field];
    for (const validation of fieldValidations) {
      const errorMessage = validation(formData[field]);
      if (errorMessage) {
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(errorMessage);
      }
    }
  }

  return errors;
};

//  validationUtils.js
export const validateForm = (formData, validationRules, field) => {
  const errors = {};

  const fieldValidations = validationRules[field];
  for (const validation of fieldValidations) {
    const errorMessage = validation(formData[field]);
    if (errorMessage) {
      if (!errors[field]) {
        errors[field] = [];
      }
      errors[field].push(errorMessage);
    }
  }

  return errors;
};

// handle image

// export const handleImageSubmit = (formData , images) => {
//   images.forEach((imageDataUrl, index) => {
//     // Convert the Data URL back to a Blob for each image
//     const byteString = atob(imageDataUrl.split(',')[1]);
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     const blob = new Blob([ab], { type: 'image/png' });

//     // Append each image as a file to the FormData
//     formData.append(`img`, blob);
//   });
// }

export const handleImageSubmit = (formData, images, uploadType, tag) => {
  if (uploadType === "single") {
    const byteString = atob(images.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: "image/png" });
    formData.append(tag, blob);
  } else {
    images.forEach((imageDataUrl, index) => {
      // Convert the Data URL back to a Blob for each image
      const byteString = atob(imageDataUrl.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: "image/png" });

      // Append each image as a file to the FormData
      formData.append(tag, blob);
    });
  }
};

import React from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";

export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTableContents(index) {
  if (index < 0 || index >= table.length) {
    throw new Error("Index out of bounds");
  }
  return table[index];
}

export function formatDateReclamation(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const [day, month, year] = formattedDate.split(" ");
  const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;
  const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
  return `${day} ${formattedMonth} ${year}`;
}

export function formatDateLanguages(dateStr, lang) {
  // Split the date string into day, month, and year
  const date = dateStr ? dateStr : "2022-01-01";
  const [year, month, day] = date.split("-");

  // Define an array of month names in both English and Arabic
  const monthNames = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    fr: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    ar: [
      "جانفي",
      "فيفري",
      "مارس",
      "أفريل",
      "ماي",
      "جوان",
      "جويلية",
      "أوت",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
  };

  // Get the month name based on the month number and language code
  const monthName = monthNames[lang][parseInt(month) - 1];

  // Combine the day, month name, and year into a formatted date string
  let formattedDate;
  if (lang === "en") {
    formattedDate = `${day} ${monthName} ${year}`;
  } else if (lang === "ar") {
    formattedDate = `${day} ${monthName} ${year}`;
  } else if (lang === "fr") {
    formattedDate = `${day} ${monthName} ${year}`;
  }

  // Return the formatted date string
  return formattedDate;
}

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export const swalWithBootstrapButtons = Swal.mixin({});

export const SuccessModel = Swal.mixin({
  icon: "success",
});

export const ErrorModel = Swal.mixin({
  icon: "error",
  title: "error",
});

// swalWithBootstrapButtons.fire({
//   title: 'Are you sure?',
//   text: "You won't be able to revert this!",
//   icon: 'warning',
//   showCancelButton: true,
//   confirmButtonText: 'Yes, delete it!',
//   cancelButtonText: 'No, cancel!',
//   reverseButtons: true
// }).then((result) => {
//   if (result.isConfirmed) {
//     swalWithBootstrapButtons.fire(
//       'Deleted!',
//       'Your file has been deleted.',
//       'success'
//     )
//   } else if (
//     /* Read more about handling dismissals below */
//     result.dismiss === Swal.DismissReason.cancel
//   ) {
//     swalWithBootstrapButtons.fire(
//       'Cancelled',
//       'Your imaginary file is safe :)',
//       'error'
//     )
//   }
// })

export const useTop = (props) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [props]);
};

export function calculateReadingTime(text) {
  // average reading speed of 200 words per minute
  const averageWordsPerMinute = 200;

  // remove any HTML tags from the text
  const strippedText = text.replace(/<[^>]+>/g, "");

  // count the number of words in the text
  const wordCount = strippedText.split(/\s+/).length;

  // calculate the number of minutes based on the word count and average reading speed
  const readingTimeInMinutes = wordCount / averageWordsPerMinute;

  // round up the reading time to the nearest integer
  return Math.ceil(readingTimeInMinutes);
}

// width finder

export const useWindowWidthFinder = (setState) => {
  // window width
  React.useEffect(() => {
    function handleResize() {
      setState(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
};

export function scheduleAppointment(date) {
  const currentDate = new Date();
  const selectedDate = new Date(date);

  // Compare selected date with current date
  if (selectedDate.getDay() === 5 || selectedDate.getDay() === 6) {
    return {
      states: false,
      message: {
        en: "Appointments are only available during the week.",
        ar: "لا تتوفر المواعيد إلا خلال الأسبوع.",
      },
    };
  } else if (selectedDate < currentDate) {
    return {
      states: false,
      message: {
        en: "Appointments cannot be scheduled for dates in the past.",
        ar: "لا يمكن حجز المواعيد في تواريخ سابقة.",
      },
    };
  } else if (selectedDate.toDateString() === currentDate.toDateString()) {
    return {
      states: false,
      message: {
        en: "Appointments can only be scheduled tomorrow or later.",
        ar: "يمكن فقط حجز المواعيد غدًا أو لاحقًا.",
      },
    };
  }

  return { states: true, message: "Appointment created." };
}

export const videoTimingHandler = (time) => {
  const parts = time.split(".");
  const numbersBeforeDecimal = parts[0];
};

// handling files

export const handleFileInputChange = (setState, Ref) => {
  const file = Ref.current.files[0];
  if (file && file.type === "image/jpeg") {
    const reader = new FileReader();

    reader.onloadend = () => {
      setState(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  } else {
    ErrorModel.fire({
      title: "Error",
      text: "file must be a JPG image.",
    });
  }
};

//  delete model

export const deleteModel = (deleteFun) => {
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons
          .fire("Deleted!", "Your file has been deleted.", "success")
          .then(() => {
            deleteFun();
          })
          .catch(() => {});
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your  file is safe :)",
          "error"
        );
      }
    });
};
