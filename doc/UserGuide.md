# Sales Data Management System - User Guide

This comprehensive guide explains how to use the Sales Data Management System, including data entry, admin functions, and system customization.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Data Entry](#data-entry)
3. [Viewing and Managing Sales Data](#viewing-and-managing-sales-data)
4. [Admin Panel](#admin-panel)
   - [Authentication](#authentication)
   - [Managing Items](#managing-items)
   - [Managing Regions](#managing-regions)
   - [Managing People](#managing-people)
   - [Form Field Visibility](#form-field-visibility)
   - [Custom Fields](#custom-fields)
   - [Security Settings](#security-settings)
5. [CSV Export](#csv-export)
6. [Documentation Panel](#documentation-panel)
7. [Troubleshooting](#troubleshooting)

## Getting Started

The Sales Data Management System is a web-based application that allows you to enter, view, and manage sales data with a user-friendly interface similar to Google Forms but with Excel-like functionality.

The system has three main sections:
- **Data Entry**: For entering new sales records
- **Admin Panel**: For system configuration and customization
- **Documentation**: For reference information about the system

## Data Entry

The Data Entry tab is where you can add new sales records:

1. Fill in the required fields (marked with an asterisk *)
2. Select values from dropdowns where available
3. The "Sale Amount" is automatically calculated (Units × Unit Price)
4. Click "Submit" to save the record
5. The record will appear in the "Submitted Sales Data" section below the form

### Field Descriptions:

- **Order Date**: The date of the sales transaction
- **Region**: Geographic sales region
- **Manager**: The manager overseeing the sale
- **Salesman**: The salesperson who made the sale
- **Item**: The product sold
- **Units**: Quantity of items sold
- **Unit Price**: Price per unit in dollars
- **Sale Amount**: Automatically calculated total (Units × Unit Price)
- **Custom Fields**: Any additional fields configured by the admin

## Viewing and Managing Sales Data

The "Submitted Sales Data" section displays all entered sales records:

- Records are shown as cards with key information
- Each card has edit and delete buttons
- Click the edit button (pencil icon) to modify a record
- Click the delete button (trash icon) to remove a record

### Editing Records:

1. Click the edit button on a sales record
2. Modify the information in the edit dialog
3. Click "Save Changes" to update the record
4. The display will automatically refresh with the updated information

## Admin Panel

The Admin Panel allows you to customize the system. It requires authentication to access.

### Authentication

To access the Admin Panel:

1. Click on the "Admin Panel" tab
2. Enter your username and password
   - Default username: `admin`
   - Default password: `1234admin`
3. Click "Login"
4. To log out, click the "Logout" button in the top right corner

### Managing Items

The Items tab allows you to manage the products available for sale:

1. To add an item:
   - Enter the item name
   - Set the default price
   - Click "Add"
2. To remove an item:
   - Click the trash icon next to the item
3. Click "Save Changes" at the top of the admin panel to apply your changes

### Managing Regions

The Regions tab allows you to manage sales regions:

1. To add a region:
   - Enter the region name
   - Click "Add"
2. To remove a region:
   - Click the trash icon next to the region
3. Click "Save Changes" to apply your changes

### Managing People

The People tab allows you to manage managers and salespeople:

1. To add a manager or salesperson:
   - Enter the name
   - Click "Add"
2. To remove a person:
   - Click the trash icon next to their name
3. Click "Save Changes" to apply your changes

### Form Field Visibility

The Form Fields tab allows you to control which fields appear in the data entry form:

1. Toggle the switch next to each field to show or hide it
2. Click "Save Changes" to apply your changes

### Custom Fields

The Custom Fields tab allows you to create additional fields for your sales data:

1. To add a custom field:
   - Click "Add Field"
   - Enter the field name
   - Select the field type (Text, Number, or Dropdown)
   - For dropdown fields, add options
   - Choose whether the field is required
   - Click "Create Field"
2. To edit a custom field:
   - Click the edit icon next to the field
   - Modify the field properties
   - Click "Save Changes"
3. To delete a custom field:
   - Click the trash icon next to the field
4. Click "Save Changes" at the top of the admin panel to apply your changes

### Security Settings

The Security tab allows you to change the admin credentials:

1. Enter a new username
2. Enter a new password
3. Confirm the new password
4. Click "Update Credentials"
5. Click "Save Changes" at the top of the admin panel to apply your changes

**Important**: Remember your new credentials! If you forget them, you'll need to clear your browser's local storage to reset to the defaults.

## CSV Export

The system allows you to export all sales data to a CSV file:

1. Click the "Export CSV" button on the Data Entry tab
2. The file will download automatically
3. The CSV includes all standard fields and custom fields
4. The file can be opened in Excel or any spreadsheet software

## Documentation Panel

The Documentation tab provides reference information about:

- Column definitions
- Formulas and calculations
- Implementation notes

This information helps users understand the data structure and system functionality.

## Troubleshooting

### Data Not Saving

If your data isn't being saved:
- Make sure your browser has local storage enabled
- Check that you're not in private/incognito browsing mode
- Ensure you have sufficient storage space

### Admin Panel Access Issues

If you can't access the admin panel:
- Double-check your username and password
- If you've forgotten your credentials, clear your browser's local storage:
  - Open browser developer tools (F12)
  - Go to Application > Local Storage
  - Clear the items for your site
  - Refresh the page (this will reset to default credentials)

### CSV Export Problems

If CSV export isn't working:
- Make sure you have at least one sales record
- Check if your browser is blocking downloads
- Try using a different browser

### Custom Fields Not Appearing

If custom fields aren't appearing:
- Make sure you clicked "Save Changes" in the admin panel
- Check that you've added at least one custom field
- Refresh the page if changes aren't visible