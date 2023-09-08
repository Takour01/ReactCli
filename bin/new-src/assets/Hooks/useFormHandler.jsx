import React, { useState } from "react";
import useFormValidation from "./useFormValidation";

const useFormHandler = () => {
  // creating the states of the add form

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [title_fr, setTitle_fr] = useState("");
  const [title_ar, setTitle_ar] = useState("");
  const [desc, setDesc] = useState("");
  const [desc_fr, setDesc_fr] = useState("");
  const [desc_ar, setDesc_ar] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [choice, setChoice] = useState("");

  // input change handler
  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const titleChange = (e) => setTitle(e.target.value);
  const title_frChange = (e) => setTitle_fr(e.target.value);
  const title_arChange = (e) => setTitle_ar(e.target.value);
  const descChange = (e) => setDesc(e.target.value);
  const desc_frChange = (e) => setDesc_fr(e.target.value);
  const desc_arChange = (e) => setDesc_ar(e.target.value);
  const linkChange = (e) => setLink(e.target.value);
  const dateChange = (e) => setDate(e.target.value);
  const choiceChange = (e) => setChoice(e.target.value);

  const isDateValid = (value) => {
    if (!value) {
      return "Date is required";
    }

    const parsedDate = new Date(value);
    if (isNaN(parsedDate.getTime())) {
      return "Invalid date format";
    }

    return null; // Valid date
  };

  const lenghtLimit = (value, name, lenght) =>
    value.length >= lenght ? null : `${name} must be at least 100 characters`;

  const isLinkValid = (value) => {
    if (!value) {
      return "Link is required";
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlPattern.test(value)) {
      return "Invalid URL format";
    }

    return null; // Valid URL
  };

  const isArabicValid = (value) => {
    if (!value) {
      return "Arabic text is required";
    }

    const arabicPattern = /[\u0600-\u06FF\s]/;

    if (!arabicPattern.test(value)) {
      return "Invalid Arabic text";
    }

    return null; // Valid Arabic text
  };

  const isEnglishValid = (value) => {
    if (!value) {
      return "English text is required";
    }

    const englishPattern = /^[A-Za-z\s]+$/;

    if (!englishPattern.test(value)) {
      return "Invalid English text";
    }

    return null; // Valid English text
  };

  const validationRules = {
    title: [
      (value) => (value ? null : "English title is required"),
      (value) => lenghtLimit(value, "title", 100),
      isEnglishValid,
    ],
    desc: [
      (value) => (value ? null : "English description is required"),
      isEnglishValid,
    ],
    title_ar: [
      (value) => (value ? null : "Arabix title is required"),
      (value) => lenghtLimit(value, "title", 100),
      isArabicValid,
    ],
    desc_ar: [
      (value) => (value ? null : "Arabic description is required"),
      isArabicValid,
    ],
    title_fr: [
      (value) => (value ? null : "French title is required"),
      (value) => lenghtLimit(value, "title", 100),
    ],
    desc_fr: [(value) => (value ? null : "French description is required")],
    link: [(value) => (value ? null : "link is required"), isLinkValid],
    date: [(value) => (value ? null : "Date is required"), isDateValid],
    choice: [(value) => (value ? null : "service is required")],
    email: [
      (value) => (value ? null : "Email is required"),
      (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email format"),
    ],
    password: [(value) => lenghtLimit(value, "Password", 6)],
  };
  const validationErrors = useFormValidation(
    {
      email,
      title,
      title_fr,
      title_ar,
      desc,
      desc_fr,
      desc_ar,
      link,
      date,
      choice,
      password,
    },
    validationRules
  );
  return {
    title,
    titleChange,
    setTitle,
    title_fr,
    title_frChange,
    setTitle_fr,
    title_ar,
    title_arChange,
    setTitle_ar,
    desc,
    descChange,
    setDesc,
    desc_fr,
    desc_frChange,
    setDesc_fr,
    desc_ar,
    desc_arChange,
    setDesc_ar,
    link,
    linkChange,
    setLink,
    date,
    dateChange,
    setDate,
    email,
    password,
    setPassword,
    setEmail,
    emailHandler,
    passwordHandler,
    choice,
    setChoice,
    choiceChange,
    validationErrors: validationErrors.validationErrors,
    handleBlur: validationErrors.handleBlur,
    handleErrors: validationErrors.handleErrors,
  };
};

export default useFormHandler;
