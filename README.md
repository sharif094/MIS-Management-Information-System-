# MIS-Management-Information-System-

A complete, responsive MIS dashboard for HR management and asset tracking.

## Overview
This project provides a simple but practical management information system for:
- employee directory and status tracking
- department overview and staffing metrics
- asset registration and assignment tracking
- inventory visibility for available and assigned equipment

## Features
- Add, view, and remove employees
- Track employee status: Active, On Leave, Inactive
- Register and manage assets with serial numbers and assignment details
- Dashboard summary cards for workforce and asset utilization
- Search and filter employee records
- Local browser persistence using `localStorage`

## Run the project
Because this is a front-end project, there are no dependencies to install.

1. Open `index.html` directly in a browser, or
2. Run a small static server from the project root:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Project structure
- `index.html` – application layout
- `styles.css` – dashboard styling and responsive layout
- `app.js` – employee and asset logic, sample data, and data persistence

## Notes
The project is intentionally lightweight and ready to extend with backend APIs, authentication, reporting, and role-based access control.
