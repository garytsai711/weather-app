export function isRequired(label?: string) {
  return (value: any) =>
    value && String(value).trim() !== "" ? null : `This field is required.`;
}

export function isEmail(label?: string) {
  return (value: any) =>
    /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)
      ? null
      : `${label || "Email"} is invalid.`;
}
