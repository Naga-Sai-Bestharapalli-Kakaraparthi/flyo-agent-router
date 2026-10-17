import { z } from 'zod';

// ==========================================
// 1. Tool Execution Schemas (Zod Validation)
// ==========================================
const FlightSearchSchema = z.object({
  origin: z.string().length(3),
  destination: z.string().length(3),
  date: z.string()
});

const HotelSearchSchema = z.object({
  city: z.string(),
  maxPriceINR: z.number().positive()
});

// ==========================================
// 2. Deterministic Tool Handlers
// ==========================================
async function executeFlightSearch(args: unknown) {
  const params = FlightSearchSchema.parse(args);
  return {
    status: "SUCCESS",
    provider: "AERO_GDS",
    flights: [
      { flightNo: "6E-204", departure: "08:00 AM", priceINR: 4500 },
      { flightNo: "AI-502", departure: "02:30 PM", priceINR: 5200 }
    ]
  };
}

async function executeHotelSearch(args: unknown) {
  const params = HotelSearchSchema.parse(args);
  return {
    status: "SUCCESS",
    provider: "HOTEL_BEDS",
    hotels: [
      { name: "Taj Gateway", nightlyRateINR: 4200 },
      { name: "Treebo Trend", nightlyRateINR: 2100 }
    ]
  };
}

// ==========================================
// 3. Central Agent Dispatcher Router
// ==========================================
export async function dispatchAgentTool(toolName: string, rawArguments: any) {
  try {
    switch (toolName) {
      case 'search_flights':
        return await executeFlightSearch(rawArguments);
      
      case 'search_hotels':
        return await executeHotelSearch(rawArguments);
        
      default:
        return { error: "UNKNOWN_TOOL", message: `Tool ${toolName} not supported.` };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "TOOL_ARGUMENT_VALIDATION_FAILED", details: error.errors };
    }
    return { error: "INTERNAL_TOOL_ERROR", message: "Agent tool execution failed safely." };
  }
}

// Example local test execution
if (require.main === module) {
  (async () => {
    const testResult = await dispatchAgentTool('search_flights', {
      origin: 'HYD',
      destination: 'DEL',
      date: '2026-11-01'
    });
    console.log("Agent Dispatch Result:", JSON.stringify(testResult, null, 2));
  })();
}
