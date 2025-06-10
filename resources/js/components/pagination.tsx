// resources/js/components/pagination.tsx
import React from 'react';
import { Link as InertiaLink } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button'; // Assuming buttonVariants for styling Links like Buttons
import { cn } from '@/lib/utils'; // Your classnames utility

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

export default function Pagination({ links, className }: PaginationProps) {
    if (!links || links.length <= 3) { // Typically, Laravel pagination includes prev, next, and page numbers. <=3 means only prev/next and maybe one page, or no pages.
        return null;
    }

    return (
        <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-x-1", className)}>
            {links.map((link, index) => {
                if (!link.url && index === 0) { // "Previous" link when on first page
                    return (
                        <Button
                            key={`prev-disabled-${index}`}
                            variant="outline"
                            size="icon"
                            disabled
                            aria-label="Previous page"
                            className="cursor-not-allowed"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    );
                }

                if (!link.url && index === links.length - 1) { // "Next" link when on last page
                    return (
                        <Button
                            key={`next-disabled-${index}`}
                            variant="outline"
                            size="icon"
                            disabled
                            aria-label="Next page"
                            className="cursor-not-allowed"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    );
                }

                // Handle "Previous" and "Next" text links specifically if they have URLs
                const isPrevious = link.label.toLowerCase().includes('previous');
                const isNext = link.label.toLowerCase().includes('next');

                if (isPrevious && link.url) {
                    return (
                        <InertiaLink
                            key={`prev-enabled-${index}`}
                            href={link.url}
                            className={cn(
                                buttonVariants({ variant: "outline", size: "icon" })
                            )}
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </InertiaLink>
                    );
                }

                if (isNext && link.url) {
                    return (
                        <InertiaLink
                            key={`next-enabled-${index}`}
                            href={link.url}
                            className={cn(
                                buttonVariants({ variant: "outline", size: "icon" })
                            )}
                            aria-label="Next page"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </InertiaLink>
                    );
                }

                // Regular page number links
                if (link.url) {
                    return (
                        <InertiaLink
                            key={link.label + '-' + index}
                            href={link.url}
                            className={cn(
                                buttonVariants({ variant: link.active ? "default" : "outline", size: "icon" }),
                                { "font-bold": link.active }
                            )}
                            aria-current={link.active ? "page" : undefined}
                        >
                            {/* Safely render HTML entities if label contains them, or just render label */}
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </InertiaLink>
                    );
                }

                // Ellipsis (...) or non-URL links (should not happen for page numbers if URL is null)
                // Laravel pagination might use '...' for ellipsed pages, which won't have a URL.
                if (link.label === '...') {
                     return (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
                        >
                            &hellip;
                        </span>
                    );
                }

                return null; // Fallback for any other unexpected link structure
            })}
        </nav>
    );
}