export const getCurrentUserId = (): string => {
  const userId = process.env.DEV_FIXED_USER_ID ?? '00000000-0000-0000-0000-000000000001';
  return userId;
};
