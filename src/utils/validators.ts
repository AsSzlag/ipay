// Validation utility functions

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Polish phone number
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  // Polish phone numbers have 9 digits
  return cleaned.length === 9;
};

/**
 * Validate NIP (Polish tax ID)
 */
export const isValidNIP = (nip: string): boolean => {
  const cleaned = nip.replace(/[^0-9]/g, '');

  if (cleaned.length !== 10) return false;

  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const checksum = cleaned
    .slice(0, 9)
    .split('')
    .reduce((sum, digit, index) => sum + parseInt(digit) * weights[index], 0);

  const control = checksum % 11;
  return control === parseInt(cleaned[9]);
};

/**
 * Validate PESEL (Polish personal ID number)
 */
export const isValidPESEL = (pesel: string): boolean => {
  if (pesel.length !== 11 || !/^\d+$/.test(pesel)) return false;

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const checksum = pesel
    .slice(0, 10)
    .split('')
    .reduce((sum, digit, index) => sum + parseInt(digit) * weights[index], 0);

  const control = (10 - (checksum % 10)) % 10;
  return control === parseInt(pesel[10]);
};

/**
 * Validate required field
 */
export const isRequired = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value.trim().length > 0;
};

/**
 * Validate minimum length
 */
export const minLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

/**
 * Validate maximum length
 */
export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

/**
 * Validate numeric value
 */
export const isNumeric = (value: string): boolean => {
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
};

/**
 * Validate positive number
 */
export const isPositiveNumber = (value: number): boolean => {
  return value > 0;
};
