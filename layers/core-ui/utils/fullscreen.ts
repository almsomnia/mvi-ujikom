export function requestFullScreen() {
   const el = document.documentElement
   if (el.requestFullscreen) {
      el.requestFullscreen()
   }
}
