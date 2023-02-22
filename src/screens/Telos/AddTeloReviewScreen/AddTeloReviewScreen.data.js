import * as Yup from "yup";

export function initialValues() {
  return {
    title: "",
    comment: "",
    rating: 3,
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required("El título es obligatorio"),
    comment: Yup.string().required("El comentario es obligatorio"),
    rating: Yup.number().required("La calificación es obligatoria"),
  });
}
