<script setup lang="ts">
const props = defineProps<{
   data: any[]
}>()

function resolvePrescriptionList(data: any) {
   return [
      { label: "Medicine", value: data.Medicine?.name },
      {
         label: "Medicine Qty",
         value: `${data.medicineQty} ${data.Medicine?.unit ?? ''}`,
      },
      {
         label: "Dosage",
         value: `${data.dosageQty} ${data.dosageUnit} | ${data.dosageTimeOfDay} | ${data.dosageTimeOfMeal}`,
      },
      { label: "Notes", value: data.notes ?? '-', colSpan: 2 },
   ]
}
</script>

<template>
   <div class="grid grid-cols-3 gap-4">
      <template v-for="item in props.data">
         <div class="border-surface-200 rounded-lg border p-4">
            <AppDescriptionList :data="resolvePrescriptionList(item)" lines="two" :columns="2" />
         </div>
      </template>
   </div>
</template>
