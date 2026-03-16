import { clamp } from "./number"

export const parseBrightnessPercent = (output: string) => {
  const firstLine = output.trim().split("\n")[0] ?? ""
  const fields = firstLine.split(",")
  const percentField = fields.find((field) => field.includes("%")) ?? "0%"
  const percent = Number.parseInt(percentField.replace("%", ""), 10)

  if (!Number.isFinite(percent)) {
    return 0
  }

  return clamp(percent, 0, 100)
}
