<script setup lang="ts">
const props = defineProps<{
   data: any
}>()
</script>

<template>
   <Card>
      <template #content>
         <div class="bg-gradient-to-br from-primary-500 to-primary-700 relative h-24 rounded-lg">
            <Avatar
               :label="props.data?.name.charAt(0)"
               shape="circle"
               size="xlarge"
               class="absolute inset-x-0 bottom-0 mx-auto translate-y-1/2"
            />
         </div>
         <div class="mt-12 flex flex-col gap-4">
            <p class="text-center font-semibold">
               {{ props.data?.name }}
            </p>
            <div class="text-surface-500 text-center max-w-[75%] mx-auto">
               <p>
                  Medical Record Number: {{ props.data?.medicalNumber }} |
                  Identity Number: {{ props.data?.identityNumber }} | Phone:
                  {{ props.data?.phoneNumber }} | Gender:
                  {{ $resolveGender(props.data?.gender || "-") }} | DOB:
                  {{
                     `${props.data?.placeOfBirth}, ${$formatDate(props.data?.dateOfBirth || "")}`
                  }} | Adress: {{ props.data?.address || "-" }}
               </p>
            </div>
         </div>
      </template>
   </Card>
</template>
