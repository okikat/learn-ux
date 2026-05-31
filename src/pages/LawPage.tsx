import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { allLaws } from '../data/laws'
import LawDetail from '../components/LawDetail'

export default function LawPage() {
  const { slug } = useParams<{ slug: string }>()
  const law = allLaws.find((l) => l.slug === slug)

  // 法則を切り替えたら先頭へスクロール（読み始めの位置をそろえる）
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!law) {
    return <Navigate to="/" replace />
  }

  return <LawDetail law={law} />
}
