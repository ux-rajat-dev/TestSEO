# Google Apps Script Setup Guide

## Step 1: Create a New Google Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. You'll see a default `Code.gs` file

## Step 2: Replace the Default Code

1. Delete all the default code in `Code.gs`
2. Copy and paste the code from `google-apps-script-code.js` (the file I created)
3. Save the project (Ctrl+S or Cmd+S)

## Step 3: Deploy as Web App

1. Click the "Deploy" button (top right)
2. Select "New deployment"
3. Click the gear icon ⚙️ next to "Type" and select "Web app"
4. Fill in the deployment settings:
   - **Description**: "Quote Form Handler" (or any name you prefer)
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this allows your website to call it)
5. Click "Deploy"
6. **IMPORTANT**: Copy the Web App URL that appears - this is what you'll use in your website

## Step 4: Grant Permissions

1. When you first run the script, Google will ask for permissions
2. Click "Review permissions"
3. Select your Google account
4. Click "Advanced" → "Go to [Project Name] (unsafe)" (this is safe for your own script)
5. Click "Allow"

## Step 5: Test the Script

1. In the Apps Script editor, you can run the `testScript()` function
2. Go to "Run" → "testScript" to test if it works
3. Check your Google Sheet to see if test data appears

## Step 6: Update Your Website

Replace the URL in your website code with the Web App URL from Step 3.

## Troubleshooting

- **"Script not found"**: Make sure you deployed as a Web App, not just saved the script
- **"Permission denied"**: Make sure you set "Who has access" to "Anyone"
- **"Function not found"**: Make sure you copied the complete code including `doPost` function
- **No data in sheet**: Check that the sheet name is exactly "QuoteRequests" and the spreadsheet ID is correct

## Your Current Settings

- **Spreadsheet ID**: `1k_Wbf_-5lPz73mbaNmN8K2Vt3V1GZWAYj5jzco75ZM0`
- **Sheet Name**: `QuoteRequests`
- **Current Web App URL**: `https://script.google.com/macros/s/AKfycbwPoW0AYSj6OUunJG2SDJ0Oxy4UWrG9jRo3JFoB9NVwOZWKMpV5QYjkrETzbfckcIJtxg/exec`

If you need to create a new deployment, you'll get a new URL that you'll need to update in your website code.
