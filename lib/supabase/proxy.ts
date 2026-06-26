import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip proxy check. You can remove this
  // once you setup the project.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // 보호된 라우트 - 인증 필요
  const protectedPaths = ['/events', '/profile', '/admin'];
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // /admin/login은 공개 경로 (보호 대상 제외)
  const isAdminLogin = request.nextUrl.pathname === '/admin/login';

  // 보호된 경로인데 미인증 + /admin/login이 아닌 경우
  if (isProtectedPath && !user && !isAdminLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // 역할 기반 리다이렉트
  if (user) {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.sub)
        .single()

      const role = profile?.role || 'user'

      // 관리자: /admin으로 시작하는 경로만 허용
      if (role === 'admin') {
        if (request.nextUrl.pathname === '/') {
          const url = request.nextUrl.clone()
          url.pathname = '/admin/dashboard'
          return NextResponse.redirect(url)
        }
        if (!request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
          const url = request.nextUrl.clone()
          url.pathname = '/admin/dashboard'
          return NextResponse.redirect(url)
        }
      }

      // 일반 사용자: /admin 경로 접근 불가
      if (role === 'user') {
        if (request.nextUrl.pathname.startsWith('/admin')) {
          const url = request.nextUrl.clone()
          url.pathname = '/events'
          return NextResponse.redirect(url)
        }
        if (request.nextUrl.pathname === '/') {
          const url = request.nextUrl.clone()
          url.pathname = '/events'
          return NextResponse.redirect(url)
        }
      }
    } catch (error) {
      console.error('프로필 조회 오류:', error)
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
