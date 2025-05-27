<script setup lang="ts">
const props = defineProps<{
   topBarActive: boolean
}>()

const sideMenu = useSideMenuStore()
</script>

<template>
   <div
      class="fixed inset-x-0 top-0 mt-3.5 h-[65px] transition-[margin] duration-100 xl:ml-[275px] group-[.side-menu--collapsed]:xl:ml-[90px]"
   >
      <div
         :class="[
            'top-bar group absolute right-0 left-0 mx-5 h-full xl:left-3.5',
            'before:absolute before:inset-x-0 before:top-0 before:-mt-[15px] before:h-[20px] before:backdrop-blur before:content-[\'\']',
            { 'top-bar--active': topBarActive },
         ]"
      >
         <div
            class="box group-[.top-bar--active]:box group-[.top-bar--active]:from-primary-500 group-[.top-bar--active]:to-primary-800 container flex h-full w-full items-center border-transparent bg-transparent shadow-none transition-[padding,background-color,border-color] duration-300 ease-in-out group-[.top-bar--active]:border-transparent group-[.top-bar--active]:bg-transparent group-[.top-bar--active]:bg-gradient-to-r group-[.top-bar--active]:px-5"
         >
            <div class="flex items-center gap-1 xl:hidden">
               <a
                  href=""
                  @click.prevent="sideMenu.activeMobileMenu = true"
                  class="rounded-full p-2 text-white hover:bg-white/5"
               >
                  <Icon
                     name="lucide:align-justify"
                     class="h-[18px] w-[18px]"
                  />
               </a>
            </div>
            <!-- SECTION: Breadcrumb -->
            <!-- !SECTION: Breadcrumb -->
            <!-- BEGIN: Notification & User Menu -->
            <div class="flex flex-1 items-center">
               <div class="ml-auto flex items-center gap-1">
                  <a
                     href=""
                     class="rounded-full p-2 text-white hover:bg-white/5"
                     @click.prevent="requestFullScreen"
                  >
                     <Icon
                        name="lucide:expand"
                        class="h-[18px] w-[18px]"
                     />
                  </a>
               </div>
            </div>
            <!-- END: Notification & User Menu -->
         </div>
      </div>
   </div>
</template>
