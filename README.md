# Sales Data Management System

A modern web application for managing sales data with a user-friendly interface, custom fields, and Excel-like functionality.

![image](https://github.com/user-attachments/assets/c0bcae3c-45cc-4797-8634-6e3c4aecf058)
![image](https://github.com/user-attachments/assets/02ba73a9-c967-4cbe-87e6-e9a204c559da)
![image](https://github.com/user-attachments/assets/3b2bf05d-918e-4afd-a79d-78a6cc1fd4a7)
![image](https://github.com/user-attachments/assets/cc1afe73-a755-402f-b81d-55a0161adcd2)




## Features

- 📝 Google Forms-like data entry interface  
- 📊 Excel-like data management with auto-calculations  
- 🔒 Secure admin panel with authentication  
- 🛠 Customizable fields and form layout  
- 📱 Responsive design for all devices  
- 📄 CSV export with all data including custom fields  
- 🔄 Real-time data updates  
- 📋 Comprehensive documentation  

## Technologies Used

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dilshanpadukka/Sales-Data-Management-System.git
   cd sales-data-management
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```plaintext
sales-data-management/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/           # React components
│   ├── admin-auth.tsx    # Admin authentication
│   ├── admin-credentials.tsx # Admin credentials management
│   ├── admin-panel.tsx   # Admin panel
│   ├── app-provider.tsx  # Context provider
│   ├── custom-fields-manager.tsx # Custom fields management
│   ├── documentation-panel.tsx # Documentation
│   ├── edit-sales-record-dialog.tsx # Edit dialog
│   ├── sales-data-display.tsx # Data display
│   └── sales-form.tsx    # Data entry form
├── public/               # Static assets
└── docs/                 # Documentation
    └── UserGuide.md      # User guide
```

## Default Admin Credentials

- Username: `admin`
- Password: `1234admin`

## License

[MIT](LICENSE)
