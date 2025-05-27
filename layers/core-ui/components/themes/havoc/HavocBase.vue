<script setup lang="ts">
import "@/assets/css/themes/havoc.css"
import "@/assets/css/components/box.css"

const compactMenu = useCompactMenuStore()
</script>

<template>
   <div
    :class="[
      'havoc',
      'before:content-[\'\'] before:bg-gradient-to-b before:from-slate-100 before:to-slate-50 before:h-screen before:w-full before:fixed before:top-0',
      'after:content-[\'\'] after:fixed after:inset-0 after:bg-[radial-gradient(rgb(0_0_0_/_10%)_1px,_transparent_0)] after:bg-[length:25px_25px]',
    ]"
  >
    <div
      :class="[
        'fixed top-0 left-0 z-50 h-screen side-menu group',
        { 'side-menu--collapsed': compactMenu.value },
        { 'side-menu--on-hover': compactMenu.onHover },
      ]"
    >
      <HavocTopbar />
      <HavocSidebar />
    </div>
    <!-- SECTION: MAIN -->
    <div
      :class="[
        'transition-[margin,width] duration-100 pl-5 xl:pl-10 pr-5 mt-[65px] pt-[31px] pb-16 relative z-10',
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