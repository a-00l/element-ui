import type { RuleItem, ValidateError, ValidateFieldsError } from "async-validator";
import type { InjectionKey } from "vue";

export type FormRules = Record<string, FormItemRules[]>

export interface FormItemRules extends RuleItem {
  trigger?: string;
}

export interface FormItemProps {
  label: string;
  prop?: string;
}

export interface FormItemContext {
  validate: (trigger?: string) => any;
  prop: string;
  clearValidate(): void;
  resetField(): void;
}

export interface FormProps {
  model: Record<string, any>;
  rules: FormRules;
}

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
}

export interface FormInstance {
  validate: () => Promise<any>;
  clearValidate: (prop?: string[]) => void;
  resetFields: (prop?: string[]) => void;
}

export const FormContextKey: InjectionKey<FormContext> = Symbol('FormContextKey')

export const FormItemContextKey: InjectionKey<FormItemContext> = Symbol('FormItemContextKey')
