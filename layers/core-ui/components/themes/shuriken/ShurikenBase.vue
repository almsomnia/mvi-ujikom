<script setup lang="ts">
import "@/assets/css/themes/shuriken.css"
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
         'shuriken',
         'before:bg-texture-black before:fixed before:top-0 before:z-[-1] before:h-screen before:w-screen before:bg-slate-50 before:bg-contain before:bg-fixed before:bg-[center_-20rem] before:bg-no-repeat before:content-[\'\']',
      ]"
   >
      <div
         :class="[
            'side-menu group fixed top-0 left-0 z-50 shadow-xl transition-[margin,padding] duration-300 xl:ml-0 xl:shadow-none',
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
         <ShurikenSidebar />
         <ShurikenTopbar :top-bar-active="topBarActive" />
      </div>
      <div
         :class="[
            'px-5 pt-[39px] pb-16 transition-[margin,width] duration-100',
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
