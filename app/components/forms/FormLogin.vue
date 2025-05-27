<script setup lang="ts">
const props = defineProps<{
   loading?: boolean
}>()

const emit = defineEmits<{
   (e: "submit", values: InferSchema<ReturnType<typeof $authSchema>["login"]>): void
}>()

const { form, error, loading: formLoading, submit } = useForm(
   {
      email: "",
      password: "",
   },
   $authSchema().login
)

const loading = computed(() => props.loading || formLoading.value)

async function onSubmit() {
   await submit(async (values) => {
      emit("submit", values)
   })
}
</script>

<template>
   <form
      @submit.prevent="onSubmit"
      class="flex flex-col gap-4"
   >
      <AppFormField
         label="Email"
         required
         :error="error.email"
      >
         <InputText
            v-model="form.email"
            type="email"
            fluid
            :invalid="!!error.email"
            :disabled="loading"
         />
      </AppFormField>
      <AppFormField
         label="Password"
         required
         :error="error.password"
      >
         <Password
            v-model="form.password"
            :feedback="false"
            toggle-mask
            fluid
            :invalid="!!error.password"
            :disabled="loading"
         />
      </AppFormField>
      <div class="flex flex-col gap-4 mt-2">
         <Button
            label="Login"
            type="submit"
         />
      </div>
   </form>
</template>
