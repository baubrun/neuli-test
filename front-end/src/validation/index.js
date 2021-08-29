import * as yup from "yup";

/**
 * Validate form inputs
 * @param {{var1: string, var2: string}} v
 */
export const validateSchema = (v) => {
  try {
    const schema = yup.object().shape({
      var1: yup.number().required().min(1).max(10),
      var2: yup.number().required().min(1).max(10),
    });
    return schema.validateSync(v);
  } catch (error) {
    return { err: error.message };
  }
};
