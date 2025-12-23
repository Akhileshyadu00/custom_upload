"use client";

import Link from "next/link";
import { Layers, Search, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);

        // Check auth
        const checkAuth = () => {
            const stored = localStorage.getItem("currentUser");
            if (stored) setUser(JSON.parse(stored));
            else setUser(null);
        };
        checkAuth();

        window.addEventListener("auth-change", checkAuth);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("auth-change", checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
        toast.info("Logged out");
    };

    // Prevent hydration mismatch by only rendering user-dependent UI after mount
    const renderAuthButtons = () => {
        if (!mounted) return (
            <Button className="hidden md:flex bg-black text-white hover:bg-gray-800 rounded-full px-6 opacity-0">
                Get Access
            </Button>
        );

        if (user) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-gray-100 p-0 text-gray-600 hover:text-black hover:bg-gray-200">
                            <User className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-500 font-medium">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }

        return (
            <AuthModal defaultTab="signup">
                <Button className="hidden md:flex bg-black text-white hover:bg-gray-800 rounded-full px-6 transition-all hover:scale-105">
                    Sign Up Free
                </Button>
            </AuthModal>
        );
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
                    : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-black text-white p-1.5 rounded-lg">
                        <Layers className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">SectionBuilder</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/sections" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                        Browse Sections
                    </Link>
                    <Link href="/sections?category=Hero" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                        Hero
                    </Link>
                    <Link href="/sections?category=Features" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                        Features
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    {/* <Button variant="ghost" size="icon" className="text-gray-600">
            <Search className="h-5 w-5" />
          </Button> */}

                    {renderAuthButtons()}

                    {/* Mobile Menu Trigger - simplified */}
                    <AuthModal>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </AuthModal>
                </div>
            </div>
        </nav>
    );
}
