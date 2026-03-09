#!/bin/bash

ags quit >/dev/null 2>&1 || true
sleep 0.5

ags run >/dev/null 2>&1 &
sleep 0.65

# Verify AGS is running before sending notification
case "$(ags list 2>/dev/null)" in
*ags*)
	notify-send --icon=view-refresh --app-name=AGS "AGS" "Reload complete"
	;;
*)
	notify-send --icon=dialog-error --app-name=AGS "AGS" "Reload failed"
	;;
esac
