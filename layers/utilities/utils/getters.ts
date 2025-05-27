import type { QUnitType, OpUnitType, ConfigType } from "dayjs"

/**
 * Calculate the difference between two dates in a specified format.
 */
export function $getDateDiff(
   latter: ConfigType,
   former: ConfigType,
   format: QUnitType | OpUnitType
) {
   const dayjs = useDayjs()
   return dayjs(latter).diff(dayjs(former), format)
}

export function $isDev() {
   return import.meta.dev
}
