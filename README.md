# S3-Copaco Frontend

## Overview
This project is a **team frontend application** for a PC configuration platform.

The frontend includes user-facing pages for profile information and prebuilt PC templates, and connects to backend APIs for configuration/template data. My main contribution focused on **frontend feature development**, UI implementation, and API integration.

## Project Type
- **Team project**
- **My role:** Frontend development (UI pages, routing integration, backend API integration)

## My Contributions (Lin2408)

### 1) Profile Page
- Built the **Profile page** from scratch
- Displayed user profile information (name, email, avatar) from **Auth0**
- Added route integration in `App.jsx`
- Added a **Profile** link to the navigation bar
- Refined and simplified the page implementation in a later update

### 2) Prebuilt Templates / PC Configuration Page
- Built the **Prebuilt Templates page** (card-based UI)
- Displayed prebuilt PC configurations with:
  - image
  - price
  - expandable specification details
- Added page route integration in `App.jsx`
- Added **Prebuilds** link to the navigation bar
- Connected the page to backend APIs to fetch prebuilt template data
- Refined data fetching and display logic (state handling / UI improvements)

### 3) Additional Frontend Contributions
- Minor CSS/styling updates (e.g., item overview styling)
- Team integration support through merge/PR collaboration

## Features (Frontend)
- User profile page with Auth0 user data display
- Prebuilt PC template browsing UI
- Expandable specification details
- Backend API integration for template/configurator flow
- Navigation links for profile and prebuilt pages
- Responsive card-based UI (Material UI)

## Tech Stack (Confirmed from my work)
- **React** (frontend)
- **Material UI (MUI)** (UI components)
- **Auth0** (profile/auth-related integration in frontend)
- **CSS** (custom page styling)
- **Backend API integration** (for template/configurator data)

## Project Structure (Contribution-Related)
- `ProfilePage.jsx` / `ProfilePage.css`
- `PrebuildTemplatesPage.jsx` / `PrebuildTemplatesPage.css`
- `App.jsx` (route integration)
- `Navbar` updates (navigation links)

## How to Run
Please follow the setup instructions in the project (and backend/frontend environment configuration if required).

Typical frontend steps (please verify in this repo):
```bash
npm install
npm run dev
