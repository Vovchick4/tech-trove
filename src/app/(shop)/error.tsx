'use client'

export default function Error({ error }: { error: Error }) {
    return (
        <div>error {error.message}</div>
    )
}
