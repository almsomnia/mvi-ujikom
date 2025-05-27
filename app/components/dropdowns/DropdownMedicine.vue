<script setup lang="ts" generic="T">
const props = withDefaults(
   defineProps<{
      optionValue?: keyof Model.Medicine
      invalid?: boolean
      disabled?: boolean
   }>(),
   {
      optionValue: "id",
      invalid: false,
      disabled: false,
   }
)

const emit = defineEmits<{
   (e: "update:selected-data", data: Model.Medicine | undefined): void
}>()

const model = defineModel<T>()
const optionModel = ref<Model.Medicine>()
watch(optionModel, (value) => {
   if (value) {
      model.value = value[props.optionValue] as T
   } else {
      model.value = undefined
   }
   emit("update:selected-data", value)
})

async function fetchMedicines(
   search: string
) {
   const query = { per_page: 100, search }
   return await $fetch("/api/master/medicines", {
      method: "get",
      query
   }).then((res) => {
      return res.data.data.map((item) => ({
         name: (item as Model.Medicine).name,
         id: (item as Model.Medicine).id
      }))
   })
}

const searchModel = shallowRef("")
const data = ref<{ id: number; name: string }[]>([])
const pending = shallowRef(false)
async function execute() {
   pending.value = true
   await fetchMedicines(searchModel.value)
      .then((res) => {
         data.value = res
      })
      .finally(() => (pending.value = false))
}

watchDebounced(
   searchModel,
   (value) => {
      if (value && value.length > 2) {
         execute()
      }
   },
   { debounce: 500, maxWait: 1000 }
)
</script>

<template>
   <Select
      v-model="optionModel"
      fluid
      :options="data"
      option-label="name"
      filter
      filter-placeholder="Minimal 3 karakter"
      @filter="(event) => (searchModel = event.value)"
      :invalid="props.invalid"
      :disabled="props.disabled"
      :loading="pending"
   ></Select>
</template>
