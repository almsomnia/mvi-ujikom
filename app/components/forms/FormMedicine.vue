<script setup lang="ts">
const props = defineProps<{
   loading?: boolean
}>()

const emit = defineEmits<{
   (e: "submit", data: InferSchema<ReturnType<typeof $medicineSchema>["create"]>): void
}>()

const { form, error, loading: formLoading, submit } = useForm({
   name: undefined,
   unit: undefined,
   price: undefined
}, $medicineSchema().create)

const loading = computed(() => props.loading || formLoading.value)

async function onSubmit() {
   await submit( (values) => {
      emit("submit", values)
   })
}
</script>

<template>
   <form
      @submit.prevent="onSubmit"
      class="flex flex-col gap-4"
   >
      <AppFormField
         label="Medicine Name"
         required
         :error="error.name"
      >
         <InputText
            v-model="form.name"
            fluid
            :invalid="!!error.name"
            :disabled="loading"
         />
      </AppFormField>
      <AppFormField
         label="Medicine Unit"
         required
         :error="error.unit"
      >
         <InputText
            v-model="form.unit"
            fluid
            :invalid="!!error.unit"
            :disabled="loading"
         />
      </AppFormField>
      <AppFormField
         label="Medicine Price"
         required
         :error="error.price"
      >
         <InputNumber
            v-model="form.price"
            fluid
            :invalid="!!error.price"
            :disabled="loading"
            mode="currency"
            currency="IDR"
            locale="id-ID"
            :max-fraction-digits="0"
         />
      </AppFormField>
      <div class="flex flex-row-reverse gap-4">
         <Button
            type="submit"
            label="Submit"
            :loading="loading"
         />
      </div>
   </form>
</template>
