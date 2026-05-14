import GLib from "gi://GLib"

export const isCommandAvailable = (command: string) =>
  Boolean(GLib.find_program_in_path(command))

export const getCommandPath = (
  command: string,
  fallbackPath?: string,
): string | null => GLib.find_program_in_path(command) || fallbackPath || null
