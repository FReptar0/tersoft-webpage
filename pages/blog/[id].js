import React from 'react'
import Header from '@/components/Header'
import { useRouter } from 'next/router'

export default function id() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>
            <h1 style={{textAlign:'center', margin: '100px'}}>Blog Post {id}</h1>
        </div>
    )
}
