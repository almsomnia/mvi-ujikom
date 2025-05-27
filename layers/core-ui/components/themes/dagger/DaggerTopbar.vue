<script setup lang="ts">
const compactMenu = useCompactMenuStore()

function setCompactMenu(val: boolean) {
   compactMenu.setCompactMenu(val)
}

function toggleCompactMenu(event: MouseEvent) {
   event.preventDefault()
   setCompactMenu(!compactMenu.value)
}

const sideMenu = useSideMenuStore()
</script>

<template>
   <div
      class="box fixed inset-x-0 top-0 z-10 flex h-[65px] rounded-none border-x-0 border-t-0"
   >
      <div
         :class="[
            'relative z-10 flex h-full flex-none items-center overflow-hidden bg-white px-5 duration-300 xl:w-[275px] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed.sidemenu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000001f]',
            'before:absolute before:right-0 before:hidden before:h-4/6 before:border-r before:border-dashed before:border-slate-300/70 before:content-[\'\'] before:xl:block before:group-[.side-menu--collapsed.side-menu--on-hover]:xl:h-full before:group-[.side-menu--collapsed.side-menu--on-hover]:xl:border-solid',
         ]"
         @mouseover.prevent="compactMenu.onHover = true"
         @mouseleave.prevent="compactMenu.onHover = false"
      >
         <a
            href=""
            class="hidden items-center transition-[margin] xl:flex group-[.side-menu--collapsed]:xl:ml-2 group-[.side-menu--collapsed.side-menu--on-hover]:xl:ml-0"
         >
            <div
               class="from-primary-500 to-primary-800 flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-gradient-to-r transition-transform ease-in-out group-[.side-menu--collapsed.side-menu--on-hover]:xl:-rotate-180"
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
               class="ml-3.5 font-medium transition-opacity group-[.side-menu--collapsed]:xl:opacity-0 group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100"
            >
               DAGGER
            </div>
         </a>
         <a
            href=""
            @click="toggleCompactMenu"
            class="ml-auto flex h-[20px] w-[20px] items-center justify-center rounded-full border border-slate-600/40 transition-[opacity,transform] hover:bg-slate-600/5 group-[.side-menu--collapsed]:xl:rotate-180 group-[.side-menu--collapsed]:xl:opacity-0 group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100"
         >
            <Icon
               name="lucide:arrow-left"
               class="size-3.5 stroke-[1.3]"
            />
         </a>
         <div class="flex items-center gap-1 xl:hidden">
            <a
               href=""
               @click.prevent="sideMenu.activeMobileMenu = true"
               class="rounded-full p-2 hover:bg-slate-100"
            >
               <Icon
                  name="lucide:align-justify"
                  class="size-[18px]"
               />
            </a>
         </div>
      </div>
      <div
         class="absolute inset-x-0 h-full transition-[padding] duration-100 xl:pl-[275px] group-[.side-menu--collapsed]:xl:pl-[91px]"
      >
         <div class="flex h-full w-full items-center px-5">
            <!-- SECTION: Breadcrumb -->
            <!-- !SECTION -->
            <!-- SECTION: Notification & User Menu -->
            <div class="flex flex-1 items-center">
               <div class="ml-auto flex items-center gap-1">
                  <a
                     href=""
                     class="rounded-full p-2 hover:bg-slate-100"
                     @click.prevent="requestFullScreen"
                  >
                     <Icon
                        name="lucide:expand"
                        class="size-[18px]"
                     />
                  </a>
               </div>
            </div>
            <!-- !SECTION -->
         </div>
      </div>
   </div>
</template>
