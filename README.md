# 🧁 Stacklet

A tiny, playful stacking component with smooth expand & collapse animations ✨

Stacklet is a fun, reusable UI component for stacking elements that smoothly expand and collapse. </br>
It’s designed to add a sense of depth, motion, and delight to your interface — without locking you into a specific use-case.

You can use Stacklet for:

- notifications
- cards
- images
- toasts
- previews

…and pretty much anything you want to stack 🪄

## 🛠️ Technologies

- React
- Motion
- TypeScript
- Tailwind CSS

## ✨ Features

- Smooth expand & collapse animations
- Control which item stays on top (stackedFrom)
- Control stack growth direction (direction)
- Control how items pile up (align)
- Limit visible items when collapsed
- Works with any trigger (hover, click, state, etc.)
- Content-agnostic — not tied to notifications
- Lightweight & reusable

## 🧠 Process

This component didn’t start as Stacklet.

A while ago, I built a collapsible notification UI and later noticed similar stacked interactions floating around the internet. </br>
That’s when a thought popped into my head:

> “Why should this be just for notifications?”

So I decided to strip away all notification-specific logic and rebuild the idea as a generic stacking system — </br>
something that could work for cards, images, toasts, or any custom element.

The goal wasn’t to build a finished UI component,
but a small motion primitive focused purely on:

- layout
- depth
- direction
- animation

The result is Stacklet — flexible, composable, and assumption-free.

## 🧩 Props

Stacklet exposes a small set of focused props. </br>
You don’t need all of them — just the ones you care about.

### Required

- `open: boolean` </br>
  Controls whether the stack is expanded or collapsed.

### Layout & Order

- `stackedFrom?: "start" | "end"` </br>
  Controls which item stays on top in the stack. </br>
  `"start"` → first item is the hero </br>
  `"end"` → last item is the hero

- `direction?: "up" | "down" | "left" | "right"` </br>
  Controls the axis and direction the stack expands in.

- `align?: "forward" | "backward"` </br>
  Controls how items pile relative to the hero item. </br>
  Useful for creating mirrored or inverted stacks.

### Spacing & Size

- `itemSize?: number` </br>
  Height (or width, for horizontal stacks) of one item. </br>
  Recommended for stable layouts (no reflow).

- `expandedSpacing?: number (default: 8)` </br>
  Space between items when expanded.

- `collapsedSpacing?: number (default: 10)` </br>
  Offset between items when collapsed.

### Visual Depth

- `scaleStep?: number (default: 0.04)` </br>
  How much each stacked item scales down.

- `opacityStep?: number (default: 0.08)` </br>
  How much each stacked item fades.

### Other

- `collapsedCount?: number` </br>
  Limits how many items are visible when collapsed.

## 🚀 Usage

Here’s a simple example:

```
<div className="w-[240px]">
  <Stacklet
    open={isHovered}
    stackedFrom="start"
    direction="up"
    itemSize={64}
  >
    {items.map((item) => (
      <Item key={item.id} item={item} />
    ))}
  </Stacklet>
</div>
```

You control when it opens.
Stacklet handles how it stacks and animates ✨

## 🧪 Running the Project

1. clone the repo: `git clone https://github.com/your-username/stacklet.git`
2. install dependencies: `npm install`
3. start dev server: `npm run dev`

Then open your browser and enjoy the stack magic 🪄

## 👀 Preview

https://github.com/user-attachments/assets/cd37e04f-7e26-4e95-a4bf-e5724d9fe96f

## 💖 Final Note

Stacklet is built with curiosity, experimentation, and a love for delightful UI interactions.

Feel free to fork it, break it, remix it, or use it in your own projects. </br>
If you build something cool with it — I’d genuinely love to see it ✨
