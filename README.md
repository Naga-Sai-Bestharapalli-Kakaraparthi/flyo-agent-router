# Flyo Agent Router

A secure TypeScript-based agent tool-dispatch engine designed to handle runtime validation and structured routing for travel agent workflows.

## Architectural Highlights
- **Strict Tool Validation:** Uses `Zod` schemas (`FlightSearchSchema`, `HotelSearchSchema`) to strictly validate incoming agent tool arguments before execution.
- **Deterministic Tool Dispatcher:** Dynamically routes agent requests to external providers (e.g., Aero GDS, HotelBeds) via a clean switch-case dispatch architecture.
- **Zero-Crash Error Boundaries:** Safely catches Zod validation errors and unexpected runtime failures, returning structured error objects back to the agent without crashing the service.
