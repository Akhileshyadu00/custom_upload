import { Section } from "@/data/sections";
import { useState, useEffect } from "react";

export interface CustomSection extends Section {
    isCustom: true;
    createdAt: number;
}

const STORAGE_KEY = "custom_sections";

export function useSectionStore() {
    const [customSections, setCustomSections] = useState<CustomSection[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Self-healing: Deduplicate by slug on load
                const unique = parsed.reduce((acc: CustomSection[], current: CustomSection) => {
                    const x = acc.find(item => item.slug === current.slug);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc; // Skip duplicate (keep first found)
                    }
                }, []);

                if (unique.length !== parsed.length) {
                    console.warn("Cleaned up duplicate sections from storage");
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
                }
                setCustomSections(unique);
            } catch (e) {
                console.error("Failed to parse custom sections", e);
            }
        }

        const handleStorageChange = () => {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setCustomSections(JSON.parse(stored));
            }
        };

        window.addEventListener("section-change", handleStorageChange);
        return () => window.removeEventListener("section-change", handleStorageChange);
    }, []);

    const addSection = (section: Omit<CustomSection, "createdAt" | "isCustom">) => {
        const newSection: CustomSection = {
            ...section,
            isCustom: true,
            createdAt: Date.now(),
        };

        // Validate it has 'code'
        if (!newSection.code) {
            throw new Error("Section code is required");
        }

        // Remove existing with same slug (Upsert behavior)
        const others = customSections.filter(s => s.slug !== newSection.slug);
        const updated = [newSection, ...others];

        setCustomSections(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event("section-change"));
    };

    const removeSection = (slug: string) => {
        const updated = customSections.filter(s => s.slug !== slug);
        setCustomSections(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event("section-change"));
    };

    return {
        customSections,
        addSection,
        removeSection,
        mounted
    };
}
