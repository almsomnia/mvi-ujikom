export function $resolveGender(
   gender: HintedString<"L" | "P">,
   toIcon?: boolean
) {
   switch (gender) {
      case "L":
         return toIcon
            ? h(resolveComponent("Icon"), { name: "ion:male" })
            : "Laki-laki"
      case "P":
         return toIcon
            ? h(resolveComponent("Icon"), { name: "ion:female" })
            : "Perempuan"
      default:
         return "-"
   }
}
