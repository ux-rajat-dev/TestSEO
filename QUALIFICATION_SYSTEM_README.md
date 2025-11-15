# Qualification Data System

## Overview

This system saves qualification data to a database table before user account creation. The qualification record gets a numeric ID (not UUID) that can be used to map/link the qualification data to the user account after registration.

## Database Table

The `qualifications` table stores all qualification form data. See `QUALIFICATION_TABLE_SCHEMA.sql` for the complete schema.

### Key Fields:
- `id` - SERIAL PRIMARY KEY (numeric ID, not UUID)
- `status` - 'pending' (before account), 'linked' (after account creation), 'completed'
- `user_id` - UUID (populated after account creation)
- All qualification form fields (company_name, industry, email, etc.)

## Flow

1. **QualificationPage** → User fills form → Data saved to `qualifications` table → Returns `qualificationId` (numeric ID)
2. **Branch Page** → Receives `qualificationId` → Passes it through
3. **OrderSummaryPage** → Receives `qualificationId` → Passes it through
4. **RegistrationPage** → Receives `qualificationId` → Includes in `completeOrderData.metadata.qualificationId`
5. **After Account Creation** → Use `linkQualificationToUser(qualificationId, userId)` to map qualification to user

## Usage

### Saving Qualification Data

```typescript
import { saveQualificationData } from '../services/qualificationService'

const result = await saveQualificationData({
  companyName: 'My Company',
  industry: 'tech',
  email: 'user@example.com',
  // ... other fields
})

if (result.success) {
  const qualificationId = result.id // Numeric ID for mapping
}
```

### Linking Qualification to User Account

After user account is created, link the qualification:

```typescript
import { linkQualificationToUser } from '../services/qualificationService'

// After user registration
const linkResult = await linkQualificationToUser(qualificationId, userId)

if (linkResult.success) {
  // Qualification is now linked to user account
}
```

### Retrieving Qualification Data

```typescript
import { getQualificationById } from '../services/qualificationService'

const result = await getQualificationById(qualificationId)

if (result.success) {
  const qualificationData = result.data
}
```

## Data Flow

```
QualificationPage
  ↓ (saves to DB, gets qualificationId)
Branch Page
  ↓ (passes qualificationId)
OrderSummaryPage
  ↓ (passes qualificationId)
RegistrationPage
  ↓ (includes qualificationId in completeOrderData)
Account Created
  ↓ (use linkQualificationToUser)
Qualification Linked to User
```

## Important Notes

1. **No UUID**: The qualification ID is a numeric SERIAL ID, not a UUID. This makes it easier to map to user accounts.

2. **Status Field**: 
   - `pending` - Qualification saved but no account yet
   - `linked` - Qualification linked to user account
   - `completed` - Process completed

3. **Mapping**: The `qualificationId` is passed through all pages in `location.state` and included in `completeOrderData.metadata.qualificationId` for database storage.

4. **Database Setup**: Run the SQL schema in `QUALIFICATION_TABLE_SCHEMA.sql` in your Supabase database to create the table.

## Example: Linking After Registration

```typescript
// In your registration/account creation handler
import { linkQualificationToUser } from '../services/qualificationService'

async function handleAccountCreation(userData, qualificationId) {
  // Create user account
  const userId = await createUserAccount(userData)
  
  // Link qualification to user
  if (qualificationId) {
    await linkQualificationToUser(qualificationId, userId)
  }
}
```











