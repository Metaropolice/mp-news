'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

type Post = {
  id: number
  title: { rendered: string }
  date: string
  link: string
}

export default function NewsPage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    axios
      .get('https://mp-inc.net/wp-json/wp/v2/posts?per_page=5')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('API取得エラー:', err))
  }, [])

  return (
    <div className="bg-transparent min-h-screen flex flex-col items-center py-10 px-4">
      {/* 中のボックスだけ黒背景 */}
      <div className="bg-transparent text-white w-full max-w-5xl border border-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">新着情報</h2>
        <ul className="space-y-4">
          {posts.map((post, i) => {
            const isNew = i === 0 // 1番目だけNEW表示
            return (
              <li key={post.id} className="border-t border-gray-600 pt-2">
                <a
                  href={post.link}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm text-gray-300">
                    {new Date(post.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  {isNew && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                      NEW!
                    </span>
                  )}
                  <span
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        {/* お知らせ一覧ボタン */}
        <a
          href="https://mp-inc.net/news/"
          className="mt-8 inline-block border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          お知らせ一覧
        </a>
      </div>
    </div>
  )
}
