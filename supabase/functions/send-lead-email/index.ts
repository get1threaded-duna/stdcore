import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Lead {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  velocity_score: number | null;
  velocity_grade: string | null;
  financial_risk: number | null;
  annual_submissions: number | null;
  data_architecture: string | null;
  has_validated_system: boolean | null;
}

const getGradeDescription = (grade: string | null): string => {
  switch (grade) {
    case 'A': return 'Excellent readiness - minimal transition risk';
    case 'B': return 'Good readiness - some optimization needed';
    case 'C': return 'Moderate readiness - significant improvements required';
    case 'D': return 'Low readiness - major infrastructure changes needed';
    case 'F': return 'Critical readiness gap - comprehensive overhaul required';
    default: return 'Assessment pending';
  }
};

const formatCurrency = (value: number | null): string => {
  if (value === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const generateEmailHtml = (lead: Lead): string => {
  const firstName = lead.name?.split(' ')[0] || 'there';
  const gradeDescription = getGradeDescription(lead.velocity_grade);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a1628;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #00d4ff; font-size: 24px; margin: 0;">eCTD v4.0 Readiness Report</h1>
      <p style="color: #8892a6; font-size: 14px; margin-top: 8px;">Your Personalized Compliance Assessment</p>
    </div>
    
    <!-- Main Card -->
    <div style="background: linear-gradient(180deg, #0f1f35 0%, #0a1628 100%); border: 1px solid #1a3050; border-radius: 12px; padding: 32px;">
      <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Hi ${firstName},
      </p>
      
      <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Thank you for using our eCTD v4.0 Readiness & Risk Calculator. Based on your inputs, here's a summary of your organization's compliance readiness:
      </p>
      
      <!-- Score Box -->
      <div style="background: #0a1628; border: 1px solid #1a3050; border-radius: 8px; padding: 24px; margin-bottom: 24px; text-align: center;">
        <p style="color: #8892a6; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Compliance Velocity Score</p>
        <p style="color: #00d4ff; font-size: 48px; font-weight: bold; margin: 0;">
          ${lead.velocity_score || '--'}<span style="font-size: 24px; color: #8892a6;">/100</span>
        </p>
        <p style="margin-top: 8px;">
          <span style="display: inline-block; background: ${lead.velocity_grade === 'A' || lead.velocity_grade === 'B' ? '#10b981' : lead.velocity_grade === 'C' ? '#f59e0b' : '#ef4444'}; color: #0a1628; padding: 4px 12px; border-radius: 4px; font-weight: 600; font-size: 14px;">
            Grade ${lead.velocity_grade || '-'}
          </span>
        </p>
        <p style="color: #8892a6; font-size: 14px; margin: 12px 0 0 0;">${gradeDescription}</p>
      </div>
      
      <!-- Key Metrics -->
      <div style="margin-bottom: 24px;">
        <p style="color: #e2e8f0; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">Key Findings:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #8892a6; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #1a3050;">Estimated Financial Risk</td>
            <td style="color: #ef4444; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #1a3050; text-align: right; font-weight: 600;">${formatCurrency(lead.financial_risk)}</td>
          </tr>
          <tr>
            <td style="color: #8892a6; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #1a3050;">Annual Submissions</td>
            <td style="color: #e2e8f0; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #1a3050; text-align: right;">${lead.annual_submissions || '--'}</td>
          </tr>
          <tr>
            <td style="color: #8892a6; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #1a3050;">Data Architecture</td>
            <td style="color: #e2e8f0; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #1a3050; text-align: right; text-transform: capitalize;">${lead.data_architecture?.replace('-', ' ') || '--'}</td>
          </tr>
          <tr>
            <td style="color: #8892a6; font-size: 14px; padding: 8px 0;">Validated Publishing System</td>
            <td style="color: ${lead.has_validated_system ? '#10b981' : '#ef4444'}; font-size: 14px; padding: 8px 0; text-align: right;">${lead.has_validated_system ? 'Yes' : 'No'}</td>
          </tr>
        </table>
      </div>
      
      <!-- CTA -->
      <div style="text-align: center; margin-top: 32px;">
        <p style="color: #8892a6; font-size: 14px; margin: 0 0 16px 0;">
          Want to discuss your readiness strategy with our experts?
        </p>
        <a href="https://ectdv4.com/contact" style="display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #00a3cc 100%); color: #0a1628; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 14px;">
          Schedule a Consultation
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px;">
      <p style="color: #8892a6; font-size: 12px; margin: 0;">
        This assessment is for informational purposes only and does not constitute regulatory advice.
      </p>
      <p style="color: #8892a6; font-size: 12px; margin: 8px 0 0 0;">
        © 2025 eCTD v4.0 Readiness Tools
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { leadId } = await req.json();

    if (!leadId) {
      throw new Error("Lead ID is required");
    }

    console.log(`Fetching lead with ID: ${leadId}`);

    // Fetch lead data
    const { data: lead, error: fetchError } = await supabase
      .from("calculator_leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (fetchError || !lead) {
      console.error("Error fetching lead:", fetchError);
      throw new Error("Lead not found");
    }

    console.log(`Sending email to: ${lead.email}`);

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "eCTD Readiness <onboarding@resend.dev>",
      to: [lead.email],
      subject: `Your eCTD v4.0 Readiness Score: ${lead.velocity_score}/100 (Grade ${lead.velocity_grade})`,
      html: generateEmailHtml(lead),
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, response: emailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-lead-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
