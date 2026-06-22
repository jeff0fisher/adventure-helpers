# Adventure Helpers

Adventure Helpers is a clean-room Minecraft Bedrock add-on prototype inspired by utility companion mechanics. It does not include third-party branding, logos, names, textures, or Marketplace assets.

## Current Features

- Helper Whistle for summoning a per-player helper.
- Helper modes: Scout, Guard, and Forager.
- Ore finder, including lava, with selectable scan ranges.
- Animal finder and monster finder.
- Structure locator menu.
- Delayed helper item requests with queued deliveries.
- Repeatable quest list with rollover progress.
- Home teleport and death recall.
- Auto farm and launch jump actions.

## Project Layout

```text
adventure-helpers/
  packs/
    AdventureHelpersBP/   # Behavior pack source
    AdventureHelpersRP/   # Resource pack source
  dist/                   # Generated .mcpack/.mcaddon files
  tools/
    package.ps1           # Build script
```

## Build

From this folder:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\package.ps1
```

The generated files are written to `dist/`:

- `AdventureHelpersBP.mcpack`
- `AdventureHelpersRP.mcpack`
- `AdventureHelpers.mcaddon`

## Install For Testing

Import the behavior pack from `dist/AdventureHelpersBP.mcpack`. Import the resource pack only when resource files change.

In a test world, enable:

- `Adventure Helpers BP`
- `Adventure Helpers RP`
- Cheats, if you want to run helper commands directly.

The pack should give each player a Helper Whistle on initial spawn. You can also run:

```mcfunction
/function give_start
```

## Notes

Minecraft Bedrock pack import/version handling can leave old versions visible in the pack list. The behavior pack name includes the version to make update testing easier.
