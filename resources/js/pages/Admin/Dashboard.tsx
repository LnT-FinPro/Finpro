// resources/js/Pages/Admin/Dashboard.tsx
import React from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
// HAPUS: import AppLayout from '@/layouts/app-layout'; // Tidak perlu jika AdminLayout yang digunakan
import { type BreadcrumbItem } from '@/types'; // Breadcrumbs bisa dikelola di AdminLayout atau di sini
import { Head, usePage } from '@inertiajs/react'; // Import usePage
import { PageProps } from '@/types'; // Import PageProps
import AdminLayout from '@/layouts/AdminLayout'; // Import AdminLayout untuk persistent layout

export default function AdminDashboard() {
    const { auth } = usePage<PageProps>().props; // Bisa akses auth jika perlu info user

    return (
        // TIDAK ADA <AppLayout> DI SINI
        <>
            <Head title="Admin Dashboard" /> {/* Judul spesifik halaman */}
            {/* Konten utama halaman dashboard */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl"> {/* p-4 mungkin sudah ada di AdminLayout */}
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Admin Dashboard
                </h1>
                <p className="text-gray-700 dark:text-gray-300">
                    Welcome, {auth.user?.name}!
                </p>

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[calc(100vh-20rem)] flex-1 overflow-hidden rounded-xl border md:min-h-min"> {/* Sesuaikan min-h */}
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}

// Menetapkan AdminLayout sebagai persistent layout untuk halaman ini
AdminDashboard.layout = (page: React.ReactElement) => (
    <AdminLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Dashboard Overview {/* Header bisa disesuaikan per halaman */}
            </h2>
        }
    >
        {page}
    </AdminLayout>
);