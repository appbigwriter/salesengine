import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const projectId = process.env.CONTROL_TOWER_PROJECT_ID || '7c69fcc5-f22c-4b54-9efd-f0b8ed9d4b72';
  const schema = process.env.CONTROL_TOWER_SCHEMA_NAME || 'custom_salesengine';

  return NextResponse.json(
    {
      status: 'ok',
      service: 'sales',
      project_id: projectId,
      schema: schema,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      uptime: process.uptime(),
    },
    { status: 200 }
  );
}
