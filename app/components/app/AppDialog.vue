<script setup lang="ts">
const appStore = useAppStore()
</script>

<template>
   <Dialog
      v-model:visible="appStore.dialog.show"
      modal
      :header="appStore.dialog.title"
      :closable="appStore.dialog.closable"
      :style="{ width: appStore.dialog.width }"
      @hide="appStore.closeDialog"
   >
      <component :is="appStore.dialog.body" />
   </Dialog>
</template>
