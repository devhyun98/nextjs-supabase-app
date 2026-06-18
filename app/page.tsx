import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { CheckCircle, Users, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-background">
      {/* 네비게이션 */}
      <nav className="w-full flex justify-center border-b border-border h-16">
        <div className="w-full max-w-6xl flex justify-between items-center px-4 sm:px-6">
          <div className="text-lg font-bold text-primary">Gather</div>
          <ThemeSwitcher />
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-12 sm:py-20">
        {/* 히어로 섹션 */}
        <div className="max-w-2xl text-center mb-16 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            이벤트 관리를 {"\n"}
            <span className="text-primary">더 간단하게</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            초대 링크 하나로 생일 파티, 워크샵, 모임을 쉽게 관리하세요.
            {"\n"}5명부터 30명까지, 모든 소규모 이벤트에 최적화되었습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/auth/login">로그인</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/auth/sign-up">가입하기</Link>
            </Button>
          </div>
        </div>

        {/* 기능 카드 */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <CardTitle className="text-lg">빠른 생성</CardTitle>
                  <CardDescription>
                    제목, 날짜, 장소만 입력하면 즉시 이벤트 생성
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <CardTitle className="text-lg">초대 링크</CardTitle>
                  <CardDescription>
                    생성된 링크를 카카오톡으로 공유하고 참여자 자동 관리
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <CardTitle className="text-lg">실시간 업데이트</CardTitle>
                  <CardDescription>
                    참여자가 참여하면 즉시 목록에 반영됩니다
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* 사용 방법 */}
        <div className="w-full max-w-2xl mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            사용 방법
          </h2>

          <div className="space-y-6">
            {/* 주최자 플로우 */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">
                주최자: 이벤트 만들고 공유하기
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. 로그인 후 "새 이벤트 만들기" 클릭</li>
                <li>2. 제목, 날짜, 장소 입력</li>
                <li>3. 자동 생성된 초대 링크를 카카오톡으로 공유</li>
                <li>4. 참여자 목록 실시간 확인</li>
              </ol>
            </div>

            {/* 참여자 플로우 */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">
                참여자: 초대 받고 참여하기
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. 초대 링크 클릭</li>
                <li>2. 로그인 (처음이면 회원가입)</li>
                <li>3. 자동으로 이벤트에 참여 완료</li>
                <li>4. 다른 참여자 프로필 확인</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="w-full flex items-center justify-center border-t border-border text-center text-xs gap-8 py-8 px-4">
        <p className="text-muted-foreground">Gather - 이벤트 관리 플랫폼</p>
      </footer>
    </main>
  );
}
