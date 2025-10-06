function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet by ID
    const spreadsheetId = '1k_Wbf_-5lPz73mbaNmN8K2Vt3V1GZWAYj5jzco75ZM0';
    const sheetName = 'QuoteRequests';
    
    // Open the spreadsheet and get the sheet
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    // Create the sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      // Add headers
      sheet.getRange(1, 1, 1, 7).setValues([[
        'Name', 'Company', 'Email', 'Selected Plan', 'Cart Items', 'Total Amount', 'Timestamp'
      ]]);
      // Format headers
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }
    
    // Prepare the data row
    const rowData = [
      data.name || '',
      data.company || '',
      data.email || '',
      data.selected_plan || '',
      data.cart_items || '',
      data.total_amount || 0,
      data.timestamp || new Date().toISOString()
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Failed to save data'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  // Handle CORS preflight requests
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doGet(e) {
  try {
    // Get parameters from URL
    const data = {
      name: e.parameter.name || '',
      company: e.parameter.company || '',
      email: e.parameter.email || '',
      selected_plan: e.parameter.selected_plan || '',
      cart_items: e.parameter.cart_items || '',
      total_amount: e.parameter.total_amount || 0,
      timestamp: e.parameter.timestamp || new Date().toISOString()
    };
    
    // Get the spreadsheet by ID
    const spreadsheetId = '1k_Wbf_-5lPz73mbaNmN8K2Vt3V1GZWAYj5jzco75ZM0';
    const sheetName = 'QuoteRequests';
    
    // Open the spreadsheet and get the sheet
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    // Create the sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      // Add headers
      sheet.getRange(1, 1, 1, 7).setValues([[
        'Name', 'Company', 'Email', 'Selected Plan', 'Cart Items', 'Total Amount', 'Timestamp'
      ]]);
      // Format headers
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }
    
    // Prepare the data row
    const rowData = [
      data.name,
      data.company,
      data.email,
      data.selected_plan,
      data.cart_items,
      data.total_amount,
      data.timestamp
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Failed to save data'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Email function to send quote confirmation
function sendQuoteEmail(data) {
  try {
    // Parse cart items
    let cartItems = [];
    try {
      cartItems = JSON.parse(data.cart_items || '[]');
    } catch (e) {
      cartItems = [];
    }
    
    // Format cart items for email
    let cartItemsText = '';
    if (cartItems.length > 0) {
      cartItemsText = cartItems.map(item => `${item.name} (€${item.price}/${item.period || 'month'})`).join('\n');
    } else {
      cartItemsText = data.selected_plan || 'No items selected';
    }
    
    // Calculate VAT (21%)
    const subtotal = parseFloat(data.total_amount) || 0;
    const vatRate = 0.21;
    const vatAmount = subtotal * vatRate;
    const totalWithVAT = subtotal + vatAmount;
    
    // Create email subject
    const subject = 'Your Quote Request - House of Companies';
    
    // Create email body
    const emailBody = `
Dear ${data.name},

Thank you for your interest in our services. Here are your quote details:

Selected Services:
${cartItemsText}

Total Amount (including VAT):
€${totalWithVAT.toFixed(2)}

Our team will review your request and contact you shortly with more details.

If you have any immediate questions, feel free to reach out.

Best regards,
House of Companies Team
Email: support@houseofcompanies.io
Website: houseofcompanies.io
    `.trim();
    
    // Send email
    GmailApp.sendEmail(
      data.email, // To
      subject, // Subject
      emailBody, // Body
      {
        name: 'House of Companies',
        cc: 'india.office@houseofcompanies.io,dennis@houseofcompanies.io,aryan@houseofcompanies.io',
        replyTo: 'support@houseofcompanies.io'
      }
    );
    
    console.log('Email sent successfully to:', data.email);
    
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error to avoid breaking the main flow
  }
}

// Test function to verify the script works
function testScript() {
  const testData = {
    name: 'Test User',
    company: 'Test Company',
    email: 'test@example.com',
    selected_plan: 'eBranch Plan',
    cart_items: JSON.stringify([{name: 'Test Item', price: 100}]),
    total_amount: 100,
    timestamp: new Date().toISOString()
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
  return result;
}
