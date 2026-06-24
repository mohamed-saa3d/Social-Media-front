export const endpoints = {
  register: "/api/auth/register",
  login: "/api/auth/login",
  verifyOtp: "/api/otp/verify-email",
  resendOtp: "/api/otp/resend-verification",
  posts: "/api/posts",
} as const;
