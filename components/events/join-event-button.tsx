'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { joinEventAction } from '@/app/actions/events'
import { Loader2 } from 'lucide-react'

interface JoinEventButtonProps {
  inviteCode: string
}

export function JoinEventButton({ inviteCode }: JoinEventButtonProps) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleJoin = async () => {
    setIsPending(true)
    try {
      await joinEventAction(inviteCode)
    } catch (error) {
      const message = error instanceof Error ? error.message : '이벤트 참여에 실패했습니다'
      toast.error(message)
      setIsPending(false)
    }
  }

  return (
    <Button onClick={handleJoin} disabled={isPending} className="w-full">
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          참여 중...
        </>
      ) : (
        '이벤트에 참여하기'
      )}
    </Button>
  )
}
