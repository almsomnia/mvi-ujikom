<script setup lang="ts">
const props = defineProps<{
   topBarActive: boolean
}>()

const sideMenu = useSideMenuStore()
const authStore = useAuthStore()
const menu = useTemplateRef('menu')
const menuItems = [
   {
      label: `Role: ${authStore.getUser()?.refType}`,
      items: [
         { label: "Switch Role", command: () => useAppStore().showDialog(
            "Switch Role",
            h(resolveComponent("AppRoleSwitcher")),
            { width: '600px' }
         ) }
      ]
   }
]
function toggleMenu(event: Event) {
   menu.value?.toggle(event)
}
</script>

<template>
   <div
      :class="[
         'fixed inset-x-0 top-0 mt-2 h-[65px] transition-[margin] duration-100 xl:ml-[275px] group-[.side-menu--collapsed]:xl:ml-[90px]',
         'before:absolute before:inset-x-0 before:top-0 before:mx-5 before:-mt-[15px] before:h-[20px] before:backdrop-blur before:content-[\'\']',
      ]"
   >
      <div
         :class="[
            'top-bar group absolute inset-x-0 mx-5 h-full',
            { 'top-bar--active': topBarActive },
         ]"
      >
         <div
            class="box container flex h-full w-full items-center transition-[padding,background-color,border-color] duration-300 ease-in-out"
            :class="{
               'box px-5': topBarActive,
               'border-transparent bg-transparent shadow-none': !topBarActive,
            }"
         >
            <div class="flex items-center gap-1 xl:hidden">
               <a
                  href=""
                  @click.prevent="sideMenu.activeMobileMenu = true"
                  class="rounded-full p-2 hover:bg-slate-100"
               >
                  <Icon
                     name="lucide:align-justify"
                     class="h-[18px] w-[18px]"
                  />
               </a>
            </div>
            <!-- SECTION: Breadcrumb -->
            <!-- !SECTION: Breadcrumb -->
            <!-- SECTION: Notification & User Menu -->
            <div class="flex flex-1 items-center">
               <div class="ml-auto flex items-center gap-1">
                  <a
                     href=""
                     class="rounded-full p-2 hover:bg-slate-200/50 group-[.top-bar--active]:hover:bg-slate-50"
                     @click.prevent="requestFullScreen"
                  >
                     <Icon
                        name="lucide:expand"
                        class="h-[18px] w-[18px]"
                     />
                  </a>
                  <Button
                     :label="authStore.getUser()?.name"
                     severity="secondary"
                     variant="text"
                     @click="toggleMenu"
                     icon-pos="right"
                  >
                     <template #icon>
                        <Icon name="lucide:chevron-down" />
                     </template>
                  </Button>
                  <Menu
                     ref="menu"
                     :model="menuItems"
                     popup
                  />
               </div>
            </div>
            <!-- !SECTION: Notification & User Menu -->
         </div>
      </div>
   </div>
</template>
