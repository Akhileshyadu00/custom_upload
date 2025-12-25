import { Section } from "@/data/sections";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface CustomSection extends Section {
    isCustom: true;
    createdAt: string;
    user_id: string;
    author_name?: string;
}

export function useSectionStore() {
    const [customSections, setCustomSections] = useState<CustomSection[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSections = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('sections')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            const mapped = data.map((item: any) => ({
                slug: item.slug,
                name: item.title,
                description: item.description,
                code: item.code,
                category: item.category,
                niches: item.niches,
                preview: item.preview_url,
                isCustom: true as true,
                createdAt: item.created_at,
                user_id: item.user_id,
                author_name: item.author_name
            }));
            setCustomSections(mapped);
        }
        setIsLoading(false);
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchSections();

        const channel = supabase
            .channel('sections_updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'sections' }, () => {
                fetchSections();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const addSection = async (section: Omit<CustomSection, "createdAt" | "isCustom" | "user_id">) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { error } = await supabase.from('sections').insert([{
            title: section.name,
            slug: section.slug,
            description: section.description,
            code: section.code,
            category: section.category,
            niches: section.niches,
            preview_url: section.preview,
            user_id: user.id,
            author_name: section.author_name || user.user_metadata?.full_name || "Anonymous"
        }]);

        if (error) throw error;
    };

    const removeSection = async (slug: string) => {
        const { error } = await supabase.from('sections').delete().eq('slug', slug);
        if (error) throw error;
    };

    const updateSection = async (slug: string, updates: Partial<Omit<CustomSection, "createdAt" | "isCustom" | "user_id">>) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const dbUpdates: any = {};
        if (updates.name) dbUpdates.title = updates.name;
        if (updates.description) dbUpdates.description = updates.description;
        if (updates.code) dbUpdates.code = updates.code;
        if (updates.category) dbUpdates.category = updates.category;
        if (updates.niches) dbUpdates.niches = updates.niches;
        if (updates.preview) dbUpdates.preview_url = updates.preview;

        const { error } = await supabase
            .from('sections')
            .update(dbUpdates)
            .eq('slug', slug)
            .eq('user_id', user.id);

        if (error) throw error;
    };

    return {
        customSections,
        addSection,
        removeSection,
        updateSection,
        isLoading,
        mounted
    };
}
