<script setup lang="ts">
import "@/assets/css/themes/dagger.css"
import "@/assets/css/components/box.css"
const compactMenu = useCompactMenuStore()
</script>

<template>
   <div
      :class="[
         'dagger',
         'before:fixed before:inset-0 before:bg-gradient-to-b before:from-slate-100 before:to-slate-50 before:content-[\'\']',
      ]"
   >
      <div
         :class="[
            'side-menu group fixed top-0 left-0 z-50 h-screen',
            { 'side-menu--collapsed': compactMenu.value },
            { 'side-menu--on-hover': compactMenu.onHover },
         ]"
      >
         <!-- SECTION: Side Menu -->
         <DaggerTopbar />
         <DaggerSidebar />
         <!-- !SECTION -->
      </div>
      <div
         :class="[
            'relative z-10 mt-[65px] px-5 pt-[31px] pb-16 transition-[margin,width] duration-100',
            { 'xl:ml-[275px]': !compactMenu.value },
            { 'xl:ml-[91px]': compactMenu.value },
         ]"
      >
         <div class="container">
            <slot />
         </div>
      </div>
   </div>
</template>
