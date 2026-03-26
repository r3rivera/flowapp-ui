export default function Header() {
    return (
        <header className="flex items-center gap-3 px-6 py-3 bg-primary border-b border-gray-300 shadow-sm">
            {/* Placeholder logo */}
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-300 font-bold text-lg text-gray-500 select-none">
                L
            </div>
            <span className="text-base font-semibold text-gray-700">FlowApp</span>
        </header>
    );
}
