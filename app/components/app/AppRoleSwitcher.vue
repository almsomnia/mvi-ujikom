<script setup lang="ts">
const roles = [
   "doctor", "nurse", "frontOffice", "pharmacist"
]

const selectedRole = shallowRef<string>("")

const authStore = useAuthStore()
async function onSubmit() {
   const payload = {
      userId: authStore.getUser()?.id,
      role: selectedRole.value
   }

   await $fetch("/api/auth/role", {
      method: "post",
      body: payload
   }).then((res: any) => {
      authStore.user = res.data
      reloadNuxtApp()
   })
}

onMounted(() => {
   if (!!authStore.getUser()?.refType) {
      selectedRole.value = authStore.getUser()!.refType
   }
})
</script>

<template>
   <div class="flex flex-col gap-4">
      <Select
         v-model="selectedRole"
         :options="roles"
      />
      <div class="flex items-center justify-end">
         <Button
            label="Submit"
            @click="onSubmit"
         />
      </div>
   </div>
</template>