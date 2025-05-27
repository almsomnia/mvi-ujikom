import { type AnyObject, type Maybe, type ObjectSchema } from "yup"

type UseFormOptions = {
   validateOnChange?: boolean
   onChangeDebounce?: number
}

/**
 * useForm - A reactive form handler with validation support using schema.
 *
 * @param initialValues - Initial values for the form.
 * @param validationSchema - Schema used for validating the form fields (support yup schema).
 * @param {UseFormOptions} [options] - Optional configuration (e.g., `validateOnChange`, `onChangeDebounce`).
 *
 * @example
 * const {
 *   form, error, loading, submit, reset, validateField
 * } = useForm(initialValues, schema, { validateOnChange: true })
 *
 * await submit(
 *   (values) => { /* success handler *\/ },
 *   (errors) => { /* error handler *\/ }
 * )
 */
export default function <
   V extends ObjectSchema<Maybe<AnyObject>>,
   T extends Record<keyof InferSchema<V>, any>,
>(initialValues: T, validationSchema: V, options?: UseFormOptions) {
   /**
    * Reactive object holding the form's current values
    *
    * Uses the `initialValues` as the starting states.
    * Typing ensures it aligns with the validation schema.
    */
   const form = ref<InferSchema<V> | Record<keyof T, undefined>>(initialValues)

   /**
    * Reactive objects holding validation error messages for each field (if any).
    *
    * It's partial records, meaning not all keys need to exist.
    */
   const error = ref<Partial<Record<keyof T, string>>>({})

   /**
    * A wrapper for yup validation tied to `validationSchema` and the form values.
    */
   const validator = useValidation(validationSchema, form.value)

   /**
    * Boolean ref used to indicate whether form validation is in progress.
    */
   const loading = shallowRef(false)

   /**
    * Runs full validation and calls the appropriate callbacks on success or failure.
    *
    * @param onValidationSuccess - Callback to call when validation is successful
    * @param onValidationError - Optional callback to call when validation fails
    */
   async function submit<S, E>(
      onValidationSuccess: (values: InferSchema<V>) => S,
      onValidationError?: (
         errors: Partial<Record<keyof InferSchema<V>, string>>
      ) => E
   ) {
      error.value = {}
      loading.value = true
      await validator
         .validate(
            async (values) => await onValidationSuccess(values),
            async (e) => {
               error.value = e
               await onValidationError?.(e)
            }
         )
         .finally(() => {
            loading.value = false
         })
   }

   /**
    * Resets the form to initial state.
    *
    * Merges any optional values on top of `initialValues`.
    * Clears out all error messages.
    *
    * @param values - Optional values to merge on top of `initialValues`.
    */
   function reset(values?: Partial<T>) {
      form.value = { ...initialValues, ...values }
      error.value = {}
   }

   /**
    * Validate a single field of the form.
    *
    * @param field - Key of the field to validate
    */
   async function validateField(field: keyof T) {
      try {
         await validationSchema.validateAt(field as string, form.value)
         delete error.value[field]
      } catch (e) {
         const err = e as any
         error.value[field] = err.message
      }
   }

   /**
    * Enables real-time field validation when the form changes.
    * Runs when the `validateOnChange` option is set to `true`.
    */
   if (options?.validateOnChange) {
      const lastForm = ref<typeof form.value>({ ...form.value })
      watchDebounced(
         form,
         (newForm) => {
            const changedKeys = Object.keys(newForm).filter(
               (key) => newForm[key] !== lastForm.value[key]
            )
            changedKeys.forEach((field) => {
               validateField(field as keyof T)
            })
            lastForm.value = { ...newForm }
         },
         { deep: true, debounce: options.onChangeDebounce ?? 200 }
      )
   }

   return {
      form,
      error,
      validator,
      loading,
      submit,
      reset,
      validateField,
   }
}
