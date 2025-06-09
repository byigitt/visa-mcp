import { z } from "zod";

export const visaSchema = z.object({
  id: z.number(),
  tracking_count: z.number(),
  country_code: z.string(),
  mission_code: z.string(),
  visa_category: z.string(),
  visa_type: z.string(),
  center: z.string(),
  status: z.string(),
  last_checked_at: z.string(),
  last_open_at: z.string().optional(),
  last_available_date: z.string().optional(),
});

export type Visa = z.infer<typeof visaSchema>;

export type VisaFilters = {
    country_code?: string;
    mission_code?: string;
    visa_category?: string;
    visa_type?: string;
    center?: string;
    status?: string;
};

export async function fetchAndFilterVisas(filters: VisaFilters = {}): Promise<{ content: { type: "text", text: string }[], isError?: boolean }> {
    try {
        const response = await fetch("https://api.visasbot.com/api/visa/list");
        if (!response.ok) {
            return {
                content: [{ type: "text", text: `Error fetching visa data: ${response.statusText}` }],
                isError: true,
            };
        }

        const data = await response.json();
        const validatedVisas = z.array(visaSchema).safeParse(data.data.visas);

        if (!validatedVisas.success) {
            return {
                content: [{ type: "text", text: "Error parsing visa data." }],
                isError: true,
            };
        }

        let visas = validatedVisas.data;

        // Apply filters
        const activeFilters = Object.entries(filters).filter(([, value]) => value !== undefined);
        if (activeFilters.length > 0) {
            visas = visas.filter(visa => {
                return activeFilters.every(([key, value]) => {
                    // This is a bit of a hack, but it works for this simple case.
                    // A more robust solution would handle different types.
                    return String(visa[key as keyof Visa]) === value;
                });
            });
        }

        return {
            content: [{ type: "text", text: JSON.stringify(visas, null, 2) }],
        };

    } catch (error) {
        const err = error as Error;
        return {
            content: [{ type: "text", text: `An unexpected error occurred: ${err.message}` }],
            isError: true,
        };
    }
} 