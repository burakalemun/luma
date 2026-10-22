import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, topicLabel, message, botcheck } = body;

    // Honeypot spam check - if filled, silently discard
    if (botcheck) {
      return NextResponse.json({ success: true, message: "OK" });
    }

    // Required fields check
    if (!fullName || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Lütfen zorunlu alanları (Ad Soyad, E-posta, Mesaj) doldurunuz.",
        },
        { status: 400 }
      );
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
      console.warn(
        "[The Luma] WEB3FORMS_ACCESS_KEY bulunamadı. Lütfen .env.local içine WEB3FORMS_ACCESS_KEY ekleyin."
      );
      return NextResponse.json(
        {
          success: false,
          missingKey: true,
          error:
            "Web3Forms Access Key henüz tanımlanmamış. Lütfen .env.local dosyasına WEB3FORMS_ACCESS_KEY ekleyin.",
        },
        { status: 503 }
      );
    }

    // Forward to Web3Forms API
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: fullName,
        email: email,
        phone: phone || "Belirtilmedi",
        subject: `[The Luma İletişim] ${topicLabel || "Yeni Mesaj"} - ${fullName}`,
        from_name: "The Luma Web",
        topic: topicLabel || "Genel Danışmanlık",
        message: message,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return NextResponse.json(
        {
          success: false,
          error: data.message || "Mesaj iletilirken bir hata oluştu.",
        },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla iletildi.",
    });
  } catch (error) {
    console.error("[The Luma Contact API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Sunucu bağlantısında bir sorun oluştu. Lütfen tekrar deneyiniz veya doğrudan WhatsApp hattımızdan bize ulaşınız.",
      },
      { status: 500 }
    );
  }
}
