import React from "react";
import * as Formsy from "formsy-react";

function oneLetterOneNumberAtLeast(value) {
  if (!value) return false;
  return (
    /[a-zA-Zа-яА-Я]+/.test(value.toString()) && /\d+/.test(value.toString())
  );
}

function allLettersIsLatin(value) {
  if (!value) return false;
  return /[A-z\u00C0-\u00ff]+/g.test(value.toString());
}

function onlyLettersAndNumbers(value) {
  if (!value) return false;
  return /^[a-zA-Z0-9]+$/.test(value.toString());
}

export function minLength(value, number) {
  if (!value) return false;
  return value.toString().length >= number;
}

export function maxLength(value, number) {
  if (!value) return false;
  return value.toString().length <= number;
}

function isPrivacy(value) {
  if (!value) return false;
  return value === true;
}

Formsy.addValidationRule("isLogin", function(values, value) {
  return (
    onlyLettersAndNumbers(value) && minLength(value, 4) && maxLength(value, 16)
  );
});

Formsy.addValidationRule("isSteamLink", function(values, value) {
  return (
    onlyLettersAndNumbers(value) &&
    minLength(value, 4) &&
    maxLength(value, 1000)
  );
});

Formsy.addValidationRule("isPassword", function(values, value) {
  return (
    oneLetterOneNumberAtLeast(value) &&
    minLength(value, 8) &&
    allLettersIsLatin(value)
  );
});

Formsy.addValidationRule("isPrivacy", function(values, value) {
  return (
      isPrivacy(value)
  );
});

export function getValidationForField(validation) {
  switch (validation) {
    case "email":
      return "isEmail";
    case "login":
      return "isLogin";
    case "link":
      return "isSteamLink";
    case "password":
      return "isPassword";
    case "privacy":
      return "isPrivacy";
  }
}
