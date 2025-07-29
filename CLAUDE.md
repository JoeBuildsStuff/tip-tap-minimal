# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` (runs Next.js on http://localhost:3000)
- **Build production**: `pnpm build`
- **Start production**: `pnpm start`
- **Lint code**: `pnpm lint`
- **Build shadcn registry**: `pnpm registry:build`

## Project Architecture

This is a Next.js 15 application showcasing a Tiptap rich text editor with shadcn/ui components.

### Core Structure
- **Next.js App Router**: Uses `src/app/` directory structure with layout.tsx and page.tsx
- **Component Organization**: 
  - `src/components/tiptap/` - Tiptap editor components and menus
  - `src/components/ui/` - Comprehensive shadcn/ui component library
  - `src/components/` - Application-specific components
- **Package Manager**: Uses pnpm (version 9.15.4+)

### Tiptap Editor Implementation
The main editor is built around several key components:
- **Main Editor (`tiptap.tsx`)**: Core editor with StarterKit, Underline, TextAlign, CodeBlock with syntax highlighting, Link support, and Placeholder
- **Fixed Menu (`fixed-menu.tsx`)**: Persistent toolbar with formatting options
- **Bubble Menu (`bubble-menu.tsx`)**: Context menu that appears on text selection
- **Code Block (`code-block.tsx`)**: Custom code block with Lowlight syntax highlighting

### Key Dependencies
- **Tiptap v3**: Headless rich text editor framework
- **shadcn/ui**: Component system built on Radix UI primitives
- **Tailwind CSS v4**: Utility-first CSS framework
- **Lowlight**: Syntax highlighting for code blocks
- **Lucide React**: Icon library
- **Next Themes**: Dark/light mode support

### Component Configuration
- **shadcn/ui**: New York style, RSC enabled, TypeScript, CSS variables enabled
- **Path aliases**: `@/components`, `@/lib`, `@/hooks` configured
- **Theme system**: Neutral base color with dark/light mode support

### Editor Features
- Rich text formatting (bold, italic, underline, strikethrough)
- Heading levels and text alignment
- Code blocks with syntax highlighting using Lowlight
- Inline code snippets
- Link support with Cmd+K/Ctrl+K shortcut
- Ordered and unordered lists
- Placeholder text
- Content change callbacks
- Floating bubble menu and fixed toolbar options

### Registry System
The project includes a shadcn registry setup at `/registry/tiptap-editor/` for easy component distribution. The main page demonstrates installation via `npx shadcn@latest add https://tip-tap-minimal.vercel.app/r/tiptap-editor.json`.