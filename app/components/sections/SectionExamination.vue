<script setup lang="ts">
const props = defineProps<{
   data: any
}>()

const listData = computed(() => {
   return [
      { label: "Body Height", value: `${props.data?.bodyHeight} cm` },
      { label: "Body Weight", value: `${props.data?.bodyWeight} kg` },
      {
         label: "Blood Pressure",
         value: `${props.data?.systolic}/${props.data?.diastolic} mmHg`,
      },
   ]
})
</script>

<template>
   <AppDescriptionList
      :data="listData"
      lines="two"
      :columns="3"
   />
</template>
