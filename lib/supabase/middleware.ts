import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 인증 세션 확인
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  // 공개 경로 (auth, join)는 모두 허용
  const pathname = request.nextUrl.pathname
  if (pathname.startsWith('/auth') || pathname.startsWith('/join')) {
    return response
  }

  // 인증되지 않은 사용자는 login으로 리다이렉트
  if (authError || !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // 역할 확인 및 리다이렉트
  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      // 프로필 없으면 기본 사용자 페이지로 이동
      if (pathname === '/') {
        return NextResponse.redirect(new URL('/events', request.url))
      }
      return response
    }

    // 관리자: /admin으로 시작하는 경로만 허용
    if (profile.role === 'admin') {
      if (!pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      return response
    }

    // 일반 사용자: /admin 경로 접근 불가
    if (profile.role === 'user') {
      if (pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/events', request.url))
      }
      if (pathname === '/') {
        return NextResponse.redirect(new URL('/events', request.url))
      }
      return response
    }
  } catch (error) {
    console.error('미들웨어 프로필 조회 오류:', error)
    return response
  }

  return response
}
