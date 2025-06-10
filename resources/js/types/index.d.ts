import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Example in resources/js/types/index.d.ts
export interface User {
    id: string; // Or number if not UUID
    name: string;
    email: string;
    // money?: number;
    // isAdmin?: boolean; // If you have admin roles
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number; // Store in cents in backend, format in frontend
    stock: number;
    image: string | null; // Path to image
    created_at?: string;
    updated_at?: string;
    // reviews_count?: number;
    // average_rating?: number;
}

export interface Review {
    id: string;
    user_id: string;
    product_id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    updated_at?: string;
    user?: User; // Eager loaded user for display
}

export interface CartItem {
    id: string; // Cart ID
    user_id: string;
    product_id: string;
    quantity: number;
    product: Product; // Eager loaded product details
    created_at?: string;
    updated_at?: string;
}

export interface OrderProduct { // Simplified product for order details
    id: string;
    name: string;
    image?: string | null;
}

export interface OrderDetail {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number; // Price at the time of order (in cents)
    product: OrderProduct; // Eager loaded simplified product info
    created_at?: string;
    updated_at?: string;
}

export interface Order {
    id: string;
    user_id: string;
    total_price: number; // In cents
    status?: string; // e.g., 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
    created_at: string;
    updated_at?: string;
    user?: User; // Eager loaded user details
    order_details?: OrderDetail[]; // Eager loaded order items
}

// For Laravel Pagination
export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    links?: PaginationLink[]; // Optional if not using Laravel's default simple/paginator links structure
    meta?: { // Often comes with Laravel API resources or default pagination
        current_page: number;
        from: number | null;
        last_page: number;
        links: PaginationLink[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
    // Or just links from Laravel's paginator->links() directly if not using resource collections
    // current_page: number;
    // first_page_url: string;
    // from: number | null;
    // last_page: number;
    // last_page_url: string;
    // next_page_url: string | null;
    // path: string;
    // per_page: number;
    // prev_page_url: string | null;
    // to: number | null;
    // total: number;
}

// More specific PaginatedProducts
export type PaginatedProducts<DataType = Product> = PaginatedData<DataType>;


// For general page props passed by Inertia, including auth and flash
export interface PageProps<T = Record<string, unknown>> {
    auth: {
        user: User | null;
    };
    flash?: {
        success?: string;
        error?: string;
        // Add other flash types if you use them
    };
    errors?: T; // Laravel validation errors object
    // You can extend this with other globally available props
    ziggy?: { // If you were using Ziggy, it'd be here
        url: string;
        port: number | null;
        defaults: Record<string, unknown>;
        route_names: Record<string, unknown>;
    };
}

// resources/js/types/index.d.ts
export interface User {
    id: string; // UUID
    name: string;
    email: string;
    email_verified_at?: string;
    role: 'guest' | 'user' | 'admin'; // Peran pengguna
    money: number; // Saldo pengguna (seharusnya number jika sudah di-parse dari decimal)
    // tambahkan properti lain jika ada
}

export interface Product {
    id: string; // UUID
    name: string;
    description: string;
    price: number; // Harga dalam satuan dasar (misal, Rupiah utuh)
    stock: number;
    image: string | null; // Path ke gambar
    image_url?: string; // URL lengkap gambar (opsional, bisa di-generate di frontend/backend)
    reviews?: Review[]; // Opsional, jika di-load bersama produk
    // tambahkan properti lain jika ada
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: string;
    user_id: string;
    product_id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    user: Pick<User, 'id' | 'name'>; // Hanya ambil data user yang relevan
}

export interface CartItem {
    id: string; // ID item keranjang (bukan product ID)
    user_id: string;
    product_id: string;
    quantity: number;
    product: Product; // Detail produk terkait
    created_at: string;
    updated_at: string;
}

export interface OrderDetail {
    id: string;
    product_id: string;
    quantity: number;
    price: number; // Harga produk saat order
    product: Pick<Product, 'id' | 'name' | 'image_url'>; // Info produk yang relevan
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: string;
    user_id: string;
    total_price: number;
    status: string; // Misal: 'pending', 'processing', 'completed', 'cancelled'
    created_at: string;
    orderDetails: OrderDetail[];
    user?: Pick<User, 'id' | 'name'>; // Jika admin melihat order user lain
}

export interface PaginatedData<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type PaginatedProducts = PaginatedData<Product>;
export type PaginatedOrders = PaginatedData<Order>;


// Props dasar untuk halaman Inertia
export interface PageProps {
    auth: {
        user: User | null;
    };
    flash: {
        success?: string;
        error?: string;
    };
    // Tambahkan properti global lain yang di-share via HandleInertiaRequests
    // Contoh: ziggy: { route: any, location: string }; // Jika menggunakan Ziggy
}

export interface ProductDetailPageProps extends PageProps {
    product: Product;
}

export interface CartPageProps extends PageProps {
    cartItems: CartItem[];
    totalPrice: number;
}

export interface OrdersPageProps extends PageProps {
    orders: Order[];
}

export interface OrderDetailPageProps extends PageProps {
    order: Order;
}