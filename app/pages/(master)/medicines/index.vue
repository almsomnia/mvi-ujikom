<script setup lang="ts">
const query = ref({
   page: 1,
   perPage: 10,
})

const columns = [
   { header: "Name", field: "name" },
   { header: "Unit", field: "unit" },
   { header: "Price", field: "price" },
   { header: "Updated at", field: "updatedAt" },
]

const { data, status, refresh } = await useLazyFetch("/api/master/medicines", {
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
function onNewMedicine() {
   appStore.showDialog(
      "New Medicine",
      h(resolveComponent("FormMedicine"), {
         loading: formLoading.value,
         onSubmit: async (
            data: InferSchema<ReturnType<typeof $medicineSchema>["create"]>
         ) => {
            formLoading.value = true
            const result = await $fetch("/api/master/medicines", {
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
         width: "600px",
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
                     label="Medicine"
                     @click="onNewMedicine"
                  >
                     <template #icon>
                        <Icon name="lucide:plus" />
                     </template>
                  </Button>
               </div>
            </template>

            <template #row.price="{ row }">
               {{ $formatPrice((row as any).price) }}
            </template>
            <template #row.updatedAt="{ row }">
               {{ $formatDate((row as any).updatedAt) }}
            </template>
         </AppDataTable>
      </template>
   </Card>
</template>
