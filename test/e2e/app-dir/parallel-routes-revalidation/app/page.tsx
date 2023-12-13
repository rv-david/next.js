import Link from 'next/link'
import { getData } from './data'

export default async function Home() {
  const data = await getData()

  return (
    <div>
      <Link href="/is-open">Open Modal</Link>
      <div>
        <h1>Current Data</h1>
        <ul id="entries">
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
