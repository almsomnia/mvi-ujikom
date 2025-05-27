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

const appStore = useAppStore()
const formLoading = shallowRef(false)
function onNewExamination() {
   appStore.showDialog(
      "New Examination",
      h(resolveComponent("FormExamination"), {
         loading: formLoading.value,
         patientId: Number(patientId),
         onSubmit: async (
            data: InferSchema<ReturnType<typeof $examinationSchema>["create"]>
         ) => {
            formLoading.value = true
            const result = await $fetch("/api/examinations", {
               method: "post",
               body: data,
            })
            appStore.notify("success", "Success", result.meta.message)
            appStore.closeDialog()
            formLoading.value = false
            fetchMedicalRecords()
         },
      }),
      {
         width: "600px",
      }
   )
}

function onNewDiagnose(medicalRecordId: number) {
   appStore.showDialog(
      "New Diagnose",
      h(resolveComponent("FormDiagnose"), {
         loading: formLoading.value,
         medicalRecordId,
      }, {
         side: () => h(resolveComponent("FormPrescription"), { class: "flex-1" })
      }),
      {
         width: "98%"
      }
   )
}
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
                        @click="onNewExamination"
                     >
                        <template #icon>
                           <Icon name="lucide:plus" />
                        </template>
                     </Button>
                  </div>
               </template>
               <template #row.visitDate="{ row }">
                  {{ $formatDate((row as any).visitDate) }}
               </template>
               <template #row.actions="{ row }">
                  <div class="flex items-center gap-4">
                     <Button
                        variant="text"
                        v-tooltip="'Diagnose'"
                        @click="onNewDiagnose((row as any).id)"
                     >
                        <template #icon>
                           <Icon name="la:diagnoses" />
                        </template>
                     </Button>
                     <Button
                        variant="text"
                        severity="success"
                        v-tooltip="'Medicine Checkout'"
                     >
                        <template #icon>
                           <Icon name="game-icons:medicines" />
                        </template>
                     </Button>
                  </div>
               </template>
            </AppDataTable>
         </template>
      </Card>
   </div>
</template>
