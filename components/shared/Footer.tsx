export function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="font-bold text-lg tracking-tight">SectionBuilder Studio</span>
                        <p className="mt-4 text-gray-500 text-sm max-w-sm">
                            Premium Shopify sections for modern brands. Copy, paste, and launch your store faster with high-converting, beautiful blocks.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-black">All Sections</a></li>
                            <li><a href="#" className="hover:text-black">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-black">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-black">About</a></li>
                            <li><a href="#" className="hover:text-black">License</a></li>
                            <li><a href="#" className="hover:text-black">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>© 2025 Section Builder Studio. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-600">Privacy</a>
                        <a href="#" className="hover:text-gray-600">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
