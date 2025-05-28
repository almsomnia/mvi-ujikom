<script setup lang="ts">
const authStore = useAuthStore()

const query = ref({
   page: 1,
   perPage: 10,
})

const columns = [
   { header: "Patient", field: "Patient.name" },
   { header: "Visit date", field: "visitDate" },
   { header: "Status", field: "status" },
   { header: "Actions", field: "actions" },
]

const { data, status, refresh } = await useLazyFetch("/api/medical-records", {
   method: "get",
   query: query.value,
   transform: (data) => {
      return data.data
   },
})
watch(
   query,
   () => {
      refresh()
   },
   { deep: true }
)

const formLoading = shallowRef(false)
const appStore = useAppStore()
function onNewDiagnose(medicalRecordId: number) {
   appStore.showDialog(
      "New Diagnose",
      h(resolveComponent("FormDiagnose"), {
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
            refresh()
         },
      }),
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
         refreshDataFn: () => refresh()
      }),
      {
         width: "90%",
      }
   )
}

async function onDetails(data: any) {
   await navigateTo(`/medical-records/${data.id}`)
}
</script>

<template>
   <Card>
      <template #content>
         <AppDataTable
            :rows="data?.data ?? []"
            :columns="columns"
            :loading="status === 'pending'"
            :total="data?.total ?? 0"
            v-model:page="query.page"
            v-model:per-page="query.perPage"
         >
            <template #header>
               <div class="flex items-center justify-end">
                  <!-- <Button
                     label="Patient"
                     @click="onNew"
                  >
                     <template #icon>
                        <Icon name="lucide:plus" />
                     </template>
                  </Button> -->
               </div>
            </template>

            <template #row.visitDate="{ row }">
               {{ $formatDate((row as any).visitDate) }}
            </template>
            <template #row.actions="{ row }">
               <div class="flex items-center gap-4">
                  <Button
                     variant="text"
                     v-tooltip="'Details'"
                     @click="onDetails(row)"
                  >
                     <template #icon>
                        <Icon name="lucide:eye" />
                     </template>
                  </Button>
                  <Button
                     v-if="authStore.user?.refType == 'doctor'"
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
                     v-if="authStore.user?.refType == 'pharmacist'"
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
</template>
