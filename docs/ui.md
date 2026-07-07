# UI Components

## Rules

- **ALL UI elements must use shadcn/ui components.** Never create custom components.
- Import shadcn/ui components from `@/components/ui/`.
- If a needed component does not exist in `components/ui/`, add it via the shadcn CLI (`npx shadcn@latest add <component>`) — do **not** build it from scratch.
- Do not wrap shadcn/ui components in unnecessary custom wrapper components.
- Do not override shadcn/ui component internals. Use the `className` prop with Tailwind utilities for minor style adjustments only.

## Available Components

Check `components/ui/` for the current list of installed components before adding new ones.

## Adding New Components

```bash
npx shadcn@latest add <component-name>
```

Requires user approval before running (installs files and may update `components.json`).
