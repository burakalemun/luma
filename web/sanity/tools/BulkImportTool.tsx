"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useClient } from "sanity";

interface BulkStats {
  categories: number;
  blogPosts: number;
  workshops: number;
  instagramPosts: number;
  products?: number;
  total: number;
}

interface SanityDocItem {
  _id: string;
  _type: string;
  title?: string;
  name?: string;
  _updatedAt?: string;
}

export function BulkImportTool() {
  const client = useClient({ apiVersion: "2024-10-09" });

  const [activeTab, setActiveTab] = useState<"import" | "delete">("import");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState<BulkStats | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [documents, setDocuments] = useState<any[]>([]);
  const [currentCounts, setCurrentCounts] = useState<{
    posts: number;
    workshops: number;
    instagram: number;
    categories: number;
    products: number;
  } | null>(null);

  // Mevcut dökümanların listesi (Silme ekranı için)
  const [liveDocs, setLiveDocs] = useState<SanityDocItem[]>([]);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"info" | "success" | "error">("info");

  // Mevcut veritabanı durumunu ve dökümanları sorgula
  const fetchCurrentCountsAndDocs = async () => {
    try {
      const [pCount, wCount, iCount, cCount, prodCount, allItems] = await Promise.all([
        client.fetch('count(*[_type == "post" && !(_id in path("drafts.**"))])'),
        client.fetch('count(*[_type == "workshop" && !(_id in path("drafts.**"))])'),
        client.fetch('count(*[_type == "instagramPost" && !(_id in path("drafts.**"))])'),
        client.fetch('count(*[_type == "category" && !(_id in path("drafts.**"))])'),
        client.fetch('count(*[_type == "product" && !(_id in path("drafts.**"))])'),
        client.fetch(
          `*[_type in ["post", "workshop", "instagramPost", "category", "product"] && !(_id in path("drafts.**"))] | order(_updatedAt desc) {
            _id,
            _type,
            title,
            name,
            _updatedAt
          }`
        ),
      ]);

      setCurrentCounts({
        posts: pCount,
        workshops: wCount,
        instagram: iCount,
        categories: cCount,
        products: prodCount,
      });

      setLiveDocs(allItems || []);
      setSelectedDocIds([]);
    } catch (err) {
      console.warn("Mevcut veri sorgulama hatası:", err);
    }
  };

  // Hazır verileri çek
  const fetchPreparedData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bulk-data");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setDocuments(data.documents);
      } else {
        setStatusMessage("Veri yüklenemedi: " + data.error);
        setStatusType("error");
      }
    } catch (err) {
      setStatusMessage("API bağlantı hatası: " + (err as Error).message);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreparedData();
    fetchCurrentCountsAndDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toplu Aktarım İşlemi
  const handleImportByType = async (type: "instagramPost" | "workshop" | "post" | "product" | "all") => {
    if (documents.length === 0) return;

    try {
      setBusy(true);
      setStatusMessage("Sanity bulutuna aktarılıyor... Lütfen bekleyin.");
      setStatusType("info");

      let docsToImport = documents;
      let label = "Tüm veriler";
      if (type === "instagramPost") {
        docsToImport = documents.filter((d) => d._type === "instagramPost");
        label = "Instagram Gönderileri";
      } else if (type === "workshop") {
        docsToImport = documents.filter((d) => d._type === "workshop");
        label = "Workshop / Atölyeler";
      } else if (type === "post") {
        docsToImport = documents.filter((d) => d._type === "post" || d._type === "category");
        label = "Blog Yazıları ve Kategoriler";
      } else if (type === "product") {
        docsToImport = documents.filter((d) => d._type === "product");
        label = "Ürünler";
      }

      const transaction = client.transaction();
      docsToImport.forEach((doc) => {
        transaction.createOrReplace(doc);
      });

      await transaction.commit();

      setStatusMessage(
        `🎉 Harika! ${docsToImport.length} adet ${label} başarıyla Sanity bulutuna aktarıldı!`
      );
      setStatusType("success");
      await fetchCurrentCountsAndDocs();
    } catch (err) {
      console.error("Aktarım hatası:", err);
      setStatusMessage("Aktarım sırasında hata oluştu: " + (err as Error).message);
      setStatusType("error");
    } finally {
      setBusy(false);
    }
  };

  const handleImportAll = () => handleImportByType("all");

  // Hatalı test dökümanını onar
  const handleFixDraftIssue = async () => {
    try {
      setBusy(true);
      setStatusMessage("Hatalı taslak doküman düzeltiliyor...");
      await client
        .patch("d36d6a72-b65a-4bce-a973-30e270b89ae0")
        .unset(["mainImage"])
        .commit();
      
      try {
        await client
          .patch("drafts.d36d6a72-b65a-4bce-a973-30e270b89ae0")
          .unset(["mainImage"])
          .commit();
      } catch {
        // draft olmayabilir
      }

      setStatusMessage("✅ Hatalı kapak görseli alanı temizlendi, 2 Issue uyarısı giderildi!");
      setStatusType("success");
      await fetchCurrentCountsAndDocs();
    } catch (err) {
      setStatusMessage("Onarım sırasında hata: " + (err as Error).message);
      setStatusType("error");
    } finally {
      setBusy(false);
    }
  };

  // ==========================================
  // HIZLI & TOPLU SİLME İŞLEMLERİ
  // ==========================================

  // Belirli bir dokümanı tekil silme
  const handleDeleteSingle = async (docId: string, title?: string) => {
    const confirmName = title ? `"${title}"` : docId;
    if (!window.confirm(`${confirmName} içeriğini silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      setBusy(true);
      setStatusMessage("Doküman siliniyor...");
      setStatusType("info");

      const cleanId = docId.replace(/^drafts\./, "");
      const transaction = client.transaction();
      transaction.delete(cleanId);
      transaction.delete(`drafts.${cleanId}`);
      await transaction.commit();

      setStatusMessage(`✅ ${confirmName} başarıyla silindi.`);
      setStatusType("success");
      await fetchCurrentCountsAndDocs();
    } catch (err) {
      setStatusMessage("Silme hatası: " + (err as Error).message);
      setStatusType("error");
    } finally {
      setBusy(false);
    }
  };

  // Seçilen dokümanları toplu silme
  const handleDeleteSelected = async () => {
    if (selectedDocIds.length === 0) return;

    if (
      !window.confirm(
        `Seçili olan ${selectedDocIds.length} adet dokümanı kalıcı olarak silmek istediğinize emin misiniz?`
      )
    ) {
      return;
    }

    try {
      setBusy(true);
      setStatusMessage(`${selectedDocIds.length} adet doküman siliniyor...`);
      setStatusType("info");

      const transaction = client.transaction();
      selectedDocIds.forEach((id) => {
        const cleanId = id.replace(/^drafts\./, "");
        transaction.delete(cleanId);
        transaction.delete(`drafts.${cleanId}`);
      });
      await transaction.commit();

      setStatusMessage(`✅ Seçilen ${selectedDocIds.length} adet doküman başarıyla silindi!`);
      setStatusType("success");
      setSelectedDocIds([]);
      await fetchCurrentCountsAndDocs();
    } catch (err) {
      setStatusMessage("Toplu silme hatası: " + (err as Error).message);
      setStatusType("error");
    } finally {
      setBusy(false);
    }
  };

  // Belirli bir türdeki tüm dokümanları silme
  const handleDeleteByType = async (type: string, label: string) => {
    if (
      !window.confirm(
        `⚠️ DİKKAT: Veritabanındaki TÜM ${label.toUpperCase()} içerikleri silinecektir! Emin misiniz?`
      )
    ) {
      return;
    }

    try {
      setBusy(true);
      setStatusMessage(`Tüm ${label} içerikleri taranıyor ve siliniyor...`);
      setStatusType("info");

      // Hem published hem draft'ları bul
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const docsToDelete: any[] = await client.fetch(
        `*[_type == $type] { _id }`,
        { type }
      );

      if (docsToDelete.length === 0) {
        setStatusMessage(`Silinecek ${label} bulunamadı.`);
        setStatusType("info");
        setBusy(false);
        return;
      }

      const transaction = client.transaction();
      docsToDelete.forEach((d) => {
        transaction.delete(d._id);
        const cleanId = d._id.replace(/^drafts\./, "");
        transaction.delete(`drafts.${cleanId}`);
      });
      await transaction.commit();

      setStatusMessage(`🎉 Toplam ${docsToDelete.length} adet ${label} başarıyla temizlendi!`);
      setStatusType("success");
      await fetchCurrentCountsAndDocs();
    } catch (err) {
      setStatusMessage("Silme hatası: " + (err as Error).message);
      setStatusType("error");
    } finally {
      setBusy(false);
    }
  };

  // Tüm verileri sıfırla (Temiz Veritabanı)
  const handleDeleteEverything = async () => {
    if (
      !window.confirm(
        "🚨 UYARI: Blog, Workshop, Instagram ve Kategorilerin TAMAMI silinecektir! Devam etmek istediğinize emin misiniz?"
      )
    ) {
      return;
    }

    try {
      setBusy(true);
      setStatusMessage("Tüm içerikler temizleniyor...");
      setStatusType("info");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const allDocs: any[] = await client.fetch(
        `*[_type in ["post", "workshop", "instagramPost", "category", "product"]] { _id }`
      );

      if (allDocs.length === 0) {
        setStatusMessage("Zaten silinecek içerik bulunmuyor.");
        setStatusType("info");
        setBusy(false);
        return;
      }

      const transaction = client.transaction();
      allDocs.forEach((d) => {
        transaction.delete(d._id);
        const cleanId = d._id.replace(/^drafts\./, "");
        transaction.delete(`drafts.${cleanId}`);
      });
      await transaction.commit();

      setStatusMessage(`🧹 Tertemiz! Toplam ${allDocs.length} adet içerik tamamen sıfırlandı.`);
      setStatusType("success");
      await fetchCurrentCountsAndDocs();
    } catch (err) {
      setStatusMessage("Sıfırlama hatası: " + (err as Error).message);
      setStatusType("error");
    } finally {
      setBusy(false);
    }
  };

  // Filtrelenmiş dökümanlar
  const filteredDocs = useMemo(() => {
    return liveDocs.filter((doc) => {
      const matchesType = filterType === "all" || doc._type === filterType;
      const displayTitle = doc.title || doc.name || doc._id;
      const matchesSearch =
        searchQuery.trim() === "" ||
        displayTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc._id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [liveDocs, filterType, searchQuery]);

  const allFilteredSelected =
    filteredDocs.length > 0 &&
    filteredDocs.every((d) => selectedDocIds.includes(d._id));

  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      const filteredIds = new Set(filteredDocs.map((d) => d._id));
      setSelectedDocIds((prev) => prev.filter((id) => !filteredIds.has(id)));
    } else {
      const newIds = new Set([...selectedDocIds, ...filteredDocs.map((d) => d._id)]);
      setSelectedDocIds(Array.from(newIds));
    }
  };

  const toggleSelectDoc = (id: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "post":
        return { label: "Blog", color: "#38bdf8", bg: "#0284c720" };
      case "workshop":
        return { label: "Workshop", color: "#4ade80", bg: "#16a34a20" };
      case "instagramPost":
        return { label: "Instagram", color: "#f472b6", bg: "#db277720" };
      case "category":
        return { label: "Kategori", color: "#fbbf24", bg: "#d9770620" };
      case "product":
        return { label: "Ürün", color: "#f97316", bg: "#ea580c20" };
      default:
        return { label: type, color: "#94a3b8", bg: "#47556920" };
    }
  };

  return (
    <div style={{ maxWidth: 1040, margin: "24px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <div style={{ background: "#1c202a", borderRadius: 14, padding: 32, border: "1px solid #2d3446", color: "#f1f3f7", boxShadow: "0 10px 40px rgba(0,0,0,0.4)" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "#fff" }}>
                ⚡ The Luma — İçerik & Toplu İşlem Merkezi
              </h1>
              <span style={{ background: "#10b98120", color: "#10b981", border: "1px solid #10b98140", borderRadius: 6, fontSize: 11, padding: "2px 8px", fontWeight: 600 }}>
                Canlı Sanity Bağlantısı
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#94a3b8" }}>
              Tek tıkla CSV/Excel&apos;den toplu yükleme yapın veya gereksiz içerikleri hızlıca ve toplu olarak silin.
            </p>
          </div>
          <button
            onClick={() => {
              fetchPreparedData();
              fetchCurrentCountsAndDocs();
            }}
            disabled={busy}
            style={{
              background: "#2a3143",
              border: "1px solid #3d465d",
              color: "#cbd5e1",
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Yenile ↻
          </button>
        </div>

        {/* STATUS BANNER */}
        {statusMessage && (
          <div
            style={{
              padding: "14px 18px",
              borderRadius: 8,
              marginBottom: 20,
              fontSize: 14,
              fontWeight: 500,
              background: statusType === "success" ? "#064e3b" : statusType === "error" ? "#7f1d1d" : "#1e3a8a",
              border: `1px solid ${statusType === "success" ? "#10b981" : statusType === "error" ? "#ef4444" : "#3b82f6"}`,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{statusMessage}</span>
            <button
              onClick={() => setStatusMessage(null)}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}
            >
              ✕
            </button>
          </div>
        )}

        {/* TABS (İÇE AKTAR VS SİLME MERKEZİ) */}
        <div style={{ display: "flex", gap: 10, borderBottom: "1px solid #2d3446", paddingBottom: 16, marginBottom: 24 }}>
          <button
            onClick={() => setActiveTab("import")}
            style={{
              background: activeTab === "import" ? "#10b981" : "#242b3a",
              color: activeTab === "import" ? "#fff" : "#94a3b8",
              border: "none",
              borderRadius: 8,
              padding: "10px 22px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            🚀 Toplu İçe Aktar (CSV / Excel)
          </button>

          <button
            onClick={() => setActiveTab("delete")}
            style={{
              background: activeTab === "delete" ? "#ef4444" : "#242b3a",
              color: activeTab === "delete" ? "#fff" : "#94a3b8",
              border: "none",
              borderRadius: 8,
              padding: "10px 22px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            🗑️ Hızlı & Toplu Silme Merkezi ({liveDocs.length})
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: TOPLU İÇE AKTAR */}
        {/* ============================================================== */}
        {activeTab === "import" && (
          <div>
            {/* STATS COMPARISON GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
              <div style={{ background: "#242b3a", padding: 18, borderRadius: 8, border: "1px solid #333c50" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
                  📝 BLOG YAZILARI
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#38bdf8", marginBottom: 4 }}>
                  {stats ? stats.blogPosts : "-"} Hazır
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  Veritabanında: {currentCounts ? currentCounts.posts : "-"}
                </div>
              </div>

              <div style={{ background: "#242b3a", padding: 18, borderRadius: 8, border: "1px solid #333c50" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
                  🌿 WORKSHOP / ATÖLYE
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#4ade80", marginBottom: 4 }}>
                  {stats ? stats.workshops : "-"} Hazır
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  Veritabanında: {currentCounts ? currentCounts.workshops : "-"}
                </div>
              </div>

              <div style={{ background: "#242b3a", padding: 18, borderRadius: 8, border: "1px solid #333c50" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
                  📸 INSTAGRAM VİTRİNİ
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#f472b6", marginBottom: 4 }}>
                  {stats ? stats.instagramPosts : "-"} Hazır
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  Veritabanında: {currentCounts ? currentCounts.instagram : "-"}
                </div>
              </div>

              <div style={{ background: "#242b3a", padding: 18, borderRadius: 8, border: "1px solid #333c50" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
                  🏷️ KATEGORİLER
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#fbbf24", marginBottom: 4 }}>
                  {stats ? stats.categories : "-"} Hazır
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  Veritabanında: {currentCounts ? currentCounts.categories : "-"}
                </div>
              </div>

              <div style={{ background: "#242b3a", padding: 18, borderRadius: 8, border: "1px solid #333c50" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
                  🛍️ ÜRÜNLER
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#f97316", marginBottom: 4 }}>
                  {stats ? (stats.products ?? 5) : "-"} Hazır
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  Veritabanında: {currentCounts ? currentCounts.products : "-"}
                </div>
              </div>
            </div>

            {/* ACTION CARD */}
            <div style={{ background: "#263045", padding: 24, borderRadius: 10, border: "1px solid #3b82f640", marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px 0", color: "#fff" }}>
                🚀 Tek Tıkla Toplu Aktarımı Başlat
              </h2>
              <p style={{ margin: "0 0 20px 0", fontSize: 14, color: "#cbd5e1", lineHeight: 1.6 }}>
                <code>web/data/</code> altındaki Excel/CSV dosyalarından üretilen <strong>{stats?.total || 44} hazır içeriğin</strong> tamamını Sanity veritabanınıza yükler.
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                <button
                  onClick={handleImportAll}
                  disabled={busy || loading || documents.length === 0}
                  style={{
                    background: busy ? "#059669" : "#10b981",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "12px 24px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: busy || loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                  }}
                >
                  {busy ? "Aktarılıyor... ⏳" : `🚀 Tümünü Şimdi Aktar (${stats?.total || 44} Döküman)`}
                </button>

                <button
                  onClick={() => handleImportByType("product")}
                  disabled={busy || loading || documents.length === 0}
                  style={{
                    background: "#ea580c",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "12px 20px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: busy || loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 12px rgba(234, 88, 12, 0.3)",
                  }}
                >
                  🛍️ Sadece Ürünleri Yükle ({stats?.products ?? 5} Ürün)
                </button>

                <button
                  onClick={() => handleImportByType("instagramPost")}
                  disabled={busy || loading || documents.length === 0}
                  style={{
                    background: "#db2777",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "12px 20px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: busy || loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 12px rgba(219, 39, 119, 0.3)",
                  }}
                >
                  📸 Sadece Instagram&apos;ı Yükle ({stats?.instagramPosts || 5} Gönderi)
                </button>

                <button
                  onClick={() => handleImportByType("workshop")}
                  disabled={busy || loading || documents.length === 0}
                  style={{
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "12px 20px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: busy || loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                  }}
                >
                  🌿 Sadece Atölyeleri Yükle ({stats?.workshops || 3} Atölye)
                </button>

                <button
                  onClick={() => handleImportByType("post")}
                  disabled={busy || loading || documents.length === 0}
                  style={{
                    background: "#0284c7",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "12px 20px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: busy || loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)",
                  }}
                >
                  📝 Sadece Blog&apos;u Yükle ({stats?.blogPosts || 25} Yazı)
                </button>

                <button
                  onClick={handleFixDraftIssue}
                  disabled={busy}
                  style={{
                    background: "#334155",
                    color: "#f59e0b",
                    border: "1px solid #f59e0b50",
                    borderRadius: 8,
                    padding: "12px 18px",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: busy ? "not-allowed" : "pointer",
                  }}
                >
                  Hatalı Test Postunu Onar (2 Issue Gider)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: HIZLI & TOPLU SİLME MERKEZİ */}
        {/* ============================================================== */}
        {activeTab === "delete" && (
          <div>
            {/* HIZLI KATEGORİK SİLME BUTONLARI */}
            <div style={{ background: "#251818", border: "1px solid #7f1d1d60", padding: 20, borderRadius: 10, marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fca5a5", marginBottom: 12 }}>
                ⚡ Kategoriye Göre Toplu Silme (Tümünü Temizle):
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={() => handleDeleteByType("post", "Blog Yazılarını")}
                  disabled={busy || (currentCounts?.posts || 0) === 0}
                  style={{
                    background: "#7f1d1d",
                    color: "#fff",
                    border: "1px solid #ef444460",
                    borderRadius: 6,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: (currentCounts?.posts || 0) === 0 ? "not-allowed" : "pointer",
                    opacity: (currentCounts?.posts || 0) === 0 ? 0.5 : 1,
                  }}
                >
                  🗑️ Tüm Blog Yazılarını Sil ({currentCounts?.posts || 0})
                </button>

                <button
                  onClick={() => handleDeleteByType("workshop", "Atölyeleri")}
                  disabled={busy || (currentCounts?.workshops || 0) === 0}
                  style={{
                    background: "#7f1d1d",
                    color: "#fff",
                    border: "1px solid #ef444460",
                    borderRadius: 6,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: (currentCounts?.workshops || 0) === 0 ? "not-allowed" : "pointer",
                    opacity: (currentCounts?.workshops || 0) === 0 ? 0.5 : 1,
                  }}
                >
                  🗑️ Tüm Atölyeleri Sil ({currentCounts?.workshops || 0})
                </button>

                <button
                  onClick={() => handleDeleteByType("instagramPost", "Instagram Gönderilerini")}
                  disabled={busy || (currentCounts?.instagram || 0) === 0}
                  style={{
                    background: "#7f1d1d",
                    color: "#fff",
                    border: "1px solid #ef444460",
                    borderRadius: 6,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: (currentCounts?.instagram || 0) === 0 ? "not-allowed" : "pointer",
                    opacity: (currentCounts?.instagram || 0) === 0 ? 0.5 : 1,
                  }}
                >
                  🗑️ Tüm Instagram&apos;ı Sil ({currentCounts?.instagram || 0})
                </button>

                <button
                  onClick={() => handleDeleteByType("category", "Kategorileri")}
                  disabled={busy || (currentCounts?.categories || 0) === 0}
                  style={{
                    background: "#7f1d1d",
                    color: "#fff",
                    border: "1px solid #ef444460",
                    borderRadius: 6,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: (currentCounts?.categories || 0) === 0 ? "not-allowed" : "pointer",
                    opacity: (currentCounts?.categories || 0) === 0 ? 0.5 : 1,
                  }}
                >
                  🗑️ Tüm Kategorileri Sil ({currentCounts?.categories || 0})
                </button>

                <button
                  onClick={() => handleDeleteByType("product", "Ürünleri")}
                  disabled={busy || (currentCounts?.products || 0) === 0}
                  style={{
                    background: "#7f1d1d",
                    color: "#fff",
                    border: "1px solid #ef444460",
                    borderRadius: 6,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: (currentCounts?.products || 0) === 0 ? "not-allowed" : "pointer",
                    opacity: (currentCounts?.products || 0) === 0 ? 0.5 : 1,
                  }}
                >
                  🗑️ Tüm Ürünleri Sil ({currentCounts?.products || 0})
                </button>

                <button
                  onClick={handleDeleteEverything}
                  disabled={busy || liveDocs.length === 0}
                  style={{
                    background: "#450a0a",
                    color: "#f87171",
                    border: "1px dashed #ef4444",
                    borderRadius: 6,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: liveDocs.length === 0 ? "not-allowed" : "pointer",
                    marginLeft: "auto",
                  }}
                >
                  🚨 Tüm Veritabanını Sıfırla
                </button>
              </div>
            </div>

            {/* FİLTRE VE ARAMA ÇUBUĞU */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              {/* TİP FİLTRESİ */}
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { id: "all", label: `Tümü (${liveDocs.length})` },
                  { id: "product", label: `Ürün (${currentCounts?.products || 0})` },
                  { id: "post", label: `Blog (${currentCounts?.posts || 0})` },
                  { id: "workshop", label: `Atölye (${currentCounts?.workshops || 0})` },
                  { id: "instagramPost", label: `Instagram (${currentCounts?.instagram || 0})` },
                  { id: "category", label: `Kategori (${currentCounts?.categories || 0})` },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilterType(item.id)}
                    style={{
                      background: filterType === item.id ? "#38bdf820" : "#242b3a",
                      color: filterType === item.id ? "#38bdf8" : "#94a3b8",
                      border: `1px solid ${filterType === item.id ? "#38bdf860" : "#333c50"}`,
                      borderRadius: 6,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* ARAMA VE SEÇİLENLERİ SİL */}
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="İçerik ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: "#242b3a",
                    border: "1px solid #333c50",
                    color: "#fff",
                    borderRadius: 6,
                    padding: "7px 12px",
                    fontSize: 13,
                    width: 180,
                  }}
                />

                {selectedDocIds.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    disabled={busy}
                    style={{
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "7px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
                    }}
                  >
                    🗑️ Seçilenleri Sil ({selectedDocIds.length})
                  </button>
                )}
              </div>
            </div>

            {/* BELGE LİSTESİ TABLOSU */}
            <div style={{ background: "#242b3a", borderRadius: 8, border: "1px solid #333c50", overflow: "hidden" }}>
              {filteredDocs.length === 0 ? (
                <div style={{ padding: 40, textAlign: "center", color: "#94a3b8", fontSize: 14 }}>
                  {liveDocs.length === 0
                    ? "Veritabanında henüz hiçbir içerik bulunmuyor. 'Toplu İçe Aktar' sekmesinden hazır verileri yükleyebilirsiniz."
                    : "Aramanıza veya seçili filtreye uygun içerik bulunamadı."}
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#1a202c", borderBottom: "1px solid #333c50", textAlign: "left", color: "#94a3b8" }}>
                      <th style={{ padding: "12px 14px", width: 40 }}>
                        <input
                          type="checkbox"
                          checked={allFilteredSelected}
                          onChange={toggleSelectAll}
                          style={{ cursor: "pointer" }}
                        />
                      </th>
                      <th style={{ padding: "12px 14px", width: 100 }}>TÜR</th>
                      <th style={{ padding: "12px 14px" }}>BAŞLIK / İSİM</th>
                      <th style={{ padding: "12px 14px", width: 140 }}>DOKÜMAN ID</th>
                      <th style={{ padding: "12px 14px", width: 90, textAlign: "right" }}>İŞLEM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.map((doc) => {
                      const badge = getTypeBadge(doc._type);
                      const isSelected = selectedDocIds.includes(doc._id);
                      const title = doc.title || doc.name || doc._id;

                      return (
                        <tr
                          key={doc._id}
                          style={{
                            borderBottom: "1px solid #2d3446",
                            background: isSelected ? "#3b82f615" : "transparent",
                            transition: "background 0.15s",
                          }}
                        >
                          <td style={{ padding: "12px 14px" }}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectDoc(doc._id)}
                              style={{ cursor: "pointer" }}
                            />
                          </td>
                          <td style={{ padding: "12px 14px" }}>
                            <span
                              style={{
                                background: badge.bg,
                                color: badge.color,
                                border: `1px solid ${badge.color}40`,
                                borderRadius: 4,
                                padding: "2px 8px",
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            >
                              {badge.label}
                            </span>
                          </td>
                          <td style={{ padding: "12px 14px", color: "#f8fafc", fontWeight: 500 }}>
                            {title}
                          </td>
                          <td style={{ padding: "12px 14px", color: "#64748b", fontFamily: "monospace", fontSize: 11 }}>
                            {doc._id.length > 20 ? doc._id.slice(0, 18) + "..." : doc._id}
                          </td>
                          <td style={{ padding: "12px 14px", textAlign: "right" }}>
                            <button
                              onClick={() => handleDeleteSingle(doc._id, title)}
                              disabled={busy}
                              style={{
                                background: "#ef444420",
                                color: "#f87171",
                                border: "1px solid #ef444440",
                                borderRadius: 5,
                                padding: "4px 10px",
                                fontSize: 11,
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Sil ✕
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* INFO FOOTER */}
        <div style={{ borderTop: "1px solid #2d3446", paddingTop: 20, marginTop: 24 }}>
          <p style={{ margin: "0 0 6px 0", fontSize: 13, color: "#94a3b8" }}>
            💡 <strong>İpucu:</strong> Bu panel doğrudan tarayıcınızdaki Sanity oturumuyla çalıştığı için silme işlemleri anında gerçekleşir ve yayındaki siteye 30 saniye içinde yansır.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: "#94a3b8" }}>
            📁 İstediğiniz zaman sol üstteki <strong>Structure</strong> menüsüne tıklayarak kalan içerikleri tek tek inceleyebilir veya düzenleyebilirsiniz.
          </p>
        </div>

      </div>
    </div>
  );
}
