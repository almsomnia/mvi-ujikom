<script setup lang="ts">
const props = withDefaults(
   defineProps<{
      label: string
      required?: boolean
      error?: string | undefined
      id?: string
      help?: string
   }>(),
   {
      required: false,
      error: undefined,
   }
)

const computedClass = computed(() => {
   return props.required ? "after:content-['_*'] after:text-red-500" : ""
})
</script>

<template>
   <div>
      <div class="flex flex-col gap-2">
         <slot
            name="label"
            :label="props.label"
         >
            <label
               :for="props.id"
               :class="[computedClass]"
            >
               {{ props.label }}
            </label>
         </slot>
         <slot />
         <slot
            name="help"
            :help="props.help"
         >
            <small class="text-sm text-surface-500">
               {{ props.help }}
            </small>
         </slot>
         <slot
            name="error"
            :error="props.error"
         >
            <Message
               v-if="!!props.error"
               severity="error"
               variant="simple"
               size="small"
            >
               {{ props.error }}
            </Message>
         </slot>
      </div>
   </div>
</template>
