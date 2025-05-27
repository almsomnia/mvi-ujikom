<script setup lang="ts">
const query = ref({
   page: 1,
   perPage: 10,
})

const columns = [
   { header: "Medical No", field: "medicalNumber" },
   { header: "Name", field: "name" },
   { header: "Identity No", field: "identityNumber" },
   { header: "Phone No", field: "phoneNumber" },
   { header: "Gender", field: "gender" },
]

const { data, status, refresh } = await useLazyFetch("/api/patients", {
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
function onNew() {
   appStore.showDialog(
      "New Patient",
      h(resolveComponent("FormPatient"), {
         loading: formLoading.value,
         onSubmit: async (
            data: InferSchema<ReturnType<typeof $patientSchema>["create"]>
         ) => {
            formLoading.value = true
            const result = await $fetch("/api/patients", {
               method: "post",
               body: data,
            })
            appStore.notify("success", "Success", result.meta.message)
            appStore.closeDialog()
            formLoading.value = false
            refresh()
         },
      }),
      {
         width: "1200px",
      }
   )
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
                  <Button
                     label="Patient"
                     @click="onNew"
                  >
                     <template #icon>
                        <Icon name="lucide:plus" />
                     </template>
                  </Button>
               </div>
            </template>

            <template #row.gender="{ row }">
               {{ $resolveGender((row as any).gender) }}
            </template>
         </AppDataTable>
      </template>
   </Card>
</template>
