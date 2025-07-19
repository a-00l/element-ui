import type { RuleItem, ValidateError, ValidateFieldsError } from "async-validator";
import type { InjectionKey } from "vue";

export interface FormItemProps {
  label: string;
  prop?: string;
}

export interface FormProps {
  model: Record<string, any>;
  rules: Record<string, RuleItem[]>;
}

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FormContext extends FormProps { }

export const FormContextKey: InjectionKey<FormContext> = Symbol('FormContextKey')
