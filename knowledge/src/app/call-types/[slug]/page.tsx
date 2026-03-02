import CallTypeContent from './CallTypeContent'

export function generateStaticParams() {
  return [
    { slug: 'money-caller' },
    { slug: 'scared-switcher' },
    { slug: 'misinformed' },
    { slug: 'third-party-controlled' },
    { slug: 'detail-staller' },
    { slug: 'time-bomb' },
    { slug: 'commercial-myth-caller' },
    { slug: 'veteran' },
    { slug: 'timing-objector' },
  ]
}

export default function CallTypePage({ params }: { params: { slug: string } }) {
  return <CallTypeContent slug={params.slug} />
}
