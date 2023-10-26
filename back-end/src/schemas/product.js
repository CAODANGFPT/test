import joi from "joi";

export const productSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  price: joi.number().messages({
    "Number.empty": "Price không được để trống",
    "any.required": "Trường price là bắt buộc",
  }),
  discount: joi.number().required().messages({
    "Number.empty": "Discount không được để trống",
    "any.required": "Trường discount là bắt buộc",
  }),
  image: joi.string().messages({
    "String.empty": "Image không được để trống",
  }),
  brand: joi.string().messages({
    "String.empty": "Image không được để trống",
  }),
  quantity: joi.number().messages({
    "Number.empty": "Quantity không được để trống",
    "any.required": "Trường quantity là bắt buộc",
  }),
  description: joi.string().messages({
    "String.empty": "Description không được để trống",
  }),
  category_id: joi.number().required().messages({
    "String.empty": "CategoryId không được để trống",
    "any.required": "Trường categoryId là bắt buộc",
  }),
});