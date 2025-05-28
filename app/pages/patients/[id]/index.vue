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
      h(
         resolveComponent("FormDiagnose"),
         {
            loading: formLoading.value,
            medicalRecordId,
            onSubmit: async (
               values: InferSchema<ReturnType<typeof $diagnoseSchema>["create"]>
            ) => {
               formLoading.value = true
               const result = await $fetch("/api/diagnoses", {
                  method: "post",
                  body: values,
               })
               appStore.notify("success", "Success", result.meta.message)
               formLoading.value = false
               appStore.closeDialog()
               fetchMedicalRecords()
            },
         },
      ),
      {
         width: "50%",
      }
   )
}

function onNewPrescription(medicalRecordId: number) {
   appStore.showDialog(
      "New Prescription",
      h(resolveComponent("SectionPrescriptionForm"), {
         medicalRecordId,
      }),
      {
         width: "90%"
      }
   )
}

const authStore = useAuthStore()
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
                        v-if="authStore.getUser()?.refType == 'nurse'"
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
                  {{ $formatDate((row as any).visitDate, "YYYY-MM-DD HH:mm") }}
               </template>
               <template #row.actions="{ row }">
                  <div class="flex items-center gap-4">
                     <Button
                        variant="text"
                        @click="navigateTo(`/medical-records/${(row as any).id}`)"
                     >
                        <template #icon>
                           <Icon name="lucide:eye" />
                        </template>
                     </Button>
                     <Button
                        v-if="authStore.getUser()?.refType == 'doctor'"
                        variant="text"
                        v-tooltip="'Diagnose'"
                        :disabled="(row as any).status !== 'WAITING_FOR_DIAGNOSIS'"
                        @click="onNewDiagnose((row as any).id)"
                     >
                        <template #icon>
                           <Icon name="la:diagnoses" />
                        </template>
                     </Button>
                     <Button
                        v-if="authStore.getUser()?.refType == 'pharmacist'"
                        variant="text"
                        severity="success"
                        v-tooltip="'Prescription'"
                        @click="onNewPrescription((row as any).id)"
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
