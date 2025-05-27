<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
   <Card>
      <template #content>
         Selamat datang, {{ authStore.getUser()?.name || 'Pengguna' }}!
      </template>
   </Card>
</template>