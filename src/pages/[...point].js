import Link from 'next/link'
import loadData from '../loadData'
import OutboundLink from '../components/OutboundLink'
import withTitle from '../components/withTitle'

const Point = point => {
  return <section className="section">
    <div className="container">
      <h2 className="title is-4">{point.name}</h2>
      {point.description && <div>Description: {point.description}</div>}
      {point.repo && <div>Repo: <OutboundLink href={`https://github.com/${point.repo}`}/></div>}
      {point.twitter && <div>Twitter: <OutboundLink href={point.twitter}/></div>}
      {point.homepage && <div>Homepage: <OutboundLink href={point.homepage}/></div>}

      <h5 className="mb-2 mt-5 title is-5">Votes</h5>
      <div>Adopt: {point.votes.adopt || 0}</div>
      <div>Trial: {point.votes.trial || 0}</div>
      <div>Assess: {point.votes.assess || 0}</div>
      <div className="mt-5">
        <Link href="/[radar]" as={`/${point.radarKey}`}><a>Back to Radar</a></Link>
      </div>
    </div>
  </section>
}

export async function getStaticProps ({ params }) {
  const { points } = await loadData()
  const fullKey = params.point.join('/')
  const props = points.find(point => point.fullKey === fullKey)
  return { props }
}

export async function getStaticPaths() {
  const { points } = await loadData()

  return {
    paths: points.map(point => ({ params: { point: point.fullKey.split('/') }})),
    fallback: false
  };
}

export default withTitle(Point, props => props.name)
