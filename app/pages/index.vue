<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
   <Card>
      <template #content>
         <div>Welcome, {{ authStore.getUser()?.name || "Pengguna" }}!</div>
         <div class="mt-4">
            Current role:
            <span class="text-primary-500 font-semibold">{{
               authStore.getUser()?.refType
            }}</span>
         </div>
      </template>
   </Card>
</template>
