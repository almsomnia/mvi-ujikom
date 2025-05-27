<script setup lang="ts">
import "@/assets/css/themes/hurricane.css"
import "@/assets/css/components/box.css"

const compactMenu = useCompactMenuStore()
</script>

<template>
   <div
    :class="[
      'hurricane',
      'before:content-[\'\'] before:z-[-1] before:w-screen before:bg-slate-50 before:top-0 before:h-screen before:fixed before:bg-texture-black before:bg-contain before:bg-fixed before:bg-[center_-20rem] before:bg-no-repeat',
    ]"
  >
    <div
      :class="[
        'fixed top-0 left-0 z-50 side-menu group',
        { 'side-menu--collapsed': compactMenu.value },
        { 'side-menu--on-hover': compactMenu.onHover },
      ]"
    >
      <HurricaneTopbar />
      <HurricaneSidebar />
    </div>

    <div
      :class="[
        'transition-[margin,width] duration-100 px-5 xl:mr-2.5 mt-[75px] pt-[31px] pb-16',
        { 'xl:ml-[275px]': !compactMenu.value },
        { 'xl:ml-[100px]': compactMenu.value },
      ]"
    >
      <div class="container">
         <slot />
      </div>
    </div>
  </div>
</template>