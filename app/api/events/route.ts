import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, location, eventDate, coverImageUrl } = body;

    const eventData = {
      title,
      description: description || null,
      location,
      event_date: new Date(eventDate).toISOString(),
      cover_image_url: coverImageUrl || null,
      created_by: user.id,
      invite_code: generateInviteCode(),
    };

    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: error.message || '이벤트 생성에 실패했습니다' },
        { status: 400 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
