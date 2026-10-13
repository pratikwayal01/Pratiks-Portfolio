// MCP (Model Context Protocol) Streamable-HTTP endpoint, Edge-native.
// Wired into middleware.ts — no extra deps, no server to run.
// Usage from any MCP client: endpoint https://devpratik.vercel.app/mcp
import { portfolio } from './portfolio-data'

const SERVER = { name: 'pratik-portfolio', version: '1.0.0' }
const PROTOCOL = '2024-11-05'

const TOOLS = [
  { name: 'get_about', description: 'Who Pratik is, role, location', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_skills', description: 'Skill set: languages, devops, observability, robotics', inputSchema: { type: 'object', properties: {} } },
  {
    name: 'get_projects',
    description: 'Project list incl. latest work (DataCloak). Optional {filter} substring matches name/tagline/stack.',
    inputSchema: { type: 'object', properties: { filter: { type: 'string' } } },
  },
  { name: 'get_contact', description: 'Contact links: email, github, linkedin, twitter, site', inputSchema: { type: 'object', properties: {} } },
  {
    name: 'query',
    description: 'Free-text search over the whole portfolio (e.g. {q: "datacloak"}). Returns matching sections.',
    inputSchema: { type: 'object', properties: { q: { type: 'string' } }, required: ['q'] },
  },
]

function text(t: string) {
  return { content: [{ type: 'text' as const, text: t }] }
}

function callTool(name: string, args: Record<string, unknown>): unknown {
  switch (name) {
    case 'get_about':
      return text(`${portfolio.name} — ${portfolio.role}, ${portfolio.location}. ${portfolio.about}`)
    case 'get_skills': {
      const s = portfolio.skills
      return text(
        `Languages: ${s.languages.join(', ')}\nDevOps: ${s.devops.join(', ')}\nObservability: ${s.observability.join(', ')}\nRobotics: ${s.robotics.join(', ')}`,
      )
    }
    case 'get_projects': {
      const f = typeof args.filter === 'string' ? args.filter.toLowerCase() : ''
      const list = f
        ? portfolio.projects.filter((p) =>
            [p.name, p.tagline, p.description, ...p.stack].join(' ').toLowerCase().includes(f),
          )
        : portfolio.projects
      if (!list.length) return text(`No projects match filter "${args.filter}".`)
      return text(
        list.map((p) => `${p.name} — ${p.tagline}\n  ${p.description}\n  Stack: ${p.stack.join(', ')}\n  ${p.github}${p.demo ? ' | ' + p.demo : ''}`).join('\n\n'),
      )
    }
    case 'get_contact': {
      const c = portfolio.contact
      return text(`email: ${c.email}\ngithub: ${c.github}\nlinkedin: ${c.linkedin}\ntwitter: ${c.twitter}\nsite: ${c.site}`)
    }
    case 'query': {
      const q = typeof args.q === 'string' ? args.q.toLowerCase() : ''
      if (!q) return text('Pass {q: "search text"}.')
      const hits: string[] = []
      if (portfolio.about.toLowerCase().includes(q)) hits.push(`ABOUT: ${portfolio.about}`)
      const skills = Object.entries(portfolio.skills)
        .map(([k, v]) => `${k}: ${v.join(', ')}`)
        .join('\n')
      if (skills.toLowerCase().includes(q)) hits.push(`SKILLS:\n${skills}`)
      for (const p of portfolio.projects) {
        const blob = `${p.name} ${p.tagline} ${p.description} ${p.stack.join(' ')} ${p.github} ${p.demo}`
        if (blob.toLowerCase().includes(q)) hits.push(`${p.name} — ${p.tagline}\n  ${p.description}\n  Stack: ${p.stack.join(', ')}\n  ${p.github}${p.demo ? ' | ' + p.demo : ''}`)
      }
      if (JSON.stringify(portfolio.contact).toLowerCase().includes(q)) {
        const c = portfolio.contact
        hits.push(`CONTACT: ${c.email} | ${c.github} | ${c.linkedin} | ${c.twitter}`)
      }
      return text(hits.length ? hits.join('\n\n') : `No matches for "${args.q}". Try: datacloak, kubernetes, contact.`)
    }
    default:
      return { error: `unknown tool: ${name}` }
  }
}

const JSON_HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }

export async function handleMcp(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: { ...JSON_HEADERS, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id' },
    })
  }

  // GET = human/curl-friendly manifest (MCP inspectors probe POST for JSON-RPC).
  if (request.method === 'GET') {
    return new Response(
      JSON.stringify({
        name: SERVER.name,
        version: SERVER.version,
        protocol: 'mcp-streamable-http',
        endpoint: '/mcp',
        usage: 'POST JSON-RPC 2.0 here: {jsonrpc:"2.0", id:1, method:"tools/list"} — methods: initialize, tools/list, tools/call',
        tools: TOOLS.map((t) => t.name),
        portfolio: { name: portfolio.name, role: portfolio.role, projects: portfolio.projects.map((p) => p.name) },
      }),
      { headers: JSON_HEADERS },
    )
  }

  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  let body: { jsonrpc?: string; id?: unknown; method?: string; params?: { name?: string; arguments?: Record<string, unknown> } }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }), { status: 400, headers: JSON_HEADERS })
  }
  const { id = null, method = '', params = {} } = body ?? {}
  const ok = (result: unknown) => new Response(JSON.stringify({ jsonrpc: '2.0', id, result }), { headers: JSON_HEADERS })
  const err = (code: number, message: string) => new Response(JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } }), { headers: JSON_HEADERS })

  // notifications/* get 202 with no body per spec.
  if (method.startsWith('notifications/')) return new Response(null, { status: 202, headers: JSON_HEADERS })

  switch (method) {
    case 'initialize':
      return ok({ protocolVersion: PROTOCOL, capabilities: { tools: {} }, serverInfo: SERVER })
    case 'ping':
      return ok({})
    case 'tools/list':
      return ok({ tools: TOOLS })
    case 'tools/call': {
      if (!params.name) return err(-32602, 'Missing params.name')
      const r = callTool(params.name, params.arguments ?? {}) as Record<string, unknown>
      if ('error' in r) return err(-32602, r.error as string)
      return ok(r)
    }
    case 'resources/list':
      return ok({ resources: [] })
    case 'prompts/list':
      return ok({ prompts: [] })
    default:
      return err(-32601, `Method not found: ${method}`)
  }
}
