# bruh 🚀 Notion Client - Freelance Projects Dashboard

> A beautiful, dark-mode dashboard for managing freelance projects. Built with Next.js, TypeScript, and Tailwind CSS.

![Dashboard Preview](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Dashboard+Preview)

## ⚡ Quick Start

```bash
# Clone and install
git clone <repository-url>
cd notion-client-2025
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're ready to go! 🎉

## ✨ What You Get

### 🎯 Project Management

- ✅ Add, edit, and delete projects
- 📊 Sortable data table with filters
- 🏷️ Status tracking (Completed, In Progress, On Hold, etc.)
- ⚡ Priority levels with color coding
- 💰 Budget and time tracking

### 🎨 Beautiful UI

- 🌙 Notion-inspired dark theme
- 📱 Mobile-responsive design
- ✨ Smooth animations with Framer Motion
- 🎭 Interactive hover effects
- 📝 Clean modal forms

### 🔧 Built Right

- 🛡️ Full TypeScript support
- ⚡ Zustand state management
- 🧩 Modular components
- ♿ Accessibility features

## 🛠️ Tech Stack

| Technology        | Purpose                         |
| ----------------- | ------------------------------- |
| **Next.js 14**    | React framework with App Router |
| **TypeScript**    | Type safety and better DX       |
| **Tailwind CSS**  | Utility-first styling           |
| **Zustand**       | Lightweight state management    |
| **Framer Motion** | Smooth animations               |
| **Lucide React**  | Beautiful icons                 |

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Main dashboard page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── ProjectTable.tsx   # Data table
│   └── ProjectModal.tsx   # Add/edit forms
├── lib/                   # Utilities and data
│   ├── data/projects.ts   # Mock data
│   └── store.ts           # State management
└── types/                 # TypeScript definitions
```

## 🎨 Design System

### Colors

- **Background**: Dark grays (`#191919`, `#1a1a1a`, `#2d2d2d`)
- **Text**: Light grays (`#e5e5e5`, `#a0a0a0`)
- **Accents**: Blue, Green, Orange, Red, Purple
- **Borders**: Subtle grays (`#3d3d3d`)

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

### Components

- **Border Radius**: 8px (lg), 4px (md), 2px (sm)
- **Spacing**: 4px grid system
- **Shadows**: Subtle drop shadows

## 📱 Responsive Design

| Breakpoint  | Screen Size    | Features                               |
| ----------- | -------------- | -------------------------------------- |
| **Mobile**  | < 640px        | Collapsible sidebar, horizontal scroll |
| **Tablet**  | 640px - 1024px | Optimized layout                       |
| **Desktop** | > 1024px       | Full sidebar, complete table view      |

## 🔧 Customization

### Add New Project Fields

1. Update `Project` interface in `src/types/index.ts`
2. Add field to mock data in `src/lib/data/projects.ts`
3. Update table in `ProjectTable.tsx`
4. Add form fields to `ProjectModal.tsx`

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Individual component files

### State Management

- Add properties in `src/lib/store.ts`
- Create actions for new functionality
- Use `useDashboardStore()` in components

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Deploy with defaults

### Other Options

- **Netlify**: `npm run build` → `out` directory
- **Railway**: Connect GitHub repo
- **Docker**: Use included Dockerfile

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Notion's design system
- Built with modern React patterns
- Uses Tailwind CSS and Framer Motion

## 📞 Support

Questions? Open an issue on GitHub.

---

**Happy coding! 🎉**
