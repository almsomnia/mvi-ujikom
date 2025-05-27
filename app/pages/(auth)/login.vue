<script setup lang="ts">
definePageMeta({
   layout: false,
})

const loading = shallowRef(false)

async function onSubmit(
   values: InferSchema<ReturnType<typeof $authSchema>["login"]>
) {
   loading.value = true
   await useAuthStore().login(values)
      .then((res) => {
         navigateTo("/")
      })
}
</script>

<template>
   <div class="flex h-screen items-center justify-center">
      <Card class="min-w-[36vw]">
         <template #title> Login </template>
         <template #content>
            <FormLogin
               :loading="loading"
               @submit="onSubmit"
            />
         </template>
      </Card>
   </div>
</template>
