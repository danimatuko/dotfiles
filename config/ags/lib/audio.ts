export const getVolumeIconByValue = (value: number) => {
  if (value <= 0.001) return "audio-volume-muted-symbolic"
  if (value < 0.34) return "audio-volume-low-symbolic"
  if (value < 0.67) return "audio-volume-medium-symbolic"
  return "audio-volume-high-symbolic"
}
