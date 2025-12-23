"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { sections } from "@/data/sections";
import { SectionCard } from "@/components/shared/SectionCard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/50 via-white to-white -z-10"></div>

        <div className="container px-4 mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              <span>Speed up your Shopify development</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Build. Copy. Launch.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Premium Shopify Sections
              </span>
              <br />in One Click.
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop coding from scratch. Access a library of high-quality, conversion-optimized Shopify sections. Copy Liquid, CSS, and Schema instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                <Link href="/sections">
                  View Sections <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-slate-200 text-slate-600 hover:bg-slate-50">
                How it works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                <LayoutTemplate className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Professional Design</h3>
              <p className="text-slate-500">
                Crafted by expert designers to match premium themes like Dawn and Archetype.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clean Code</h3>
              <p className="text-slate-500">
                Optimized Liquid and Tailwind CSS. No bloat, just performance-ready code.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Copy</h3>
              <p className="text-slate-500">
                One-click to copy Liquid, schema, and CSS. Paste directly into Shopify code editor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections Preview */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Sections</h2>
              <p className="text-slate-500">Start with our most used components.</p>
            </div>
            <Link href="/sections" className="text-indigo-600 font-medium hover:underline hidden md:block">
              View all sections
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.slice(0, 3).map((section) => (
              <SectionCard key={section.slug} section={section} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/sections">
              <Button variant="outline" className="w-full">View all sections</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
// testing