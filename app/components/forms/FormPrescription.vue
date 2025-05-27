<script setup lang="ts">
const props = defineProps<{
   loading?: boolean
   medicalRecordId: number
}>()

const emit = defineEmits<{
   (
      e: "submit",
      data: InferSchema<ReturnType<typeof $prescriptionSchema>["create"]>
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
      medicineId: undefined,
      medicineQty: undefined,
      dosageQty: undefined,
      dosageUnit: undefined,
      dosageTimeOfDay: undefined,
      dosageTimeOfMeal: undefined,
      notes: undefined,
   },
   $prescriptionSchema().create
)

const loading = computed(() => props.loading || formLoading.value)

const selectedTimeOfDay = ref<string[]>([])
watch(selectedTimeOfDay, (value) => {
   form.value.dosageTimeOfDay = value.join(", ")
})

const selectedTimeOfMeal = ref<string[]>([])
watch(selectedTimeOfMeal, (value) => {
   form.value.dosageTimeOfMeal = value.join(", ")
})

async function onSubmit() {
   await submit((values) => {
      emit("submit", values)
   })
}
</script>

<template>
   <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-2 place-content-baseline gap-4"
   >
      <AppFormField
         label="Medicine"
         required
         :error="error.medicineId"
      >
         <DropdownMedicine
            v-model="form.medicineId"
            :invalid="!!error.medicineId"
            :disabled="loading"
         />
      </AppFormField>
      <AppFormField
         label="Medicine Qty"
         required
         :error="error.medicineQty"
      >
         <InputNumber
            v-model="form.medicineQty"
            :invalid="!!error.medicineQty"
            :disabled="loading"
         />
      </AppFormField>
      <AppFormField
         label="Dosage"
         required
         :error="error.dosageQty || error.dosageUnit"
         class="col-span-2"
      >
         <InputGroup>
            <InputNumber
               v-model="form.dosageQty"
               :invalid="!!error.dosageQty"
               :disabled="loading"
               placeholder="Qty"
            />
            <InputText
               v-model="form.dosageUnit"
               :invalid="!!error.dosageUnit"
               :disabled="loading"
               placeholder="Unit"
            />
         </InputGroup>
      </AppFormField>
      <AppFormField
         label="Usage Time of Day"
         required
         :error="error.dosageTimeOfDay"
      >
         <div class="grid grid-cols-2 gap-2">
            <template
               v-for="day in ['Morning', 'Afternoon', 'Evening', 'Night']"
            >
               <div class="flex items-center gap-1.5">
                  <Checkbox
                     v-model="selectedTimeOfDay"
                     :value="day"
                     :input-id="`cb-${day}`"
                  />
                  <label :for="`cb-${day}`">{{ day }}</label>
               </div>
            </template>
         </div>
      </AppFormField>
      <AppFormField
         label="Usage Time of Meal"
         required
         :error="error.dosageTimeOfMeal"
      >
         <div class="grid grid-cols-2 gap-2">
            <template
               v-for="meal in ['Before Meal', 'After Meal', 'While Mealing']"
            >
               <div class="flex items-center gap-1.5">
                  <Checkbox
                     v-model="selectedTimeOfMeal"
                     :value="meal"
                     :input-id="`cb-${meal}`"
                  />
                  <label :for="`cb-${meal}`">{{ meal }}</label>
               </div>
            </template>
         </div>
      </AppFormField>
      <AppFormField
         label="Notes"
         :error="error.notes"
         class="col-span-2"
      >
         <Textarea
            v-model="form.notes"
            :rows="1"
            auto-resize
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
</template>
