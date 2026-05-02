import GLib from "gi://GLib"
import { execAsync } from "ags/process"
import { createState } from "gnim"

import { clamp } from "../../lib/number"

const nightLightCommand = `${GLib.get_home_dir()}/.local/bin/toggle-nightlight`
const [nightLightEnabled, setNightLightEnabled] = createState(false)
const [nightLightTemperature, setNightLightTemperatureState] = createState(4500)

const minNightLightTemperature = 1000
const maxNightLightTemperature = 10000

const readNightLightTemperature = () => {
  execAsync([nightLightCommand, "temperature"])
    .then((value) => {
      const parsedTemperature = Number.parseInt(value.trim(), 10)
      if (Number.isNaN(parsedTemperature)) return

      setNightLightTemperatureState(
        clamp(
          parsedTemperature,
          minNightLightTemperature,
          maxNightLightTemperature,
        ),
      )
    })
    .catch(() => {})
}

execAsync([nightLightCommand, "status"])
  .then((status) => {
    setNightLightEnabled(status.trim() === "on")
  })
  .catch(() => {})

readNightLightTemperature()

export const canToggleNightLight = true

export const getNightLightIcon = nightLightEnabled((enabled) =>
  enabled ? "night-light-symbolic" : "night-light-disabled-symbolic",
)

export const getNightLightButtonClass = nightLightEnabled((enabled) =>
  enabled
    ? "quick-settings__toggle-button quick-settings__toggle-button--active"
    : "quick-settings__toggle-button",
)

export const toggleNightLight = () => {
  setNightLightEnabled(!nightLightEnabled())
  execAsync([nightLightCommand]).catch(() => {})
}

export const getNightLightTemperatureValue = nightLightTemperature(
  (temperature) =>
    (temperature - minNightLightTemperature) /
    (maxNightLightTemperature - minNightLightTemperature),
)

export const setNightLightTemperature = (value: number) => {
  const clampedSliderValue = clamp(value, 0, 1)
  const nextTemperature = Math.round(
    minNightLightTemperature +
      clampedSliderValue * (maxNightLightTemperature - minNightLightTemperature),
  )

  setNightLightTemperatureState(nextTemperature)
  execAsync([nightLightCommand, "set-temperature", `${nextTemperature}`]).catch(
    () => {},
  )
}
