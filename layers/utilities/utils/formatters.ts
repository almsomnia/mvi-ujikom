export function $formatPrice(
   amount: number,
   locales: Intl.LocalesArgument = "id-ID",
   opts?: Intl.NumberFormatOptions
) {
   return Intl.NumberFormat(
      locales,
      opts ?? {
         style: "currency",
         currency: "IDR",
         minimumFractionDigits: 0,
      }
   ).format(amount)
}

export function $formatDate(
   date: string | Date,
   format: string = "DD MMMM YYYY"
) {
   const dayjs = useDayjs()
   return dayjs(date).format(format)
}

export function $capitalize(string: string) {
   return string.charAt(0).toUpperCase() + string.slice(1)
}
