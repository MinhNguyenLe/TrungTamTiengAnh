export function useInputNotNull() {
  for (const item of arguments) {
    if (!item) return false;
  }
  return true;
}
