import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Instagram API Graph entegrasyonu veya scrapping logic buraya eklenecek.
  // frontend'in bozulmaması ve statik çalışması için mock data dönüyoruz.
  const mockPosts = [
    {
      id: "1",
      type: "reel",
      title: "Luma Warm Hug nasıl kullanılır?",
      views: "12K",
      img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
      url: "https://instagram.com/thelumaa_",
      hiddenOnTablet: false
    },
    {
      id: "2",
      type: "post",
      title: "Kiraz çekirdeği termoterapisinin faydaları",
      views: null,
      img: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=600&auto=format&fit=crop",
      url: "https://instagram.com/thelumaa_",
      hiddenOnTablet: false
    },
    {
      id: "3",
      type: "reel",
      title: "Uyku ritüelinizi dönüştürün",
      views: "8.5K",
      img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop",
      url: "https://instagram.com/thelumaa_",
      hiddenOnTablet: false
    },
    {
      id: "4",
      type: "post",
      title: "Ritual Box kutu açılışı (Unboxing)",
      views: null,
      img: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=600&auto=format&fit=crop",
      url: "https://instagram.com/thelumaa_",
      hiddenOnTablet: false
    },
    {
      id: "5",
      type: "reel",
      title: "5 dakikada zihin dinginliği molası",
      views: "15K",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
      url: "https://instagram.com/thelumaa_",
      hiddenOnTablet: true
    }
  ];

  return NextResponse.json({ data: mockPosts, success: true });
}
