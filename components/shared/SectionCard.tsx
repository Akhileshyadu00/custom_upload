"use client";

// import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section } from "@/data/sections";
import { Badge } from "@/components/ui/badge";

interface SectionCardProps {
    section: Section;
}

export function SectionCard({ section }: SectionCardProps) {
    return (
        <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
            <div className="relative aspect-video overflow-hidden bg-gray-100">
                {/* Placeholder for actual screenshot */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-50">
                    <span className="text-4xl font-light">Preview</span>
                </div>
                {/* Since we don't have real images yet, sticking to text placeholder or we could use generic gradient */}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button asChild variant="secondary" className="rounded-full">
                        <Link href={`/sections/${section.slug}`}>
                            Live Preview
                        </Link>
                    </Button>
                </div>
            </div>

            <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs font-normal text-gray-500 border-gray-200">
                        {section.category}
                    </Badge>
                </div>
                <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                    {section.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                    {section.description}
                </p>
            </CardContent>

            <CardFooter className="p-5 pt-0 flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center gap-1">
                    <Code2 className="h-4 w-4" />
                    <span>Liquid + CSS</span>
                </div>
                <Link href={`/sections/${section.slug}`} className="flex items-center gap-1 text-black font-medium hover:underline">
                    View Code <ArrowRight className="h-3 w-3" />
                </Link>
            </CardFooter>
        </Card>
    );
}
