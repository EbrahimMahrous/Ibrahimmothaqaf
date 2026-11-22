import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://mothaqaf-backend.vercel.app/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: "كل الحقول مطلوبة" },
        { status: 400 },
      );
    }

    // Forward to backend
    const res = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "حصل خطأ" },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true, message: "تم الإرسال" });
  } catch {
    return NextResponse.json(
      { success: false, message: "حصل خطأ في السيرفر" },
      { status: 500 },
    );
  }
}
