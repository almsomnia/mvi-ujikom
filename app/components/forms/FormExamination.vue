<script setup lang="ts">
const props = defineProps<{
   loading?: boolean
   patientId: number
}>()

const emit = defineEmits<{
   (
      e: "submit",
      data: InferSchema<ReturnType<typeof $examinationSchema>["create"]>
   ): void
}>()

const {
   form,
   error,
   loading: formLoading,
   submit,
} = useForm(
   {
      patientId: props.patientId,
      nurseId: useAuthStore().getUser()?.id,
      bodyHeight: undefined,
      bodyWeight: undefined,
      systolic: undefined,
      diastolic: undefined,
   },
   $examinationSchema().create
)

const loading = computed(() => props.loading || formLoading.value)

async function onSubmit() {
   await submit((values) => {
      emit("submit", values)
   })
}
</script>

<template>
   <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-2 gap-4"
   >
      <AppFormField
         label="Body Height"
         required
         :error="error.bodyHeight"
      >
         <InputGroup>
            <InputNumber
               v-model="form.bodyHeight"
               fluid
               :invalid="!!error.bodyHeight"
               :disabled="loading"
            />
            <InputGroupAddon> cm </InputGroupAddon>
         </InputGroup>
      </AppFormField>
      <AppFormField
         label="Body Weight"
         required
         :error="error.bodyWeight"
      >
         <InputGroup>
            <InputNumber
               v-model="form.bodyWeight"
               fluid
               :invalid="!!error.bodyWeight"
               :disabled="loading"
            />
            <InputGroupAddon> kg </InputGroupAddon>
         </InputGroup>
      </AppFormField>
      <AppFormField
         label="Blood Pressure"
         required
         :error="error.systolic || error.diastolic"
         class="col-span-2"
      >
         <InputGroup>
            <InputNumber
               v-model="form.systolic"
               fluid
               :invalid="!!error.systolic"
               :disabled="loading"
            />
            <InputGroupAddon> / </InputGroupAddon>
            <InputNumber
               v-model="form.diastolic"
               fluid
               :invalid="!!error.diastolic"
               :disabled="loading"
            />
            <InputGroupAddon> mmHg </InputGroupAddon>
         </InputGroup>
      </AppFormField>
      <div class="col-span-2 flex flex-row-reverse gap-4">
         <Button
            type="submit"
            label="Submit"
            :loading="loading"
         />
      </div>
   </form>
</template>
