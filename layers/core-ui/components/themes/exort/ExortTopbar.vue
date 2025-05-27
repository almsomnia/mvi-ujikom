<script setup lang="ts">
const sideMenu = useSideMenuStore()

const compactMenu = useCompactMenuStore()
function setCompactMenu(val: boolean) {
   compactMenu.setCompactMenu(val)
}

function toggleCompactMenu(event: MouseEvent) {
   event.preventDefault()
   setCompactMenu(!compactMenu.value)
}
</script>

<template>
   <div
      class="box from-primary-500 to-primary-800 fixed inset-x-0 top-0 z-10 flex h-[65px] rounded-none border-x-0 border-t-0 border-transparent bg-gradient-to-r shadow-lg"
   >
      <div
         :class="[
            'relative z-10 flex h-full flex-none items-center overflow-hidden bg-white px-5 duration-300 xl:w-[275px] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000001f]',
            'before:absolute before:right-0 before:hidden before:h-4/6 before:border-r before:border-dashed before:border-white/[0.15] before:content-[\'\'] before:xl:block before:group-[.side-menu--collapsed.side-menu--on-hover]:xl:hidden',
            'after:from-primary-500 after:to-primary-800 after:absolute after:left-[-1.25rem] after:z-[-1] after:h-full after:w-screen after:bg-gradient-to-r after:bg-[length:100vw_65px] after:bg-[1.25rem_top] after:content-[\'\']',
         ]"
         @mouseover.prevent="compactMenu.onHover = true"
         @mouseleave.prevent="compactMenu.onHover = false"
      >
         <a
            href=""
            class="hidden items-center transition-[margin] xl:flex group-[.side-menu--collapsed]:xl:ml-2 group-[.side-menu--collapsed.side-menu--on-hover]:xl:ml-0"
         >
            <div
               class="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-white/10 transition-transform ease-in-out group-[.side-menu--collapsed.side-menu--on-hover]:xl:-rotate-180"
            >
               <div
                  class="relative h-[16px] w-[16px] -rotate-45 [&_div]:bg-white"
               >
                  <div
                     class="absolute inset-y-0 left-0 my-auto h-[75%] w-[21%] rounded-full opacity-50"
                  ></div>
                  <div
                     class="absolute inset-0 m-auto h-[120%] w-[21%] rounded-full"
                  ></div>
                  <div
                     class="absolute inset-y-0 right-0 my-auto h-[75%] w-[21%] rounded-full opacity-50"
                  ></div>
               </div>
            </div>
            <div
               class="ml-3.5 font-medium text-white transition-opacity group-[.side-menu--collapsed]:xl:opacity-0 group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100"
            >
               EXORT
            </div>
         </a>
         <a
            href=""
            @click="toggleCompactMenu"
            class="3xl:flex ml-auto hidden h-[20px] w-[20px] items-center justify-center rounded-full border border-white/40 text-white transition-[opacity,transform] hover:bg-white/5 group-[.side-menu--collapsed]:xl:rotate-180 group-[.side-menu--collapsed]:xl:opacity-0 group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100"
         >
            <Icon
               name="lucide:arrow-left"
               class="h-3.5 w-3.5 stroke-[1.3]"
            />
         </a>
         <div class="flex items-center gap-1 xl:hidden">
            <a
               href=""
               @click.prevent="sideMenu.activeMobileMenu = true"
               class="rounded-full p-2 hover:bg-white/5"
            >
               <Icon
                  name="lucide:align-justify"
                  class="h-[18px] w-[18px] text-white"
               />
            </a>
         </div>
      </div>
      <div
         class="absolute inset-x-0 h-full transition-[padding] duration-100 xl:pl-[275px] group-[.side-menu--collapsed]:xl:pl-[91px]"
      >
         <div class="flex h-full w-full items-center px-5">
            <!-- SECTION: Breadcrumb -->
            <!-- !SECTION: Breadcrumb -->
            <!-- SECTION: Notification & User Menu -->
            <div class="flex flex-1 items-center">
               <div class="ml-auto flex items-center gap-1">
                  <a
                     href=""
                     class="rounded-full p-2 hover:bg-white/5"
                     @click.prevent="requestFullScreen"
                  >
                     <Icon
                        name="lucide:expand"
                        class="h-[18px] w-[18px] text-white"
                     />
                  </a>
               </div>
               <!-- !SECTION: Notification & User Menu -->
            </div>
         </div>
      </div>
   </div>
</template>
