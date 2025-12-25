"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSectionStore } from "@/lib/section-store";
import { toast } from "sonner";
import { DynamicPreview } from "@/components/shared/DynamicPreview";
import { Niche } from "@/data/sections";
import { Loader2, ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const availableNiches: Niche[] = [
    "Beauty", "Electronics", "Dropshipping", "Fashion", "Fitness",
    "Home Decor", "Jewelry", "Luxury", "Minimal", "Ready-To-Use Templates"
];

export default function EditSectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();
    const { customSections, updateSection } = useSectionStore();
    const { user, isLoading: authLoading } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingInfo, setIsFetchingInfo] = useState(true);

    // Form State
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Custom");
    const [niches, setNiches] = useState<string[]>([]);
    const [previewFile, setPreviewFile] = useState<File | null>(null);
    const [currentPreviewUrl, setCurrentPreviewUrl] = useState("");

    // Initial code
    const [code, setCode] = useState<string>("");

    // Load initial data
    useEffect(() => {
        const fetchSectionData = async () => {
            // 1. Try to find in store first (fastest)
            const existing = customSections.find(s => s.slug === slug);
            if (existing) {
                setName(existing.name);
                setDescription(existing.description);
                setCategory(existing.category);
                setNiches(existing.niches || []);
                setCode(existing.code);
                setCurrentPreviewUrl(existing.preview);
                setIsFetchingInfo(false);
                return;
            }

            // 2. Fallback to DB fetch if not in store (e.g. direct link)
            const { data, error } = await supabase
                .from('sections')
                .select('*')
                .eq('slug', slug)
                .single();

            if (data && !error) {
                setName(data.title);
                setDescription(data.description);
                setCategory(data.category);
                setNiches(data.niches || []);
                setCode(data.code);
                setCurrentPreviewUrl(data.preview_url);
            } else {
                toast.error("Section not found");
                router.push("/profile");
            }
            setIsFetchingInfo(false);
        };

        if (slug) fetchSectionData();
    }, [slug, customSections, router]);

    // Auth check
    useEffect(() => {
        if (!authLoading && !user) {
            toast.error("Please login to edit sections");
            router.push("/");
        }
    }, [user, authLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!name || !code) {
            toast.error("Name and Code are required");
            setIsLoading(false);
            return;
        }

        let previewUrl = currentPreviewUrl;

        try {
            // Upload Image if selected
            if (previewFile) {
                const fileExt = previewFile.name.split('.').pop();
                const fileName = `${slug}-${Date.now()}.${fileExt}`;
                const { error } = await supabase.storage
                    .from('section-previews')
                    .upload(fileName, previewFile);

                if (error) throw error;

                const { data: { publicUrl } } = supabase.storage
                    .from('section-previews')
                    .getPublicUrl(fileName);

                previewUrl = publicUrl;
            }

            await updateSection(slug, {
                name,
                description,
                category,
                niches: niches as any,
                preview: previewUrl,
                code: code,
            });

            toast.success("Section updated successfully!");
            router.push(`/sections/${slug}?custom=true`);
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to update section");
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading || isFetchingInfo) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-muted/20 pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-[1600px]">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/profile" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
                    </Link>
                    <h1 className="text-2xl font-bold">Edit Section</h1>
                    <div className="w-24"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start h-full">
                    {/* Left: Input Form */}
                    <div className="space-y-6">
                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle>Section Details</CardTitle>
                                <CardDescription>Update your section metadata.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Section Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g. Hero Video"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Input
                                            id="category"
                                            placeholder="e.g. Hero"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="preview">Preview Image</Label>
                                    <div className="flex items-center gap-4">
                                        {currentPreviewUrl && !previewFile && (
                                            <div className="w-16 h-16 relative rounded-md overflow-hidden bg-muted shrink-0">
                                                <img src={currentPreviewUrl} alt="Current" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="border-2 border-dashed border-zinc-200 rounded-lg p-4 text-center hover:bg-muted/50 transition cursor-pointer relative flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => setPreviewFile(e.target.files?.[0] || null)}
                                            />
                                            <div className="flex flex-col items-center gap-2">
                                                <UploadCloud className="w-8 h-8 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    {previewFile ? previewFile.name : (currentPreviewUrl ? "Replace current image" : "Upload thumbnail")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Niches (Select multiple)</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {availableNiches.map((niche) => (
                                            <button
                                                key={niche}
                                                type="button"
                                                onClick={() => setNiches(prev =>
                                                    prev.includes(niche) ? prev.filter(n => n !== niche) : [...prev, niche]
                                                )}
                                                className={`rounded-full px-3 py-1 text-xs font-medium transition-all border ${niches.includes(niche)
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "bg-background text-muted-foreground border-zinc-200 hover:border-zinc-300"
                                                    }`}
                                            >
                                                {niche}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Brief description..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="h-20"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-md flex-1">
                            <CardHeader className="pb-3">
                                <CardTitle>Liquid Code</CardTitle>
                                <CardDescription>Update your .liquid file content here.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Textarea
                                            id="code"
                                            className="font-mono text-xs h-[500px] leading-relaxed bg-muted/50 border-zinc-200 dark:border-zinc-800 resize-none"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            spellCheck={false}
                                        />
                                    </div>

                                    <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Update Section
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Live Preview */}
                    <div className="lg:sticky lg:top-24 space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="font-semibold text-foreground">Live Preview</h3>
                            <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded border">Autosyncing</span>
                        </div>

                        <div className="aspect-[16/10] w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative">
                            <DynamicPreview code={code} className="w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
