<script setup lang="ts">
const props = withDefaults(
   defineProps<{
      optionLabel?: keyof Model.ICD
      optionValue?: keyof Model.ICD
      invalid?: boolean
      disabled?: boolean
   }>(),
   {
      optionLabel: "name",
      optionValue: "id",
      invalid: false,
      disabled: false,
   }
)

const emit = defineEmits<{
   (e: "update:selected-data", data: Model.ICD | undefined): void
}>()

const model = defineModel<string | number | undefined>()
const optionModel = ref<Model.ICD>()
watch(optionModel, (value) => {
   model.value = value ? value[props.optionValue] : undefined
   emit("update:selected-data", value)
})

const searchModel = shallowRef("")
const data = ref<Model.ICD[]>([])
const pending = shallowRef(false)
async function execute() {
   pending.value = true
   await $fetch("/api/icds", {
      method: "get",
      query: {
         search: searchModel.value,
      }
   })
      .then((res) => {
         data.value = res.data.data as Model.ICD[]
      })
      .finally(() => (pending.value = false))
}
watchDebounced(
   () => searchModel.value,
   (value) => {
      if (value && value.length > 3) {
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
      :option-label="props.optionLabel"
      filter
      filter-placeholder="Minimal 4 karakter"
      @filter="(event) => (searchModel = event.value)"
      :invalid="props.invalid"
      :disabled="props.disabled"
      :loading="pending"
   >
      <template #option="{ option }">
         <slot
            name="option"
            :option="option"
         >
            {{ option.code }} &ndash; {{ option.name }}
         </slot>
      </template>
      <template #value="{ value }">
         <slot
            name="value"
            :value="value"
         >
            <template v-if="value">
               {{ value.code }} &ndash; {{ value.name }}
            </template>
         </slot>
      </template>
   </Select>
</template>
