# MIS Business

A responsive, browser-based MIS dashboard with employee, HR, and asset management.

## Overview
MIS Business provides a local-first management information system for hospital
operations, including an HR module and asset inventory.

## Features
- Employee onboarding with business, department, role, employment type, contact, and salary details
- Employee master list with text search, status and department filters, and multi-business filtering
- Daily attendance recording with present, late, absent, and leave summaries
- Leave requests with approval, decline, and annual leave balance tracking
- Monthly payroll processing and downloadable CSV payslips
- Recruitment pipeline with interview dates and candidate stages
- Performance appraisals with ratings and written feedback
- Employee document uploads, downloads, and expiry tracking
- Alerts for pending leave approvals and expiring or expired documents
- Department headcount and workforce dashboard metrics
- Register and manage assets with serial numbers and assignment details
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

## Local storage notes
All employee and HR information is saved in the current browser profile and is
not synchronized between devices or users. Uploaded documents are stored in
browser storage and limited to 400 KB per file. Use a backend with
authentication, access controls, backups, and secure document storage before
using this prototype for real employee, payroll, or healthcare data.
