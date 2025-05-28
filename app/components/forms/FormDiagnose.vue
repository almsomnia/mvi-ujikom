<script setup lang="ts">
const props = defineProps<{
   loading?: boolean
   medicalRecordId: number
}>()

const emit = defineEmits<{
   (
      e: "submit",
      data: InferSchema<ReturnType<typeof $diagnoseSchema>["create"]>
   ): void
}>()

const {
   form,
   error,
   loading: formLoading,
   submit,
} = useForm(
   {
      medicalRecordId: props.medicalRecordId,
      doctorId: useAuthStore().getUser()?.id,
      icdId: undefined,
      subjective: undefined,
      objective: undefined,
      assessment: undefined,
      plan: undefined,
      notes: undefined,
   },
   $diagnoseSchema().create
)
const isFormBlocked = shallowRef(false)
const {
   data: diagnoseData,
   refresh: fetchDiagnose,
} = await useLazyFetch("/api/diagnoses", {
   method: "get",
   query: {
      medicalRecordId: props.medicalRecordId,
   },
   transform: (res) => {
      if (res.data.total > 0) {
         isFormBlocked.value = true
         useAppStore().notify("warn", "Warn", "Diagnose already exists")
      }
   },
})

const loading = computed(() => props.loading || formLoading.value)

async function onSubmit() {
   await submit((values) => {
      emit("submit", values)
   })
}
</script>

<template>
   <div class="flex flex-col">
      <BlockUI :blocked="isFormBlocked">
         <form
            @submit.prevent="onSubmit"
            class="grid flex-1 grid-cols-2 gap-4"
         >
            <AppFormField
               label="ICD"
               required
               :error="error.icdId"
               class="col-span-2"
            >
               <DropdownIcd
                  v-model="form.icdId"
                  :invalid="!!error.icdId"
                  :disabled="loading"
               />
            </AppFormField>
            <AppFormField
               label="Subjective"
               required
               :error="error.subjective"
            >
               <Textarea
                  v-model="form.subjective"
                  :rows="2"
                  :invalid="!!error.subjective"
                  :disabled="loading"
               />
            </AppFormField>
            <AppFormField
               label="Objective"
               required
               :error="error.objective"
            >
               <Textarea
                  v-model="form.objective"
                  :rows="2"
                  :invalid="!!error.objective"
                  :disabled="loading"
               />
            </AppFormField>
            <AppFormField
               label="Assessment"
               required
               :error="error.assessment"
            >
               <Textarea
                  v-model="form.assessment"
                  :rows="2"
                  :invalid="!!error.assessment"
                  :disabled="loading"
               />
            </AppFormField>
            <AppFormField
               label="Plan"
               required
               :error="error.plan"
            >
               <Textarea
                  v-model="form.plan"
                  :rows="2"
                  :invalid="!!error.plan"
                  :disabled="loading"
               />
            </AppFormField>
            <AppFormField
               label="Notes"
               :error="error.notes"
               class="col-span-2"
            >
               <Textarea
                  v-model="form.notes"
                  :rows="2"
                  :invalid="!!error.notes"
                  :disabled="loading"
               />
            </AppFormField>
            <div class="col-span-2 flex flex-row-reverse gap-4">
               <Button
                  type="submit"
                  label="Submit"
                  :loading="loading"
               />
            </div>
         </form>
      </BlockUI>
      <Divider
         layout="horizontal"
         v-if="!!$slots.append"
      />
      <slot name="append" />
   </div>
</template>
