# Notion Client - Freelance Projects Dashboard

A responsive, dark-mode dashboard UI inspired by Notion, specifically designed for creative freelancers who manage multiple client projects. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🎯 Features

### Core Functionality

- **Project Management**: Add, edit, and delete freelance projects
- **Data Table**: Sortable and filterable project table with realistic mock data
- **Status Tracking**: Visual status indicators (Completed, In Progress, On Hold, Not Started, Review)
- **Priority Management**: Priority levels (Low, Medium, High, Urgent) with color coding
- **Client Types**: Support for various client types (Individual, Startup, Non-profit, Enterprise, etc.)
- **Budget & Time Tracking**: Track project budgets and hours spent

### UI/UX Features

- **Dark Theme**: Notion-inspired dark mode design
- **Responsive Design**: Mobile-first approach with responsive sidebar and table
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Interactive Elements**: Hover effects, smooth transitions, and micro-interactions
- **Modal Forms**: Clean modal interface for adding/editing projects

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **State Management**: Zustand for efficient state management
- **Component Architecture**: Modular, reusable components
- **Mobile Responsive**: Optimized for all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd notion-client-2025
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page (redirects to dashboard)
│   └── globals.css           # Global styles
├── components/
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── ProjectTable.tsx      # Main project table
│   └── ProjectModal.tsx      # Add/edit project modal
├── lib/
│   ├── data/
│   │   └── projects.ts       # Mock project data
│   ├── store.ts              # Zustand state management
│   └── utils.ts              # Utility functions
└── types/
    └── index.ts              # TypeScript type definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 🎨 Design System

### Color Palette

- **Background**: Dark grays (#191919, #1a1a1a, #2d2d2d)
- **Text**: Light grays (#e5e5e5, #a0a0a0)
- **Accents**: Blue (#3b82f6), Green, Orange, Red, Purple
- **Borders**: Subtle grays (#3d3d3d, #2d2d2d)

### Typography

- **Font Family**: Inter
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components

- **Rounded Corners**: 8px (lg), 4px (md), 2px (sm)
- **Shadows**: Subtle drop shadows for depth
- **Spacing**: Consistent 4px grid system

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Features

- Collapsible sidebar with overlay
- Horizontal scrolling table
- Touch-friendly buttons and interactions
- Optimized typography and spacing

## 🔧 Customization

### Adding New Project Fields

1. Update the `Project` interface in `src/types/index.ts`
2. Add the field to the mock data in `src/lib/data/projects.ts`
3. Update the table headers and cells in `ProjectTable.tsx`
4. Add form fields to `ProjectModal.tsx`

### Styling Customization

- Modify `src/app/globals.css` for global styles
- Update Tailwind config in `tailwind.config.js`
- Customize component styles in individual component files

### State Management

- Add new state properties in `src/lib/store.ts`
- Create new actions for additional functionality
- Use the store in components with `useDashboardStore()`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Other Platforms

- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **Railway**: Connect GitHub repository and deploy
- **Docker**: Use the included Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Notion's design system
- Built with modern React patterns
- Uses Tailwind CSS for styling
- Framer Motion for animations

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy coding! 🎉**
