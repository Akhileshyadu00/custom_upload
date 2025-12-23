"use client";

import { notFound } from "next/navigation";
import { sections } from "@/data/sections";
import { SectionDetailClient } from "@/components/sections/SectionDetailClient";
import { useSectionStore, CustomSection } from "@/lib/section-store";
import { useEffect, useState, use } from "react";
import { Section } from "@/data/sections";
import { Loader2 } from "lucide-react";

export default function SectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const staticSection = sections.find((s) => s.slug === resolvedParams.slug);
    const { customSections, mounted } = useSectionStore();
    const [section, setSection] = useState<Section | null>(staticSection || null);
    const [isLoading, setIsLoading] = useState(!staticSection);

    useEffect(() => {
        if (staticSection) return;

        if (mounted) {
            const custom = customSections.find(s => s.slug === resolvedParams.slug);
            if (custom) {
                setSection(custom as Section);
            }
            // If not found in custom either, we stay null -> generic not found UI or loading state finished
            setIsLoading(false);
        }
    }, [mounted, customSections, resolvedParams.slug, staticSection]);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!section) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-bold mb-2">Section Not Found</h1>
                <p className="text-gray-500">The section you are looking for does not exist.</p>
            </div>
        );
    }

    return <SectionDetailClient section={section} />;
}
