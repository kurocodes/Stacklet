# 🧁 Stacklet

A tiny, playful stacking component with smooth expand & collapse animations ✨

Stacklet is a fun, reusable UI component for stacking elements that smoothly expand and collapse.
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
- Control expansion direction (up, down, left, right)
- Limit visible items when collapsed
- Works with any trigger (hover, click, state, etc.)
- Content-agnostic — not tied to notifications
- Lightweight & reusable by design

## 🧠 Process

This component didn’t start as Stacklet.

A while ago, I built a collapsible notification UI and later noticed similar stacked interactions floating around the internet.
That’s when a thought popped into my head:

> “Why should this be just for notifications?”

So I decided to strip away all notification-specific logic and rebuild the idea as a generic stacking system — something that could work for cards, images, toasts, or any custom element.

The result is Stacklet:
a small but flexible motion primitive focused purely on layout, depth, and animation, not assumptions.

## 🚀 Usage

Here’s a simple example:

```
<Stacklet open={isHovered} stackedFrom="start">
  {items.map((item) => (
    <Item key={item.id} item={item} />
  ))}
</Stacklet>
```

You control when it opens.
Stacklet handles how it looks and animates ✨

## 🧪 Running the Project

1. clone the repo: `git clone https://github.com/your-username/stacklet.git`
2. install dependencies: `npm install`
3. start dev server: `npm run dev`

Then open your browser and enjoy the stack magic 🪄

## 👀 Preview



https://github.com/user-attachments/assets/cd37e04f-7e26-4e95-a4bf-e5724d9fe96f



## 💖 Final Note

Stacklet is built with curiosity, experimentation, and a love for delightful UI interactions.
Feel free to fork it, break it, remix it, or use it in your own projects.

If you do something cool with it — I’d love to see it ✨
