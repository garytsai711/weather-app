import { reactive } from "vue";

export function useValidation(
  schema: Record<string, Array<(value: any) => string | null>>
) {
  const errors = reactive<Record<string, string | undefined>>({});

  function validate(data: Record<string, any>) {
    let valid = true;
    for (const key in schema) {
      const rules = schema[key];
      let errorMsg: string | undefined = undefined;
      for (const rule of rules) {
        const res = rule(data[key]);
        if (res) {
          errorMsg = res;
          break;
        }
      }
      errors[key] = errorMsg;
      if (errorMsg) valid = false;
    }
    return valid;
  }

  return { errors, validate };
}
