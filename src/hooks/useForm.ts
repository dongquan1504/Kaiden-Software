/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  SubmitHandler as SubmitHandlerReactHookForm,
  useForm as useReactHookForm,
} from "react-hook-form";

export type SubmitHandler<T extends FieldValues> = SubmitHandlerReactHookForm<T>;

export default function useForm<T extends FieldValues>(
  validationSchema?: any,
  initialValues?: any,
  otherOptions?: any,
) {
  return useReactHookForm<T>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    // validationSchema: validationSchema,
    // validateOnChange: false,
    ...otherOptions,
  });
}
