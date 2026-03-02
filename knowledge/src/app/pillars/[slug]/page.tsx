import PillarContent from './PillarContent'

export function generateStaticParams() {
  return [
    { slug: 'persuasion' },
    { slug: 'reframing' },
    { slug: 'the-shift' },
    { slug: 'refocusing' },
  ]
}

export default function PillarPage({ params }: { params: { slug: string } }) {
  return <PillarContent slug={params.slug} />
}
