<script setup lang="ts">
import SimpleBar from "simplebar"

const sideMenu = useSideMenuStore()
const compactMenu = useCompactMenuStore()
function setCompactMenu(val: boolean) {
   compactMenu.setCompactMenu(val)
}

const route = useRoute()

let formattedMenu = reactive<Array<FormattedMenu | string>>([])
function setFormattedMenu(
   computedFormattedMenu: Array<FormattedMenu | string>
) {
   Object.assign(formattedMenu, computedFormattedMenu)
}

const menu = computed(() => sideMenu.nestedMenu(useMenuStore().value, route))

provide<ProvideForceActiveMenu>("forceActiveMenu", (pageName: string) => {
   sideMenu.setForceActiveMenu(pageName)
   setFormattedMenu(menu.value)
})

const scrollableRef = useTemplateRef<HTMLDivElement>("scrollableRef")

function compactLayout() {
   if (window.innerWidth <= 1600) {
      setCompactMenu(true)
   }
}

watch(menu, () => [setFormattedMenu(menu.value)])

onMounted(() => {
   if (scrollableRef.value) {
      new SimpleBar(scrollableRef.value)
   }
   setFormattedMenu(menu.value)
   compactLayout()
   window.onresize = () => {
      compactLayout()
   }
})
</script>

<template>
   <div
      class="absolute inset-y-0 z-10 xl:top-[65px] xl:z-0"
      @mouseover.prevent="compactMenu.onHover = true"
      @mouseleave.prevent="compactMenu.onHover = false"
   >
      <div
         :class="[
            'box relative flex h-full w-[275px] flex-col overflow-hidden rounded-none border-y-0 border-l-0 transition-[width,margin] duration-300 xl:ml-0 group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f]',
            'after:fixed after:inset-0 after:z-[-1] after:bg-black/80 after:content-[\'\'] after:xl:hidden',
            { 'ml-0 after:block': sideMenu.activeMobileMenu },
            { '-ml-[275px] after:hidden': !sideMenu.activeMobileMenu },
         ]"
      >
         <div
            :class="[
               'fixed ml-[275px] h-10 w-10 items-center justify-center xl:hidden',
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
         <div
            ref="scrollableRef"
            :class="[
               'z-20 h-full w-full overflow-x-hidden overflow-y-auto px-5 pb-3 [-webkit-mask-image:-webkit-linear-gradient(top,rgba(0,0,0,0),black_30px)] [&:-webkit-scrollbar]:w-0 [&:-webkit-scrollbar]:bg-transparent',
               '[&_.simplebar-content]:p-0 [&_.simplebar-track.simplebar-vertical]:mr-0.5 [&_.simplebar-track.simplebar-vertical]:w-[10px] [&_.simplebar-track.simplebar-vertical_.simplebar-scrollbar]:before:bg-slate-400/30',
            ]"
         >
            <ul class="scrollable">
               <!-- BEGIN: First Child -->
               <template v-for="(menu, menuKey) in formattedMenu">
                  <li
                     v-if="typeof menu === 'string'"
                     class="side-menu__divider"
                     :key="'divider-' + menuKey"
                  >
                     {{ menu }}
                  </li>
                  <li
                     v-else
                     :key="menuKey"
                  >
                     <a
                        href=""
                        :class="[
                           'side-menu__link',
                           { 'side-menu__link--active': menu.active },
                           {
                              'side-menu__link--active-dropdown':
                                 menu.activeDropdown,
                           },
                        ]"
                        @click.prevent="
                           () => {
                              sideMenu.linkTo(menu)
                              setFormattedMenu([...formattedMenu])
                           }
                        "
                     >
                        <Icon
                           :name="menu.icon"
                           class="side-menu__link__icon"
                        />
                        <div class="side-menu__link__title">
                           {{ menu.title }}
                        </div>
                        <div
                           v-if="menu.badge"
                           class="side-menu__link__badge"
                        >
                           {{ menu.badge }}
                        </div>
                        <Icon
                           v-if="menu.subMenu"
                           name="lucide:chevron-down"
                           class="side-menu__link__chevron"
                        />
                     </a>
                     <!-- BEGIN: Second Child -->
                     <Transition
                        @enter="sideMenu.enter"
                        @leave="sideMenu.leave"
                     >
                        <ul v-if="menu.subMenu && menu.activeDropdown">
                           <li
                              v-for="(subMenu, subMenuKey) in menu.subMenu"
                              :key="subMenuKey"
                           >
                              <a
                                 href=""
                                 :class="[
                                    'side-menu__link',
                                    {
                                       'side-menu__link--active':
                                          subMenu.active,
                                    },
                                    {
                                       'side-menu__link--active-dropdown':
                                          subMenu.activeDropdown,
                                    },
                                 ]"
                                 @click.prevent="
                                    () => {
                                       sideMenu.linkTo(subMenu)
                                       setFormattedMenu([...formattedMenu])
                                    }
                                 "
                              >
                                 <Icon
                                    :name="subMenu.icon"
                                    class="side-menu__link__icon"
                                 />
                                 <div class="side-menu__link__title">
                                    {{ subMenu.title }}
                                 </div>
                                 <div
                                    v-if="subMenu.badge"
                                    class="side-menu__link__badge"
                                 >
                                    {{ subMenu.badge }}
                                 </div>
                                 <Icon
                                    v-if="subMenu.subMenu"
                                    name="lucide:chevron-down"
                                    class="side-menu__link__chevron"
                                 />
                              </a>
                              <!-- BEGIN: Third Child -->
                              <Transition
                                 @enter="sideMenu.enter"
                                 @leave="sideMenu.leave"
                              >
                                 <ul
                                    v-if="
                                       subMenu.subMenu && subMenu.activeDropdown
                                    "
                                 >
                                    <li
                                       v-for="(
                                          lastSubMenu, lastSubMenuKey
                                       ) in subMenu.subMenu"
                                       :key="lastSubMenuKey"
                                    >
                                       <a
                                          href=""
                                          :class="[
                                             'side-menu__link',
                                             {
                                                'side-menu__link--active':
                                                   lastSubMenu.active,
                                             },
                                             {
                                                'side-menu__link--active-dropdown':
                                                   lastSubMenu.activeDropdown,
                                             },
                                          ]"
                                          @click.prevent="
                                             () => {
                                                sideMenu.linkTo(lastSubMenu)
                                                setFormattedMenu([
                                                   ...formattedMenu,
                                                ])
                                             }
                                          "
                                       >
                                          <Icon
                                             :name="lastSubMenu.icon"
                                             class="side-menu__link__icon"
                                          />
                                          <div class="side-menu__link__title">
                                             {{ lastSubMenu.title }}
                                          </div>
                                          <div
                                             v-if="lastSubMenu.badge"
                                             class="side-menu__link__badge"
                                          >
                                             {{ lastSubMenu.badge }}
                                          </div>
                                       </a>
                                    </li>
                                 </ul>
                              </Transition>
                              <!-- END: Third Child -->
                           </li>
                        </ul>
                     </Transition>
                     <!-- END: Second Child -->
                  </li>
               </template>
               <!-- END: First Child -->
            </ul>
         </div>
      </div>
   </div>
</template>
