<script setup lang="ts">
const props = defineProps<{
   loading?: boolean
}>()

const emit = defineEmits<{
   (
      e: "submit",
      data: InferSchema<ReturnType<typeof $patientSchema>["create"]>
   ): void
}>()

const {
   form,
   error,
   loading: formLoading,
   submit,
} = useForm(
   {
      name: undefined,
      identityNumber: undefined,
      phoneNumber: undefined,
      placeOfBirth: undefined,
      dateOfBirth: undefined,
      gender: undefined,
      address: undefined,
   },
   $patientSchema().create
)

const loading = computed(() => props.loading || formLoading.value)
const genderOptions = [
   { label: "Male", value: "M" },
   { label: "Female", value: "F" },
]

async function onSubmit() {
   await submit((values) => {
      emit("submit", values)
   })
}
</script>

<template>
   <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-3 gap-4"
   >
      <AppFormField
         label="Patient Name"
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
         label="Identity Number"
         required
         :error="error.identityNumber"
      >
         <InputText
            v-model="form.identityNumber"
            fluid
            :invalid="!!error.identityNumber"
            :disabled="loading"
         />
      </AppFormField>
      <AppFormField
         label="Phone Number"
         required
         :error="error.phoneNumber"
      >
         <InputText
            v-model="form.phoneNumber"
            fluid
            :invalid="!!error.phoneNumber"
            :disabled="loading"
         />
      </AppFormField>
      <AppFormField
         label="Place of Birth"
         required
         :error="error.placeOfBirth"
      >
         <InputText
            v-model="form.placeOfBirth"
            fluid
            :invalid="!!error.placeOfBirth"
            :disabled="loading"
         />
      </AppFormField>
      <AppFormField
         label="Date of Birth"
         required
         :error="error.dateOfBirth"
      >
         <DatePicker
            v-model="form.dateOfBirth"
            fluid
            :invalid="!!error.dateOfBirth"
            :disabled="loading"
         />
      </AppFormField>
      <AppFormField
         label="Gender"
         required
         :error="error.placeOfBirth"
      >
         <Select
            v-model="form.gender"
            fluid
            :options="genderOptions"
            option-label="label"
            option-value="value"
            :invalid="!!error.gender"
            :disabled="loading"
         />
      </AppFormField>
      <AppFormField
         label="Address"
         required
         :error="error.address"
         class="col-span-3"
      >
         <Textarea
            v-model="form.address"
            fluid
            :rows="3"
            auto-resize
            :invalid="!!error.address"
            :disabled="loading"
         />
      </AppFormField>
      <div class="col-span-3 flex flex-row-reverse gap-4">
         <Button
            type="submit"
            label="Submit"
            :loading="loading"
         />
      </div>
   </form>
</template>
