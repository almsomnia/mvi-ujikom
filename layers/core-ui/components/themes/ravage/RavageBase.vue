<script setup lang="ts">
import "@/assets/css/themes/ravage.css"
import "@/assets/css/components/box.css"

const compactMenu = useCompactMenuStore()
const sideMenu = useSideMenuStore()
</script>

<template>
   <div class="ravage min-h-screen bg-slate-100">
      <div
         :class="[
            'side-menu group fixed top-0 left-0 z-50 shadow-xl transition-[margin] duration-300 xl:ml-0 xl:shadow-none',
            'after:fixed after:inset-0 after:bg-black/80 after:content-[\'\'] after:xl:hidden',
            { 'side-menu--collapsed': compactMenu.value },
            { 'side-menu--on-hover': compactMenu.onHover },
            { 'ml-0 after:block': sideMenu.activeMobileMenu },
            { '-ml-[275px] after:hidden': !sideMenu.activeMobileMenu },
         ]"
      >
         <div
            :class="[
               'fixed z-50 ml-[275px] h-10 w-10 items-center justify-center xl:hidden',
               { flex: sideMenu.activeMobileMenu },
               { hidden: !sideMenu.activeMobileMenu },
            ]"
         >
            <a
               href=""
               @click.prevent="sideMenu.activeMobileMenu = false"
               class="mt-5 ml-5"
            >
               <Icon
                  name="lucide:x"
                  class="h-8 w-8 text-white"
               />
            </a>
         </div>
         <RavageSidebar />
         <RavageTopbar />
      </div>
      <div
         :class="[
            'relative z-10 px-5 pt-[56px] pb-16 transition-[margin,width] duration-100',
            { 'xl:ml-[275px]': !compactMenu.value },
            { 'xl:ml-[91px]': compactMenu.value },
         ]"
      >
         <div class="container mt-[65px]">
            <slot />
         </div>
      </div>
   </div>
</template>
