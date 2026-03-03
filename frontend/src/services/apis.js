const BASE_URL = import.meta.env.VITE_BASE_URL;
export const endpoints = {
  SENDOTP_API: BASE_URL + "/api/v1/auth/sendotp",
  SUPERADMIN_SIGNUP: BASE_URL + "/api/v1/auth/superadminSignup",
  SUPERADMIN_LOGIN: BASE_URL + "/api/v1/auth/superadminLogin",
  ADMIN_SIGNUP: BASE_URL + "/api/v1/auth/adminSignup",
  ADMIN_LOGIN: BASE_URL + "/api/v1/auth/adminLogin",
  USER_SIGNUP: BASE_URL + "/api/v1/auth/userSignup",
  USER_LOGIN: BASE_URL + "/api/v1/auth/userLogin",
  RESETPASSTOKEN_API: BASE_URL + "/api/v1/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/api/v1/auth/reset-password",
};
export const RequestsPoints = {
  GETALLADMIN_REQUESTS: BASE_URL + "/api/v1/auth/getalladminrequests",
  GETALLSUPERADMINJUNIOR_REQUESTS:
    BASE_URL + "/api/v1/auth/getallsuperadminjuniorrequests",
};
