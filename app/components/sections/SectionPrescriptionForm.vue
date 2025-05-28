<script setup lang="ts">
const props = defineProps<{
   medicalRecordId: number
   disableForm?: boolean
   title?: string
   refreshDataFn?: Function
}>()

const query = ref({
   page: 1,
   perPage: 100,
   medicalRecordId: props.medicalRecordId,
})
const { data, status, refresh } = await useLazyFetch("/api/prescriptions", {
   method: "get",
   query,
   transform: (res) => res.data,
})

const appStore = useAppStore()
const isFormActive = shallowRef(false)
const formLoading = shallowRef(false)

async function onPrescriptionSubmit(
   values: InferSchema<ReturnType<typeof $prescriptionSchema>["create"]>
) {
   formLoading.value = true
   const result = await $fetch("/api/prescriptions", {
      method: "post",
      body: values,
   })
   appStore.notify("success", "Success", result.meta.message)
   refresh()
   props.refreshDataFn?.()
   isFormActive.value = false
   formLoading.value = false
}

function resolvePrescriptionList(data: any) {
   return [
      { label: "Medicine", value: data.Medicine.name },
      {
         label: "Medicine Qty",
         value: `${data.medicineQty} ${data.Medicine.unit}`,
      },
      {
         label: "Dosage",
         value: `${data.dosageQty} ${data.dosageUnit} | ${data.dosageTimeOfDay} | ${data.dosageTimeOfMeal}`,
      },
      { label: "Notes", value: data.notes },
   ]
}
</script>

<template>
   <div class="flex flex-col gap-4">
      <p v-if="props.title" class="text-base font-semibold">
         {{ props.title }}
      </p>
      <div class="grid grid-cols-3 gap-4">
         <template v-for="item in (data?.data as any[])">
            <div class="border-surface-200 rounded-lg border p-4">
               <AppDescriptionList :data="resolvePrescriptionList(item)" />
            </div>
         </template>
         <div
            v-if="isFormActive"
            class="border-surface-200 col-span-1 rounded-lg border p-4"
         >
            <FormPrescription
               :medical-record-id="props.medicalRecordId"
               :loading="formLoading"
               @submit="onPrescriptionSubmit"
               @cancel="isFormActive = false"
            />
         </div>
         <div
            v-else-if="!props.disableForm && !isFormActive"
            class="border-surface-200 flex items-center justify-center rounded-lg border p-4"
         >
            <Button
               label="New Item"
               variant="text"
               @click="isFormActive = true"
            >
               <template #icon>
                  <Icon name="lucide:plus" />
               </template>
            </Button>
         </div>
      </div>
   </div>
</template>
