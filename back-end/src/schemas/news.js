import joi from "joi";

export const newsSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  image: joi.string().required().messages({
    "String.empty": "Image không được để trống",
    "any.required": "Trường image là bắt buộc",
  }),
  description: joi.string().required().messages({
    "String.empty": "Description không được để trống",
    "any.required": "Trường description là bắt buộc",
  }),
});