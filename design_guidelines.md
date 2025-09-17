# Civic Issue Resolution System - Design Guidelines

## Design Approach
**System-Based Approach**: Using a modified Material Design system optimized for administrative interfaces, emphasizing clarity, efficiency, and municipal professionalism. This utility-focused application prioritizes data visibility and workflow efficiency over visual flourishes.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Primary Blue: 214 85% 25% (Municipal authority blue)
- Secondary Blue: 214 65% 40% (Interactive elements)
- Success Green: 142 76% 36% (Resolved issues)
- Warning Orange: 38 92% 50% (Pending issues)
- Error Red: 0 84% 60% (Critical/overdue issues)

**Neutral Palette:**
- Background: 210 20% 98% (Light mode main)
- Surface: 0 0% 100% (Card backgrounds)
- Border: 214 20% 90% (Subtle divisions)
- Text Primary: 214 25% 15%
- Text Secondary: 214 15% 45%

**Dark Mode:**
- Background: 214 25% 8%
- Surface: 214 20% 12%
- Border: 214 15% 20%

### Typography
**Font Stack:** Inter (Google Fonts)
- Headers: 600-700 weight, sizes 24px-32px
- Body: 400-500 weight, 14px-16px
- Data/Numbers: 500 weight, tabular numbers
- Captions: 400 weight, 12px-13px

### Layout System
**Spacing Units:** Tailwind units of 1, 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section margins: m-8, m-12
- Grid gaps: gap-4, gap-6
- Icon spacing: mr-2, ml-2

### Component Library

**Navigation:**
- Fixed header (h-16) with municipal logo, search, and user controls
- Collapsible sidebar (w-64 expanded, w-16 collapsed) with hierarchical menu
- Breadcrumb navigation below header

**Data Display:**
- Issue cards with status indicators, priority badges, and quick actions
- Data tables with sorting, filtering, and pagination
- Metric cards for dashboard overview with large numbers and trend indicators
- Status badges using semantic colors (green/orange/red)

**Forms & Controls:**
- Clean input fields with subtle borders and focus states
- Dropdown selectors for departments, status, priority
- Date range pickers for filtering
- Search bars with autocomplete functionality

**Charts & Analytics:**
- Bar charts for issue volume by department
- Line charts for resolution trends over time
- Pie charts for issue type distribution
- Use muted colors (grays/blues) with accent colors for highlighting

## Key Design Principles

1. **Information Hierarchy:** Critical data (issue ID, status, priority) prominently displayed
2. **Workflow Efficiency:** Minimize clicks for common actions (assign, update status, view details)
3. **Responsive Design:** Sidebar collapses on mobile, tables become scrollable cards
4. **Accessibility:** High contrast ratios, keyboard navigation, screen reader support
5. **Consistency:** Uniform spacing, consistent icon usage, standardized component states

## Images
**Municipal Branding:**
- Municipal authority logo in header (svg format, 40px height)
- Department icons for sidebar navigation (16px, outline style)
- No hero images - this is a utility dashboard focused on data and functionality
- Issue attachment thumbnails in detail views (48px square with rounded corners)
- User avatar placeholders (32px circular) in header dropdown

The design emphasizes clarity and efficiency over visual drama, creating a professional administrative interface that municipal staff can use effectively throughout their workday.