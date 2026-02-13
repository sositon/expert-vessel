export const createSimpleDiff = (before: string, after: string): string => {
  if (before === after) {
    return 'No changes';
  }

  return `--- BEFORE\n${before}\n+++ AFTER\n${after}`;
};
