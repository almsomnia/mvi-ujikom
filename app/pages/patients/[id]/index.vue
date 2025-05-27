<script setup lang="ts">
const patientId = useRoute().params.id as string

const { data, status, refresh } = await useLazyFetch(
   `/api/patients/${patientId}`,
   {
      method: "get",
      transform: (data) => data.data,
   }
)

const mrQuery = ref({
   page: 1,
   perPage: 10,
   patientId: patientId,
})
const {
   data: medicalRecords,
   status: mrStatus,
   execute: fetchMedicalRecords,
} = await useLazyFetch("/api/medical-records", {
   transform: (data) => data.data,
   query: mrQuery.value,
})
watchExcludable(mrQuery, () => fetchMedicalRecords(), {
   exclude: ["patientId"],
})

const mrColumns = [
   { header: "Visit date", field: "visitDate" },
   { header: "Status", field: "status" },
   { header: "Actions", field: "actions" },
]

function onNew() {}
</script>

<template>
   <div class="flex flex-col gap-4">
      <SectionPatient :data="data" />
      <Card>
         <template #title>
            <p class="text-base">Medical Records</p>
         </template>
         <template #content>
            <AppDataTable
               :rows="medicalRecords?.data ?? []"
               :columns="mrColumns"
               :loading="mrStatus === 'pending'"
               :total="medicalRecords?.total ?? 0"
               v-model:page="mrQuery.page"
               v-model:per-page="mrQuery.perPage"
            >
               <template #header>
                  <div class="flex items-center justify-end">
                     <Button
                        label="Examination"
                        @click="onNew"
                     >
                        <template #icon>
                           <Icon name="lucide:plus" />
                        </template>
                     </Button>
                  </div>
               </template>
               <!-- <template #row.actions="{ row }">
                  <div class="flex items-center gap-4">
                     <Button
                        variant="text"
                        @click="navigateTo(`/patients/${(row as any).id}`)"
                     >
                        <template #icon>
                           <Icon name="lucide:eye" />
                        </template>
                     </Button>
                  </div>
               </template> -->
            </AppDataTable>
         </template>
      </Card>
   </div>
</template>
