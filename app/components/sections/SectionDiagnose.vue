<script setup lang="ts">
const props = defineProps<{
   data: any
}>()

const listData = computed(() => {
   return [
      { label: "ICD", value: `${props.data?.Icd.code} - ${props.data?.Icd.name}`, colSpan: 2 },
      { label: "Subjective", value: props.data?.subjective },
      { label: "Objective", value: props.data?.objective },
      { label: "Assessment", value: props.data?.assessment },
      { label: "Plan", value: props.data?.plan },
   ]
})
</script>

<template>
   <AppDescriptionList
      :data="listData"
      lines="two"
      :columns="2"
   />
</template>
