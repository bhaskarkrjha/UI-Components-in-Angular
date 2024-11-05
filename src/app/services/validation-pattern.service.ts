import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationPatternService {
  public email;

  public aplhanumericNSpace;

  public aplhanumericNSpaceDashUnderscore;

  public alphabetWithoutSpace;

  public alphaNumericWithoutSpace;

  public alphaNumericDescription;

  public alphaNumericDisplayName;

  public alphaNumericFilePath;

  public alphaNumericLowerCase;

  public alphaNumericWithoutSpaceSpecialCharacters;

  public WorkflowValidation;

  public AD_Group;

  public alphanumericSpaceNChar;

  public ipSubnetMask;

  public numeric;

  public numberOnly;

  public numericNoZeroStart;

  public alphaNumericLowerCaseUnderscore;

  public alphaNumericNunderscore;

  public alphabetWithoutSpaceNfirstletter;

  public alphaNumericLowerCaseWithoutUnderscore;

  public unitValidation;

  public alphaNumericLookupCharacters;

  public alphaNumericLowerCaseWithhyphen;

  public alphaNSpace;

  public alphaNumbericDashUnderScore;

  public alphaNumericLowerCaseWithnohyphenend;

  public alphaNumericFilePathWithAsterisk;

  public alphaNumericOnly;

  public noSpaceValidation;

  public ipv4Validation;

  public ipv6Validation;

  panNumberValidation: RegExp;

  mobileNumberValidation: RegExp;
  
  postalCodeValidation: RegExp;

  constructor() {
    this.email = '^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
    // this.email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
    this.aplhanumericNSpace = /^[a-zA-Z0-9 ]*$/;
    this.aplhanumericNSpaceDashUnderscore = /^[a-zA-Z0-9-_\.\sg]*$/; // Allow space, dash, underscore
    this.alphabetWithoutSpace = /^[A-Za-z0-9-_.]*$/; //allows only _ in special characters
    this.alphaNumericWithoutSpace = /^[A-Za-z0-9-_\\.]*$/; // dosent allow space
    this.alphaNumericDescription = /^[A-Za-z0-9-_@,&. ]*$/; //alpha numeric with space
    this.alphaNumericDisplayName = /^[A-Za-z0-9_,-. &]*$/; //alpha numeric with space
    this.alphaNumericFilePath = /^[A-Za-z0-9-_.:/]*$/; //fielpath
    this.alphaNumericLowerCase = /^[a-z0-9]*$/;
    this.WorkflowValidation = /^[A-Za-z0-9\\s]*$/; //Workflow valdaition
    this.AD_Group = /^[A-Za-z0-9\\s\-_.]*$/;
    this.alphanumericSpaceNChar = /^[A-Za-z0-9-_. ]*$/;
    this.ipSubnetMask = /^((\b|\.)(0|1|2(?!5(?=6|7|8|9)|6|7|8|9))?\d{1,2}){4}(-((\b|\.)(0|1|2(?!5(?=6|7|8|9)|6|7|8|9))?\d{1,2}){4}|\/(2[4-9]$|3[0-2]))$/; // allows betwwen 0.0.0.0/24 to 255.255.255.255/32
    this.alphaNumericWithoutSpaceSpecialCharacters = /^[A-Za-z0-9-_@,&.]*$/;
    this.alphaNumericWithoutSpaceSpecialCharacters = /^[A-Za-z0-9-!$%^*(),_@./#&+-\\]*$/;
    this.alphaNumericWithoutSpaceSpecialCharacters = /^[A-Za-z0-9-!$%^*(),_@./#&+-\\.]*$/;
    this.unitValidation = /^[a-zA-Z]*$/;
    this.alphaNumericLookupCharacters = /^[A-Za-z0-9-!$%^*(),_@./#&+-\\.{}'|"\]]*$/;
    this.numeric = /^[1-9]*$/; //Allow numbers only except 0
    this.numberOnly = /^[0-9]*$/; //Allow numbers only
    this.numericNoZeroStart = /^[1-9][0-9]*$/; //To match a number starting with any digit but zero
    this.alphaNumericLowerCaseUnderscore = /^[a-z][a-z0-9_]*$/;
    this.alphaNumericNunderscore = /^[a-zA-z][a-zA-Z0-9_]*$/;
    this.alphabetWithoutSpaceNfirstletter = /^[a-zA-Z][A-Za-z0-9-_.]*$/;
    this.alphaNumericLowerCaseWithoutUnderscore = /^[a-z][a-z0-9]*$/; // alphanumeric with lower case allowed and first letter should be alphabet
    this.alphaNumericLowerCaseWithhyphen = /^[a-z][a-z0-9-]*$/; // alphanumeric with lower case and hyphen allowed and first letter should be alphabet
    this.alphaNSpace = /^[a-zA-Z ]*$/; //alpha with space
    this.alphaNumericLowerCaseWithnohyphenend = /^[a-z]([-a-z0-9]*[a-z0-9]+$)?$/; //alphanumeric with lower case and hyphen allowed and first letter should be alphabet not end with hyphen
    this.alphaNumericFilePathWithAsterisk = /^[A-Za-z0-9-_.:\/\*]*$/; // allow  asterisk filepath
    this.alphaNumericOnly = /^[a-zA-Z0-9]*$/; //only alphabets, numbers are allowed
    this.alphaNumbericDashUnderScore = /^[a-zA-Z0-9][a-zA-Z0-9-_]*$/; //alphanumeric with dash and underscore allowed but not as first letter
    this.noSpaceValidation = /^(\s+\S+\s*)*(?!\s).*$/; // space not allowed in starting ;
    this.panNumberValidation = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/; // to match PAN Card Format
    this.mobileNumberValidation = /^((\\+91-?)|0)?[0-9]{10}$/; // Allowing Mobie Numbers starting with 0 or +91- with 10 Digits Only 
    this.postalCodeValidation = /^\d{6}$/;
    this.ipv4Validation = /(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/; // Regex expression for validating IPv4
    this.ipv6Validation = /((([0-9a-fA-F]){1,4})\:){7}([0-9a-fA-F]){1,4}/; // Regex expression for validating IPv6
  }
}
