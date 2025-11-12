 # Google Sheet Setup Guide for Package Summary

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Package Summaries" or similar
4. Copy the **Spreadsheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
   - Copy the part between `/d/` and `/edit`

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code
4. Copy and paste the code from `google-apps-script-package-summary.js`
5. **Update the SPREADSHEET_ID** in the script:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your actual ID
   ```

## Step 3: Deploy as Web App

**IMPORTANT: Email Configuration**
- The script will send emails **FROM** the Google account that deploys/runs it
- To send emails from `india.office@houseofcompanies.io`:
  - You must be logged into Google Apps Script with the `india.office@houseofcompanies.io` account
  - OR share the script with that account and have them deploy it
  - The "from" address will automatically be the account running the script

### Initial Deployment:
1. **Make sure you're logged in as india.office@houseofcompanies.io** (or share the script with that account)
2. Click "Deploy" → "New deployment"
3. Click the gear icon (⚙️) next to "Select type"
4. Choose "Web app"
5. Configure:
   - **Description**: "Package Summary Email & Sheet Storage"
   - **Execute as**: "Me" (this will be india.office@houseofcompanies.io if logged in as that account)
   - **Who has access**: "Anyone" ⚠️ **CRITICAL: Must be "Anyone" for CORS to work**
6. Click "Deploy"
7. **Authorize** the script (first time only) - grant permissions for:
   - Google Sheets access
   - Gmail/Mail sending access
8. Copy the **Web App URL** - you'll need this for the frontend

### ⚠️ CRITICAL: Updating the Script After Changes

**If you make ANY changes to the script code, you MUST create a NEW deployment version:**

1. Go to **Deploy** → **Manage deployments**
2. Click the **pencil icon (✏️)** next to your current deployment
3. Click **"New version"** ⚠️ **DO NOT just click "Update"**
4. Click **"Deploy"**
5. **Copy the new Web App URL** if it changed
6. **Update the URL in OrderSummaryPage.tsx** if the URL changed

**Why?** Google Apps Script caches deployments. If you just save the script without creating a new deployment version, the old code will still run, and POST request bodies won't reach the script correctly.

## Step 4: Update Frontend

1. Open `src/pages/OrderSummaryPage.tsx`
2. Find the line: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'`
3. Replace with your Web App URL from Step 3

## Google Sheet Column Structure

The script will automatically create these columns in your sheet:

| Column | Header | Description |
|--------|--------|-------------|
| A | Timestamp | ISO timestamp when the record was created |
| B | Name | Customer's name |
| C | Email | Customer's email address |
| D | Phone | Customer's phone number |
| E | Company Name | Company name |
| F | Plan Name | Selected plan (e.g., "eBranch") |
| G | Base Plan Price (€) | Base plan price (1495 or 1995) |
| H | Has Registered Office | "Yes" or "No" |
| I | Registered Office Price (€) | 500 if included, 0 otherwise |
| J | Selected Add-ons (JSON) | JSON string of selected add-ons |
| K | Add-ons Total (€/year) | Total yearly cost of add-ons |
| L | Subtotal (€) | Subtotal before VAT |
| M | VAT (21%) (€) | VAT amount |
| N | Total (€) | Final total including VAT |
| O | Country | Customer's country |
| P | Primary Focus | Primary service focus |
| Q | Qualification ID | Qualification record ID |
| R | Email Sent | "Yes" if email was sent |
| S | Notes | Additional notes |

## Testing

1. Run the test function in Google Apps Script:
   - Click on `testPackageSummary` function
   - Click "Run"
   - Check your email and Google Sheet

2. Test from frontend:
   - Fill out the order summary page
   - Click "Receive via Email"
   - Check that:
     - Email is received
     - Data appears in Google Sheet

## Email Configuration

The script sends emails with:
- **To**: Customer's email
- **CC**: india.office@houseofcompanies.io, dennis@houseofcompanies.io, aryan@houseofcompanies.io
- **From**: support@houseofcompanies.io
- **Subject**: "Your [Plan Name] Package Summary - House of Companies"

## Troubleshooting

### Email not sending
- Check Google Apps Script execution logs
- Verify email addresses are valid
- Check Gmail API quotas

### Data not saving to sheet
- Verify Spreadsheet ID is correct
- Check sheet permissions
- Verify the sheet name matches `SHEET_NAME` in script

### CORS errors
- Ensure "Who has access" is set to "Anyone"
- Check that `doOptions` function is in the script

## Security Notes

- The Web App URL is public - anyone with the URL can call it
- Consider adding basic authentication or API key validation
- Don't expose sensitive credentials in the script
- Regularly review sheet access permissions

