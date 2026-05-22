"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"

// -------------------------------------
// CONTEXT
// -------------------------------------

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormItemContext = React.createContext<{ id: string }>({
  id: "",
})

// -------------------------------------
// FORM ROOT
// -------------------------------------

export const Form = FormProvider

// -------------------------------------
// FORM FIELD
// -------------------------------------

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

// -------------------------------------
// HOOK
// -------------------------------------

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-control`,
    formDescriptionId: `${id}-description`,
    formMessageId: `${id}-error`,
    ...fieldState,
  }
}

// -------------------------------------
// FORM ITEM
// -------------------------------------

export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        className={cn(
          "flex flex-col gap-2 w-full", // 🔥 mejor alineación
          className
        )}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

// -------------------------------------
// LABEL
// -------------------------------------

export function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <LabelPrimitive.Root
      htmlFor={formItemId}
      className={cn(
        "text-sm font-medium text-foreground",
        error && "text-destructive",
        className
      )}
      {...props}
    />
  )
}

// -------------------------------------
// CONTROL
// -------------------------------------

export function FormControl({
  ...props
}: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField()

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        error
          ? `${formDescriptionId} ${formMessageId}`
          : formDescriptionId
      }
      aria-invalid={!!error}
      className={cn(
        "w-full", // 🔥 asegura ancho completo
      )}
      {...props}
    />
  )
}

// -------------------------------------
// DESCRIPTION
// -------------------------------------

export function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      id={formDescriptionId}
      className={cn(
        "text-xs text-muted-foreground leading-relaxed", // 🔥 más limpio
        className
      )}
      {...props}
    />
  )
}

// -------------------------------------
// ERROR MESSAGE
// -------------------------------------

export function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message ?? "") : children

  if (!body) return null

  return (
    <p
      id={formMessageId}
      className={cn(
        "text-xs font-medium text-destructive mt-1", // 🔥 mejor separación
        className
      )}
      {...props}
    >
      {body}
    </p>
  )
}