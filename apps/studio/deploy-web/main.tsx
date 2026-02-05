import { createRoot } from 'react-dom/client'
import { VisualEditing } from '@sanity/visual-editing/react'

const NEXT_PUBLIC_SANITY_STUDIO_URL = 'NEXT_PUBLIC_SANITY_STUDIO_URL',
  SANITY_API_READ_TOKEN = 'SANITY_API_READ_TOKEN',
  NEXT_PUBLIC_SANITY_PROJECT_ID = 'NEXT_PUBLIC_SANITY_PROJECT_ID',
  NEXT_PUBLIC_SANITY_DATASET = 'NEXT_PUBLIC_SANITY_DATASET',
  NEXT_PUBLIC_SANITY_API_VERSION = 'NEXT_PUBLIC_SANITY_API_VERSION'

function App() {
  const GIT_HOST_URLS: Record<string, string> = {
    github: 'https://github.com',
    gitlab: 'https://gitlab.com',
    bitbucket: 'https://bitbucket.org',
  }

  function getRepoUrl(
    provider: string,
    owner: string,
    repo: string,
  ): string | null {
    const baseUrl = GIT_HOST_URLS[provider]
    if (!baseUrl) return null
    return `${baseUrl}/${owner}/${repo}`
  }

  const repoUrl = getRepoUrl(
    process.env.SANITY_STUDIO_VERCEL_GIT_PROVIDER!,
    process.env.SANITY_STUDIO_VERCEL_GIT_REPO_OWNER!,
    process.env.SANITY_STUDIO_VERCEL_GIT_REPO_SLUG!,
  )
  const productionUrl = process.env.SANITY_STUDIO_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.SANITY_STUDIO_VERCEL_PROJECT_PRODUCTION_URL}`
    : location.origin

  const url = new URL('https://vercel.com/new/import')
  const { searchParams: q } = url
  q.set('id', process.env.SANITY_STUDIO_VERCEL_GIT_REPO_ID!)
  q.set('provider', process.env.SANITY_STUDIO_VERCEL_GIT_PROVIDER!)
  q.set('owner', process.env.SANITY_STUDIO_VERCEL_GIT_REPO_OWNER!)
  q.set('path', 'apps/web')
  q.set('s', repoUrl!)
  q.set('project-name', 'turbo-start-next')
  q.set('framework', 'nextjs')
  q.set(
    'env',
    [
      NEXT_PUBLIC_SANITY_STUDIO_URL,
      NEXT_PUBLIC_SANITY_PROJECT_ID,
      NEXT_PUBLIC_SANITY_DATASET,
      NEXT_PUBLIC_SANITY_API_VERSION,
      SANITY_API_READ_TOKEN,
    ].join(','),
  )
  q.set(
    'envDefaults',
    JSON.stringify({
      [NEXT_PUBLIC_SANITY_STUDIO_URL]: productionUrl,
      [NEXT_PUBLIC_SANITY_PROJECT_ID]: process.env.SANITY_STUDIO_PROJECT_ID,
      [NEXT_PUBLIC_SANITY_DATASET]: process.env.SANITY_STUDIO_DATASET,
      [NEXT_PUBLIC_SANITY_API_VERSION]: '2025-08-29',
    }),
  )
  q.set(
    'envDescription',
    `
      Set ${NEXT_PUBLIC_SANITY_STUDIO_URL} to ${productionUrl}, ${NEXT_PUBLIC_SANITY_PROJECT_ID} to ${process.env.SANITY_STUDIO_PROJECT_ID}, ${NEXT_PUBLIC_SANITY_DATASET} to ${process.env.SANITY_STUDIO_DATASET}, ${NEXT_PUBLIC_SANITY_API_VERSION} to 2025-08-29, ${SANITY_API_READ_TOKEN} to the value it's set to in your vercel project environment variables settings.
    `,
  )
  q.set('envLink', 'https://robotostudio.com/blog?utm_source=turbo-start')

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <style>{`
      html {
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
      }
      html,
      body {
        height: 100%;
        margin: 0;
      }
    `}</style>
      </head>
      <body>
        <h1>
          <a href={url.toString()} target="_blank">
            Deploy to Vercel
          </a>
        </h1>
        {/* VisualEditing only needed for presentation tool to successfully load the iframe */}
        <VisualEditing portal={false} />
      </body>
    </html>
  )
}

const root = createRoot(document)
root.render(<App />)
