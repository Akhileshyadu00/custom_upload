"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { SectionCard } from "@/components/shared/SectionCard";
import { sections as staticSections, Section } from "@/data/sections";
import { useSectionStore, CustomSection } from "@/lib/section-store";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SectionsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const { customSections, mounted } = useSectionStore();
    const [activeTab, setActiveTab] = useState("all");

    // Merge sections
    const [allSections, setAllSections] = useState<Section[]>(staticSections);

    useEffect(() => {
        if (mounted) {
            setAllSections([...(customSections as Section[]), ...staticSections]);
        } else {
            setAllSections(staticSections);
        }
    }, [mounted, customSections]);

    // Derive categories
    const categories = ["All", ...Array.from(new Set(allSections.map((s) => s.category)))];

    const filteredSections = allSections.filter((section) => {
        const matchesSearch = section.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || section.category === activeCategory;
        const matchesTab = activeTab === "all"
            ? true
            : activeTab === "custom"
                ? (section as any).isCustom
                : !(section as any).isCustom;

        return matchesSearch && matchesCategory && matchesTab;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Section Library</h1>
                        <p className="text-gray-500">Explore premium sections for your store.</p>
                    </div>
                    <Link href="/upload">
                        <Button className="bg-black text-white hover:bg-zinc-800 rounded-full">
                            <Plus className="mr-2 h-4 w-4" /> Upload Custom Section
                        </Button>
                    </Link>
                </div>

                {/* Controls */}
                <div className="flex flex-col lg:flex-row gap-6 mb-10 items-center justify-between">
                    <div className="flex flex-1 items-center gap-4 w-full lg:w-auto">
                        {/* Search */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search sections..."
                                className="pl-10 bg-white border-gray-200 rounded-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
                        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                            <TabsTrigger value="all">All Sections</TabsTrigger>
                            <TabsTrigger value="premium">Premium</TabsTrigger>
                            <TabsTrigger value="custom">My Uploads</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={activeCategory === cat ? "default" : "outline"}
                            onClick={() => setActiveCategory(cat)}
                            className={`rounded-full ${activeCategory === cat ? "bg-black text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"}`}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Grid */}
                {filteredSections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredSections.map((section) => (
                            <SectionCard key={section.slug} section={section} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No sections found matching your criteria.</p>
                        {activeTab === 'custom' && (
                            <Link href="/upload" className="mt-4 inline-block text-indigo-600 hover:underline">
                                Create your first section &rarr;
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
