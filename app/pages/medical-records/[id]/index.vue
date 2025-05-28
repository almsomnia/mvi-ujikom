<script setup lang="ts">
const id = useRoute().params.id as string

const { data, status, refresh } = await useLazyFetch(
   `/api/medical-records/${id}`,
   {
      transform: (res) => res.data,
   }
)

const examinationData = computed(() => (data.value as any)?.Examination)
const diagnoseData = computed(() => (data.value as any)?.Diagnose)
const prescriptionData = computed(() => (data.value as any)?.Prescriptions)

const tabValue = shallowRef(0)
const tabs = computed(() => [
   {
      value: 0,
      label: "Examination",
      component: h(resolveComponent("SectionExamination"), {
         data: examinationData.value,
      }),
   },
   {
      value: 1,
      label: "Diagnose",
      component: h(resolveComponent("SectionDiagnose"), {
         data: diagnoseData.value,
      }),
   },
   {
      value: 2,
      label: "Prescription",
      component: h(resolveComponent("SectionPrescription"), {
         data: prescriptionData.value,
      }),
   },
])
</script>

<template>
   <div class="flex flex-col gap-4">
      <SectionPatient :data="(data as any)?.Patient" />
      <Tabs :value="tabValue">
         <Card>
            <template #header>
               <TabList>
                  <Tab
                     v-for="tab in tabs"
                     :value="tab.value"
                  >
                     {{ tab.label }}
                  </Tab>
               </TabList>
            </template>
            <template #content>
               <TabPanels>
                  <TabPanel
                     v-for="tab in tabs"
                     :value="tab.value"
                  >
                     <component :is="tab.component" />
                  </TabPanel>
               </TabPanels>
            </template>
         </Card>
      </Tabs>
   </div>
</template>
