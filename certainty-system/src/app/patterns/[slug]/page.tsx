import PatternContent from './PatternContent'

export function generateStaticParams() {
  return [
    { slug: 'client-gold-ignored' },
    { slug: 'incomplete-math-breakdown' },
    { slug: 'logic-responses' },
    { slug: 'permission-seeking-language' },
    { slug: 'system-navigation-dead-air' },
    { slug: 'rapport-without-off-switch' },
    { slug: 'third-party-blind-spot' },
    { slug: 'accepting-misinformation' },
    { slug: 'hollow-yes' },
  ]
}

export default function PatternPage({ params }: { params: { slug: string } }) {
  return <PatternContent slug={params.slug} />
}
