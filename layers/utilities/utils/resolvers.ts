export function $resolveGender(
   gender: HintedString<"M" | "F">,
   toIcon?: boolean
) {
   switch (gender) {
      case "M":
         return toIcon
            ? h(resolveComponent("Icon"), { name: "ion:male" })
            : "Male"
      case "F":
         return toIcon
            ? h(resolveComponent("Icon"), { name: "ion:female" })
            : "Female"
      default:
         return "-"
   }
}
