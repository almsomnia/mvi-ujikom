<script setup lang="ts">
import "@/assets/css/themes/echo.css"
import "@/assets/css/components/box.css"
const compactMenu = useCompactMenuStore()
const sideMenu = useSideMenuStore()

const topBarActive = shallowRef(false)

onMounted(() => {
   window.onscroll = () => {
      if (
         document.body.scrollTop > 0 ||
         document.documentElement.scrollTop > 0
      ) {
         topBarActive.value = true
      } else {
         topBarActive.value = false
      }
   }
})
</script>

<template>
   <div
      :class="[
         'echo group background relative min-h-screen bg-gradient-to-b from-slate-200/70 to-slate-50',
         'before:from-primary-500/80 before:to-primary-800 before:fixed before:top-0 before:h-[370px] before:w-screen before:bg-gradient-to-t before:transition-[opacity,height] before:duration-300 before:ease-in-out before:content-[\'\'] [&.background--hidden]:before:opacity-0',
         'after:bg-texture-white after:fixed after:top-0 after:h-[370px] after:w-screen after:bg-contain after:bg-fixed after:bg-[center_-13rem] after:bg-no-repeat after:transition-[opacity,height] after:duration-300 after:ease-in-out after:content-[\'\'] [&.background--hidden]:after:opacity-0',
         { 'background--hidden': topBarActive },
      ]"
   >
      <div
         :class="[
            'side-menu group fixed inset-y-0 top-0 left-0 z-50 shadow-xl transition-[margin,padding] duration-300 xl:ml-0 xl:py-3.5 xl:pl-3.5 xl:shadow-none',
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
         <EchoSidebar />
         <EchoTopbar :top-bar-active="topBarActive" />
      </div>
      <div
         :class="[
            'group mode relative z-10 pt-[54px] pb-16 transition-[margin,width] duration-100 xl:pl-3.5',
            { 'xl:ml-[275px]': !compactMenu.value },
            { 'xl:ml-[91px]': compactMenu.value },
            { 'mode--light': !topBarActive },
         ]"
      >
         <div class="mt-16 px-5">
            <div class="container">
               <slot />
            </div>
         </div>
      </div>
   </div>
</template>
