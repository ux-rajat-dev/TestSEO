import { supabase } from '../utils/supabase'

export interface QualificationData {
  companyName: string
  industry: string
  currentRevenue: string
  targetRevenue: string
  timeline: string
  mainGoal: string
  challenges: string
  teamSize: string
  email: string
  phone: string
  from?: string
  to?: string
  selectedServices?: string[]
}

export interface SaveQualificationResponse {
  success: boolean
  id?: number
  error?: string
}

/**
 * Save qualification data to the database
 * Returns an ID (not UUID) that can be used to map to user account later
 */
export async function saveQualificationData(
  data: QualificationData
): Promise<SaveQualificationResponse> {
  try {
    // Insert qualification data into the database
    const { data: insertedData, error } = await supabase
      .from('qualifications')
      .insert({
        company_name: data.companyName,
        industry: data.industry,
        current_revenue: data.currentRevenue,
        target_revenue: data.targetRevenue,
        timeline: data.timeline,
        main_goal: data.mainGoal,
        challenges: data.challenges || null,
        team_size: data.teamSize,
        email: data.email,
        phone: data.phone,
        from_country: data.from || null,
        to_country: data.to || null,
        selected_services: data.selectedServices ? JSON.stringify(data.selectedServices) : null,
        status: 'pending', // Status before account creation
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error saving qualification data:', error)
      return {
        success: false,
        error: error.message || 'Failed to save qualification data',
      }
    }

    if (!insertedData || !insertedData.id) {
      return {
        success: false,
        error: 'No ID returned from database',
      }
    }

    return {
      success: true,
      id: insertedData.id, // This is the numeric ID, not UUID
    }
  } catch (error: any) {
    console.error('Exception saving qualification data:', error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    }
  }
}

/**
 * Update qualification data with user account ID after account creation
 */
export async function linkQualificationToUser(
  qualificationId: number,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('qualifications')
      .update({
        user_id: userId,
        status: 'linked',
        updated_at: new Date().toISOString(),
      })
      .eq('id', qualificationId)

    if (error) {
      console.error('Error linking qualification to user:', error)
      return {
        success: false,
        error: error.message || 'Failed to link qualification to user',
      }
    }

    return {
      success: true,
    }
  } catch (error: any) {
    console.error('Exception linking qualification to user:', error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    }
  }
}

/**
 * Update qualification with order summary data (services and pricing)
 */
export async function updateQualificationWithOrder(
  qualificationId: number,
  orderData: {
    planName: string
    planPrice: number
    selectedAddons: Record<string, number>
    addonsTotal: number
    subtotal: number
    vat: number
    total: number
    includeOrderForm: boolean
    tier?: string
    country?: string
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const orderSummaryJson = {
      plan: {
        name: orderData.planName,
        price: orderData.planPrice,
        tier: orderData.tier || 'ebranch',
        country: orderData.country || null,
      },
      addons: orderData.selectedAddons,
      pricing: {
        addonsTotal: orderData.addonsTotal,
        subtotal: orderData.subtotal,
        vat: orderData.vat,
        total: orderData.total,
      },
      workflow: {
        includeOrderForm: orderData.includeOrderForm,
        workflowType: orderData.includeOrderForm ? 'complete-now' : 'complete-later',
      },
      updatedAt: new Date().toISOString(),
    }

    const { error } = await supabase
      .from('qualifications')
      .update({
        order_summary: orderSummaryJson,
        updated_at: new Date().toISOString(),
      })
      .eq('id', qualificationId)

    if (error) {
      console.error('Error updating qualification with order data:', error)
      return {
        success: false,
        error: error.message || 'Failed to update qualification with order data',
      }
    }

    return {
      success: true,
    }
  } catch (error: any) {
    console.error('Exception updating qualification with order data:', error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    }
  }
}

/**
 * Get qualification data by ID
 */
export async function getQualificationById(
  id: number
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('qualifications')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching qualification data:', error)
      return {
        success: false,
        error: error.message || 'Failed to fetch qualification data',
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error: any) {
    console.error('Exception fetching qualification data:', error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    }
  }
}

/**
 * Get qualification data by email
 */
export async function getQualificationByEmail(
  email: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('qualifications')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching qualification by email:', error)
      return {
        success: false,
        error: error.message || 'Failed to fetch qualification data',
      }
    }

    return {
      success: true,
      data: data || null,
    }
  } catch (error: any) {
    console.error('Exception fetching qualification by email:', error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    }
  }
}

