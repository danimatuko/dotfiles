import GLib from "gi://GLib"
import { execAsync } from "ags/process"

export type ClipboardEntry = {
  raw: string
  preview: string
}

const cliphistCommand =
  GLib.find_program_in_path("cliphist") ||
  `${GLib.get_home_dir()}/.local/bin/cliphist`

const parseClipboardLine = (line: string): ClipboardEntry | null => {
  const trimmed = line.trim()
  if (!trimmed.length) return null

  const tabIndex = trimmed.indexOf("\t")
  const splitIndex = tabIndex >= 0 ? tabIndex : trimmed.search(/\s/)

  if (splitIndex < 0) {
    return { raw: trimmed, preview: trimmed }
  }

  const id = trimmed.slice(0, splitIndex).trim()
  const payload = trimmed.slice(splitIndex + 1).trim()

  return {
    raw: trimmed,
    preview: payload || id || trimmed,
  }
}

const parseClipboardOutput = (output: string) =>
  output
    .split("\n")
    .map(parseClipboardLine)
    .filter((entry): entry is ClipboardEntry => entry !== null)

const runCliphistWithInput = async (
  action: "decode" | "delete",
  raw: string,
) => {
  await execAsync([
    "bash",
    "-lc",
    `printf "%s" "$1" | "$2" ${action}${action === "decode" ? " | wl-copy" : ""}`,
    "bash",
    raw,
    cliphistCommand,
  ])
}

export const listClipboardEntries = async () => {
  const output = await execAsync([cliphistCommand, "list"])
  return parseClipboardOutput(`${output}`)
}

export const copyClipboardEntry = async (entry: ClipboardEntry) => {
  await runCliphistWithInput("decode", entry.raw)
}

export const deleteClipboardEntry = async (entry: ClipboardEntry) => {
  await runCliphistWithInput("delete", entry.raw)
}

export const clearClipboardHistory = async () => {
  await execAsync([cliphistCommand, "wipe"])
}
