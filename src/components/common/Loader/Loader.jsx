import './Loader.css'

export default function Loader({ text = 'Loading...' }) {
  return <div className="page-loader">{text}</div>
}
