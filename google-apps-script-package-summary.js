/**
 * Google Apps Script for Package Summary Email & Google Sheets Storage
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Copy the Spreadsheet ID from the URL (between /d/ and /edit)
 * 3. Create a new Google Apps Script project (script.google.com)
 *    IMPORTANT: Log in with india.office@houseofcompanies.io account
 * 4. Paste this code into the script editor
 * 5. Update the SPREADSHEET_ID below with your sheet ID (already configured)
 * 6. Deploy as a web app with execute as "Me" and access "Anyone"
 *    - "Me" will be india.office@houseofcompanies.io if logged in as that account
 * 7. Copy the web app URL and use it in OrderSummaryPage.tsx
 * 
 * EMAIL CONFIGURATION:
 * - Emails will be sent FROM the account that deploys/runs this script
 * - To send from india.office@houseofcompanies.io, deploy while logged in as that account
 * - The script uses MailApp which sends from the executing user's email address
 */

// ===== CONFIGURATION =====
const SPREADSHEET_ID = '1T3fIcfXK2d789W0WWSK7wN3Fb6KEUSofolwlMMRGo1s'; // Google Sheet ID
const SHEET_NAME = 'Sheet1'; // Sheet name

// ===== GOOGLE SHEET COLUMNS =====
/**
 * Column Structure (Row 1 - Headers):
 * 
 * A: Timestamp
 * B: Name
 * C: Email
 * D: Phone
 * E: Company Name
 * F: Plan Name
 * G: Base Plan Price (€)
 * H: Has Registered Office
 * I: Registered Office Price (€)
 * J: Selected Add-ons (JSON)
 * K: Add-ons Total (€/year)
 * L: Subtotal (€)
 * M: VAT (21%) (€)
 * N: Total (€)
 * O: Country
 * T: Primary Focus
 * P: Qualification ID
 * Q: Email Sent
 * R: Notes
 */

// Main handler - tries both doPost and doGet to handle different request types
function doPost(e) {
  return handleRequest(e, 'POST');
}

function doGet(e) {
  // Handle GET requests (for testing or direct access)
  // Also try to handle POST requests that might come through as GET (some proxies do this)
  return handleRequest(e, 'GET');
}

function handleRequest(e, method) {
  let sheetResult = null;
  
  try {
    // Log that function was called
    console.log('=== handleRequest called ===');
    console.log('Method:', method);
    console.log('Event parameter (e):', e);
    console.log('Event parameter type:', typeof e);
    console.log('Arguments length:', arguments.length);
    
    // If this is a GET request with no parameters at all, return info message
    if (method === 'GET' && (!e || !e.parameter || Object.keys(e.parameter).length === 0)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Package Summary API is running. Use POST method or GET with parameters to send package summaries.',
          endpoint: 'POST to this URL with package summary data, or GET with URL parameters',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // CRITICAL: If e is undefined, the request body isn't reaching the script
    // This is a deployment issue - the script needs to be redeployed
    if (typeof e === 'undefined' || e === null) {
      console.error('CRITICAL: Event object (e) is undefined or null');
      console.log('This means the POST request body is not reaching the script.');
      console.log('SOLUTION: You MUST create a NEW deployment version in Google Apps Script.');
      console.log('Steps:');
      console.log('1. Go to Deploy > Manage deployments');
      console.log('2. Click the pencil icon (✏️) next to your deployment');
      console.log('3. Click "New version" (IMPORTANT: not just "Update")');
      console.log('4. Click "Deploy"');
      console.log('5. Copy the new URL if it changed');
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Event object is undefined. POST request body is not reaching the script.',
          message: 'This is a DEPLOYMENT issue. You must create a NEW deployment version.',
          criticalSteps: [
            '1. Go to Deploy > Manage deployments in Google Apps Script',
            '2. Click the pencil icon (✏️) next to your current deployment',
            '3. Click "New version" (DO NOT just click "Update")',
            '4. Click "Deploy"',
            '5. Copy the new Web App URL if it changed',
            '6. Update the URL in OrderSummaryPage.tsx if needed'
          ],
          debug: {
            method: method,
            argumentsLength: arguments.length,
            eventType: typeof e,
            timestamp: new Date().toISOString()
          }
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Log the event object to debug
    console.log('doPost called');
    console.log('e exists:', !!e);
    console.log('e.postData exists:', !!(e && e.postData));
    console.log('e.parameter exists:', !!(e && e.parameter));
    
    if (e.postData) {
      console.log('e.postData.type:', e.postData.type);
      console.log('e.postData.contents length:', e.postData.contents ? e.postData.contents.length : 'null');
    }
    
    // Parse the incoming JSON data
    let data = {};
    
    // Try multiple ways to get the data (different request formats)
    if (e.postData && e.postData.contents) {
      // Standard POST with JSON body
      console.log('Using postData.contents');
      console.log('postData.contents type:', typeof e.postData.contents);
      console.log('postData.contents value:', e.postData.contents);
      try {
        data = JSON.parse(e.postData.contents);
        console.log('Successfully parsed JSON from postData.contents');
      } catch (parseErr) {
        console.error('Error parsing postData.contents:', parseErr);
        console.error('Contents that failed to parse:', e.postData.contents);
        throw new Error('Failed to parse JSON from postData.contents: ' + parseErr.toString());
      }
    } else if (e.parameter && e.parameter.data) {
      // URL-encoded or query parameter
      console.log('Using parameter.data');
      try {
        data = JSON.parse(e.parameter.data);
        console.log('Successfully parsed JSON from parameter.data');
      } catch (parseErr) {
        console.error('Error parsing parameter.data:', parseErr);
        throw new Error('Failed to parse JSON from parameter.data: ' + parseErr.toString());
      }
    } else if (e.parameter) {
      // Direct parameters (form-encoded or GET URL parameters)
      console.log('Using direct parameters');
      console.log('Parameter keys:', Object.keys(e.parameter));
      
      // Convert GET parameters to proper data structure
      // Handle string to number/boolean/JSON conversions
      data = {};
      
      // Basic string fields
      if (e.parameter.name) data.name = e.parameter.name;
      if (e.parameter.email) data.email = e.parameter.email;
      if (e.parameter.phone) data.phone = e.parameter.phone;
      if (e.parameter.companyName) data.companyName = e.parameter.companyName;
      if (e.parameter.planName) data.planName = e.parameter.planName;
      if (e.parameter.country) data.country = e.parameter.country;
      if (e.parameter.primaryFocus) data.primaryFocus = e.parameter.primaryFocus;
      if (e.parameter.qualificationId) data.qualificationId = e.parameter.qualificationId;
      if (e.parameter.notes) data.notes = e.parameter.notes;
      if (e.parameter.timestamp) data.timestamp = e.parameter.timestamp;
      
      // Number fields
      if (e.parameter.basePlanPrice) data.basePlanPrice = parseFloat(e.parameter.basePlanPrice) || 0;
      if (e.parameter.addonsTotal) data.addonsTotal = parseFloat(e.parameter.addonsTotal) || 0;
      if (e.parameter.subtotal) data.subtotal = parseFloat(e.parameter.subtotal) || 0;
      if (e.parameter.vat) data.vat = parseFloat(e.parameter.vat) || 0;
      if (e.parameter.total) data.total = parseFloat(e.parameter.total) || 0;
      
      // Boolean fields
      if (e.parameter.hasRegisteredOffice) {
        data.hasRegisteredOffice = e.parameter.hasRegisteredOffice === 'true' || e.parameter.hasRegisteredOffice === true;
      }
      
      // JSON fields (parse if they're JSON strings)
      if (e.parameter.selectedAddons) {
        try {
          data.selectedAddons = JSON.parse(e.parameter.selectedAddons);
        } catch (e) {
          console.log('Error parsing selectedAddons, using empty object');
          data.selectedAddons = {};
        }
      }
      
      if (e.parameter.addonsList) {
        try {
          data.addonsList = JSON.parse(e.parameter.addonsList);
        } catch (e) {
          console.log('Error parsing addonsList, using empty array');
          data.addonsList = [];
        }
      }
      
      console.log('Converted GET parameters to data object:', JSON.stringify(data));
    } else {
      // No data found
      const errorMsg = 'No data found in request. ' +
        'postData: ' + (e.postData ? ('exists, type: ' + (e.postData.type || 'unknown')) : 'undefined') + ', ' +
        'parameter: ' + (e.parameter ? ('exists with keys: ' + Object.keys(e.parameter).join(', ')) : 'undefined');
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    // Validate that data was parsed correctly
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      console.error('Parsed data is invalid:', data);
      console.error('Data type:', typeof data);
      console.error('Is array:', Array.isArray(data));
      throw new Error('Parsed data is not a valid object. Got: ' + typeof data);
    }
    
    console.log('Parsed data successfully');
    console.log('Data type:', typeof data);
    console.log('Data is object:', typeof data === 'object' && !Array.isArray(data));
    console.log('Data keys:', Object.keys(data));
    console.log('Data email:', data.email);
    console.log('Data planName:', data.planName);
    
    // Validate required fields
    if (!data || !data.email || !data.planName) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Missing required fields: email and planName are required',
          receivedData: data
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // STEP 1: Save to Google Sheets FIRST
    try {
      sheetResult = saveToSheet(data);
      console.log('Data saved to Google Sheets successfully, row:', sheetResult.row);
      
      // STEP 2: Send email notification (don't fail if email fails)
      let emailResult = { sent: false };
      try {
        emailResult = sendPackageSummaryEmail(data);
        console.log('Email result:', emailResult);
        
        // Update Email Sent column if email was sent successfully
        if (emailResult.sent && sheetResult.row) {
          try {
            const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
            const sheet = spreadsheet.getSheetByName(SHEET_NAME);
            if (sheet) {
              // Column R (18) is "Email Sent"
              sheet.getRange(sheetResult.row, 18).setValue('Yes');
              console.log('Updated Email Sent column to Yes for row:', sheetResult.row);
            }
          } catch (updateError) {
            console.log('Could not update Email Sent column (non-critical):', updateError);
          }
        }
      } catch (emailError) {
        console.error('Error sending email (non-critical):', emailError);
        // Don't fail the whole request if email fails
      }
      
      // Return success response - data saved to sheets
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Package summary saved to Google Sheets successfully',
          sheetRow: sheetResult.row,
          sheetSaved: true,
          emailSent: emailResult.sent,
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (sheetError) {
      console.error('Error saving to Google Sheets:', sheetError);
      // Return error about sheet save failure
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Failed to save to Google Sheets: ' + sheetError.toString(),
          sheetSaved: false,
          message: 'Data could not be saved to Google Sheets',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
      
  } catch (error) {
    console.error('Error in handleRequest:', error);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: error.toString(),
          message: 'Failed to process package summary',
          sheetSaved: sheetResult ? true : false,
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
  }
}


function doOptions(e) {
  // Handle CORS preflight requests
  // Note: Google Apps Script Web Apps automatically handle CORS when deployed with "Anyone" access
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

function saveToSheet(data) {
  // This function MUST save to Google Sheets FIRST, before any other operations
  // It throws an error if it fails, which will be caught by doPost
  
  try {
    console.log('Starting Google Sheets save...');
    
    // Validate data parameter
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data parameter: data is required and must be an object');
    }
    
    console.log('Data received in saveToSheet:', JSON.stringify(data));
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    if (!spreadsheet) {
      throw new Error('Could not open spreadsheet with ID: ' + SPREADSHEET_ID);
    }
    
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create the sheet if it doesn't exist
    if (!sheet) {
      console.log('Sheet "' + SHEET_NAME + '" does not exist, creating it...');
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      if (!sheet) {
        throw new Error('Could not create sheet: ' + SHEET_NAME);
      }
    }
    
    // Check if headers exist, if not add them
    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Company Name',
      'Plan Name',
      'Base Plan Price (€)',
      'Has Registered Office',
      'Registered Office Price (€)',
      'Selected Add-ons (JSON)',
      'Add-ons Total (€/year)',
      'Subtotal (€)',
      'VAT (21%) (€)',
      'Total (€)',
      'Country',
      'Primary Focus',
      'Qualification ID',
      'Email Sent',
      'Notes'
    ];
    
    // Check if first row has headers (check if first cell is "Timestamp")
    const firstCell = sheet.getRange(1, 1).getValue();
    if (firstCell !== 'Timestamp') {
      console.log('Headers not found, adding headers...');
      // Headers don't exist, add them
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      // Format headers
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#EA3A70')
        .setFontColor('#FFFFFF');
      // Freeze header row
      sheet.setFrozenRows(1);
    }
    
    // Prepare the data row with safe property access
    const timestamp = new Date().toISOString();
    
    // Safely handle selectedAddons - it might be undefined or null
    let selectedAddonsJson = '{}';
    try {
      if (data && data.selectedAddons) {
        selectedAddonsJson = JSON.stringify(data.selectedAddons);
      } else {
        selectedAddonsJson = JSON.stringify({});
      }
    } catch (jsonError) {
      console.log('Error stringifying selectedAddons, using empty object:', jsonError);
      selectedAddonsJson = JSON.stringify({});
    }
    
    // Safely access all data properties with fallbacks
    const rowData = [
      timestamp, // A: Timestamp
      (data && data.name) ? data.name : '', // B: Name
      (data && data.email) ? data.email : '', // C: Email
      (data && data.phone) ? data.phone : '', // D: Phone
      (data && data.companyName) ? data.companyName : '', // E: Company Name
      (data && data.planName) ? data.planName : '', // F: Plan Name
      (data && data.basePlanPrice) ? data.basePlanPrice : 0, // G: Base Plan Price
      (data && data.hasRegisteredOffice) ? 'Yes' : 'No', // H: Has Registered Office
      (data && data.hasRegisteredOffice) ? 500 : 0, // I: Registered Office Price
      selectedAddonsJson, // J: Selected Add-ons (JSON)
      (data && data.addonsTotal) ? data.addonsTotal : 0, // K: Add-ons Total
      (data && data.subtotal) ? data.subtotal : 0, // L: Subtotal
      (data && data.vat) ? data.vat : 0, // M: VAT
      (data && data.total) ? data.total : 0, // N: Total
      (data && data.country) ? data.country : '', // O: Country
      (data && data.primaryFocus) ? data.primaryFocus : '', // P: Primary Focus
      (data && data.qualificationId) ? data.qualificationId : '', // Q: Qualification ID
      'No', // R: Email Sent (will be updated to "Yes" if email sends successfully)
      (data && data.notes) ? data.notes : '' // S: Notes
    ];
    
    // Append the data to the sheet - THIS IS THE CRITICAL SAVE OPERATION
    console.log('Appending row to sheet...');
    sheet.appendRow(rowData);
    
    const savedRow = sheet.getLastRow();
    console.log('Data saved successfully to row:', savedRow);
    
    // Auto-resize columns for better readability (non-critical, so don't fail if this errors)
    try {
      sheet.autoResizeColumns(1, rowData.length);
    } catch (resizeError) {
      console.log('Could not auto-resize columns (non-critical):', resizeError);
    }
    
    return {
      success: true,
      row: savedRow
    };
    
  } catch (error) {
    console.error('CRITICAL ERROR saving to Google Sheets:', error);
    // Re-throw the error so doPost can handle it
    throw new Error('Failed to save to Google Sheet: ' + error.toString());
  }
}

function sendPackageSummaryEmail(data) {
  try {
    // Validate email
    if (!data.email) {
      console.log('No email address provided');
      return { sent: false, error: 'No email address' };
    }
    
    // Format add-ons list
    let addonsText = 'None selected';
    if (data.addonsList && data.addonsList.length > 0) {
      addonsText = data.addonsList.map(addon => {
        const yearlyPrice = addon.interval === 'month' 
          ? addon.price * addon.quantity * 12 
          : addon.price * addon.quantity;
        return `  • ${addon.name} (×${addon.quantity}) - €${yearlyPrice.toLocaleString()}/year`;
      }).join('\n');
    }
    
    // Calculate pricing breakdown
    const basePrice = data.basePlanPrice || 0;
    const registeredOfficePrice = data.hasRegisteredOffice ? 500 : 0;
    const planPrice = basePrice + registeredOfficePrice;
    const addonsTotal = data.addonsTotal || 0;
    const subtotal = data.subtotal || 0;
    const vat = data.vat || 0;
    const total = data.total || 0;
    
    // Create email subject
    const subject = `Your ${data.planName} Package Summary - House of Companies`;
    
    // Create HTML email body
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #0F0B1F 0%, #1B1537 100%);
      color: #ffffff;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      margin: -30px -30px 20px -30px;
    }
    .header h1 {
      margin: 0;
      color: #EA3A70;
      font-size: 24px;
    }
    .section {
      margin: 20px 0;
      padding: 15px;
      background-color: #f9f9f9;
      border-left: 4px solid #EA3A70;
      border-radius: 4px;
    }
    .section h2 {
      color: #EA3A70;
      margin-top: 0;
      font-size: 18px;
    }
    .price {
      font-size: 24px;
      font-weight: bold;
      color: #EA3A70;
    }
    .total-box {
      background-color: #EA3A70;
      color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 20px 0;
    }
    .total-box .label {
      font-size: 14px;
      opacity: 0.9;
    }
    .total-box .amount {
      font-size: 32px;
      font-weight: bold;
      margin-top: 5px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    .note {
      background-color: #fff3cd;
      border: 1px solid #ffc107;
      padding: 15px;
      border-radius: 4px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${data.planName} Package Summary</h1>
    </div>
    
    <p>Dear ${data.name || 'Valued Customer'},</p>
    
    <p>Thank you for your interest in our services. Here is your complete package summary:</p>
    
    <div class="section">
      <h2>Package Details</h2>
      <p><strong>Plan:</strong> ${data.planName} Package</p>
      <p><strong>Base Price:</strong> €${basePrice.toLocaleString()}/year</p>
      ${data.hasRegisteredOffice ? `<p><strong>Registered Office Address:</strong> €500/year (included)</p>` : ''}
      <p class="price">Total Package: €${planPrice.toLocaleString()}/year</p>
    </div>
    
    <div class="section">
      <h2>Included Features</h2>
      <ul>
        <li>Full company registration</li>
        <li>VAT & tax setup</li>
        <li>Employer registration</li>
        <li>Compliance monitoring</li>
        <li>Software suite access</li>
        <li>Document management</li>
        <li>AI Bookkeeping (included, excluding €0.09 per uploaded/processed document)</li>
        <li>Financial Reporting (included)</li>
        <li>Document Generation (included)</li>
        <li>Corporate Agent (included)</li>
        <li>Priority support</li>
      </ul>
    </div>
    
    ${data.addonsList && data.addonsList.length > 0 ? `
    <div class="section">
      <h2>Optional Add-ons</h2>
      <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${addonsText}</pre>
    </div>
    ` : ''}
    
    <div class="section">
      <h2>Pricing Breakdown</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0;">${data.planName} Package:</td>
          <td style="text-align: right; padding: 8px 0;">€${planPrice.toLocaleString()}</td>
        </tr>
        ${data.addonsTotal > 0 ? `
        <tr>
          <td style="padding: 8px 0;">Add-ons (yearly):</td>
          <td style="text-align: right; padding: 8px 0;">€${addonsTotal.toLocaleString()}</td>
        </tr>
        ` : ''}
        <tr style="border-top: 1px solid #ddd;">
          <td style="padding: 8px 0;"><strong>Subtotal:</strong></td>
          <td style="text-align: right; padding: 8px 0;"><strong>€${subtotal.toLocaleString()}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0;">VAT (21%):</td>
          <td style="text-align: right; padding: 8px 0;">€${vat.toFixed(2)}</td>
        </tr>
      </table>
    </div>
    
    <div class="total-box">
      <div class="label">Total Amount</div>
      <div class="amount">€${total.toFixed(2)}</div>
    </div>
    
    <div class="note">
      <strong>Note:</strong> No payment required yet. Create your account first. Payment will be requested after registration.
    </div>
    
    <p>Our team will review your package selection and contact you shortly with next steps.</p>
    
    <p>If you have any questions, feel free to reach out to us.</p>
    
    <div class="footer">
      <p><strong>Best regards,</strong><br>
      House of Companies Team</p>
      <p>Email: support@houseofcompanies.io<br>
      Website: houseofcompanies.io</p>
    </div>
  </div>
</body>
</html>
    `.trim();
    
    // Send email using GmailApp (same as PricingPlans script)
    // IMPORTANT: This script must be deployed/run by the account that should send emails
    // The "from" address will be the account running the script.
    // Create plain text version for email body (fallback)
    const plainTextBody = emailBody.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    
    GmailApp.sendEmail(
      data.email, // To
      subject, // Subject
      plainTextBody, // Body (plain text fallback)
      {
        htmlBody: emailBody, // HTML version
        name: 'House of Companies',
        cc: 'dennis@houseofcompanies.io,aryan@houseofcompanies.io',
        replyTo: 'support@houseofcompanies.io'
      }
    );
    
    console.log('Email sent successfully to:', data.email);
    
    return { sent: true };
    
  } catch (error) {
    console.error('Error sending email:', error);
    return { sent: false, error: error.toString() };
  }
}

// Test function
function testPackageSummary() {
  console.log('=== Starting testPackageSummary ===');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com', // Change to your email for testing
    phone: '+1234567890',
    companyName: 'Test Company',
    planName: 'eBranch',
    basePlanPrice: 1495,
    hasRegisteredOffice: true,
    selectedAddons: {
      'payroll': 1,
      'vat-admin': 1
    },
    addonsList: [
      { name: 'Payroll Management', quantity: 1, price: 45, interval: 'month' },
      { name: 'VAT Administration', quantity: 1, price: 95, interval: 'month' }
    ],
    addonsTotal: 1680, // (45 + 95) * 12
    subtotal: 3675, // 1995 + 1680
    vat: 771.75,
    total: 4446.75,
    country: 'Netherlands',
    primaryFocus: 'branch-registration',
    qualificationId: 'test-123',
    notes: 'Test package summary'
  };
  
  console.log('Test data created:', JSON.stringify(testData));
  
  const mockEvent = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify(testData)
    }
  };
  
  console.log('Mock event created:', JSON.stringify(mockEvent));
  console.log('Calling doPost with mockEvent...');
  
  try {
    const result = doPost(mockEvent);
    const resultContent = result.getContent();
    console.log('Test result:', resultContent);
    return result;
  } catch (error) {
    console.error('Test failed with error:', error);
    throw error;
  }
}

