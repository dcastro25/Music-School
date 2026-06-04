"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnResizeMode,
    PaginationState,
} from "@tanstack/react-table";

import { Course } from "@/app/generated/prisma/client";
import { useEffect, useState } from "react";
import {
    CheckCircle,
    ChevronDown,
    ChevronUp,
    ChevronsUpDown,
    Clock,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Actions } from "../ListCourse/CouseCard/Actions";

type DataTableProps = {
    DataTable: Course[];
};

function isValidUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-md border bg-muted text-muted-foreground max-w-full truncate">
            {children}
        </span>
    );
}

function StatusBadge({ value }: { value: boolean }) {
    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-medium border
            ${
                value
                    ? "bg-yellow-500/10 text-foreground border-yellow-500/20"
                    : "bg-green-500/10 text-primary-text border-green-500/20"
            }`}
        >
            {value ? <CheckCircle size={14} /> : <Clock size={14} />}
            {value ? "Publicado" : "Borrador"}
        </span>
    );
}

export function DataTable({ DataTable: initialData }: DataTableProps) {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnResizeMode] = useState<ColumnResizeMode>("onChange");
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [data, setData] = useState<Course[]>(initialData);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const formatPrice = (value: number) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(value);

    const formatDuration = (value: string) => value.replace("_", " ");

    const columns: ColumnDef<Course>[] = [
        {
            header: "Curso",
            id: "courseInfo",
            accessorFn: (row) => row.courseName,
            enableGlobalFilter: true,
            size: 300,
            minSize: 120,
            cell: ({ row }) => {
                const c = row.original;
                const safeImage =
                    c.imageUrl && isValidUrl(c.imageUrl)
                        ? c.imageUrl
                        : "/img/default-image-course.webp";
                return (
                    <div className="flex items-center gap-3 overflow-hidden">
                        <img
                            src={safeImage}
                            alt={c.courseName}
                            className="w-20 h-16 rounded-md object-cover border border-border/50 bg-muted flex-shrink-0"
                            onError={(e) => {
                                e.currentTarget.src =
                                    "/img/default-image-course.webp";
                            }}
                        />
                        <p className="text-lg text-foreground truncate min-w-0">
                            {c.courseName}
                        </p>
                    </div>
                );
            },
        },
        {
            header: "Categoría",
            accessorKey: "category",
            enableGlobalFilter: true,
            size: 130,
            minSize: 60,
            cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
        },
        {
            header: "Nivel",
            accessorKey: "level",
            enableGlobalFilter: true,
            size: 120,
            minSize: 60,
            cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
        },
        {
            header: "Precio",
            accessorKey: "price",
            enableGlobalFilter: true,
            size: 140,
            minSize: 60,
            cell: ({ getValue }) => {
                const val = getValue<number | null>();
                if (val == null)
                    return <span className="text-muted-foreground">—</span>;
                return (
                    <span className="text-md font-semibold text-foreground block truncate">
                        {formatPrice(val)}
                    </span>
                );
            },
        },
        {
            header: "Duración",
            accessorKey: "duration",
            enableGlobalFilter: true,
            size: 120,
            minSize: 60,
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (
                    <span className="text-md text-muted-foreground block truncate">
                        {val ? formatDuration(val) : "—"}
                    </span>
                );
            },
        },
        {
            header: "Creado",
            accessorKey: "createdAt",
            enableGlobalFilter: true,
            size: 130,
            minSize: 60,
            cell: ({ row }) => {
                const date = new Date(row.original.createdAt);
                return (
                    <span className="text-md text-muted-foreground block truncate">
                        {date.toLocaleDateString("es-CO", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                );
            },
        },
        {
            header: "Estado",
            accessorKey: "isPublished",
            enableGlobalFilter: true,
            size: 110,
            minSize: 60,
            cell: ({ getValue }) => <StatusBadge value={getValue<boolean>()} />,
        },
        {
            header: "Descripción",
            accessorKey: "description",
            enableGlobalFilter: true,
            size: 240,
            minSize: 60,
            cell: ({ getValue }) => (
                <p className="text-md text-muted-foreground line-clamp-2 wrap-break-word w-full">
                    {getValue<string>() ?? "—"}
                </p>
            ),
        },
        {
            header: "Acciones",
            id: "actions", // 🔥 importante (no uses accessorKey aquí)
            size: 120,
            minSize: 80,
            enableSorting: false,
            enableGlobalFilter: false,
            cell: ({ row }) => (
                <Actions
                    courseId={row.original.id}
                    CourseName={row.original.courseName}
                    isPublished={row.original.isPublished}
                    onPublishChange={(newState) => {
                        // Actualiza el estado local del curso
                        setData(
                            data.map((c) =>
                                c.id === row.original.id
                                    ? { ...c, isPublished: newState }
                                    : c,
                            ),
                        );
                    }}
                    onDelete={(id: string) => {
                        // Elimina el curso del estado local
                        setData(data.filter((c) => c.id !== id));
                    }}
                />
            ),
        },
    ];

    const table = useReactTable<Course>({
        data: data,
        columns,
        columnResizeMode,
        state: {
            sorting,
            globalFilter: search,
            pagination,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        autoResetPageIndex: false,
        enableColumnResizing: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: (row, columnId, filterValue) =>
            String(row.getValue(columnId))
                .toLowerCase()
                .includes(filterValue.toLowerCase()),
        initialState: {},
    });

    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();

    return (
        <div className="w-full px-4 lg:px-10 py-8">
            <div className="rounded-lg overflow-hidden border border-border bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table
                        style={{
                            width: table.getTotalSize(),
                            minWidth: "100%",
                            tableLayout: "fixed",
                        }}
                    >
                        <thead>
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id} className="border-b">
                                    {hg.headers.map((h) => (
                                        <th
                                            key={h.id}
                                            className="relative px-4 py-3 text-left text-lg font-semibold text-foreground select-none"
                                            style={{ width: h.getSize() }}
                                        >
                                            {/* Texto + sort — click para ordenar */}
                                            <div
                                                className="flex items-center gap-1 cursor-pointer hover:text-foreground/70 transition-colors pr-3 overflow-hidden"
                                                onClick={h.column.getToggleSortingHandler()}
                                            >
                                                <span className="truncate">
                                                    {flexRender(
                                                        h.column.columnDef
                                                            .header,
                                                        h.getContext(),
                                                    )}
                                                </span>
                                                {h.column.getCanSort() && (
                                                    <span className="text-muted-foreground flex-shrink-0">
                                                        {{
                                                            asc: (
                                                                <ChevronUp className="w-4 h-4" />
                                                            ),
                                                            desc: (
                                                                <ChevronDown className="w-4 h-4" />
                                                            ),
                                                        }[
                                                            h.column.getIsSorted() as string
                                                        ] ?? (
                                                            <ChevronsUpDown className="w-4 h-4 opacity-30" />
                                                        )}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Handle de resize — borde derecho */}
                                            {h.column.getCanResize() && (
                                                <div
                                                    title="Arrastra para ajustar el ancho"
                                                    onMouseDown={h.getResizeHandler()}
                                                    onTouchStart={h.getResizeHandler()}
                                                    className="absolute right-0 top-0 h-full w-3 flex items-center justify-center cursor-col-resize touch-none select-none group z-10"
                                                >
                                                    <div
                                                        className={[
                                                            "h-4/5 w-px rounded-full transition-all duration-150",
                                                            h.column.getIsResizing()
                                                                ? "bg-primary !w-[2px] h-full"
                                                                : "bg-border/50 group-hover:bg-primary/70 group-hover:!w-[2px]",
                                                        ].join(" ")}
                                                    />
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody>
                            {table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="py-16 text-center text-muted-foreground"
                                    >
                                        No hay resultados para &ldquo;{search}
                                        &rdquo;
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="border-b border-border/40 hover:bg-muted/40 transition"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="px-4 py-2 overflow-hidden"
                                                style={{
                                                    width: cell.column.getSize(),
                                                    maxWidth:
                                                        cell.column.getSize(),
                                                }}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINACIÓN */}
                <div className="flex items-center justify-between px-4 py-3 border-t">
                    <p className="text-sm text-muted-foreground">
                        Página{" "}
                        <span className="font-medium">{currentPage}</span> de{" "}
                        <span className="font-medium">{totalPages}</span>
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="h-8 px-3 border rounded-md hover:bg-muted disabled:opacity-40"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="h-8 px-3 border rounded-md hover:bg-muted disabled:opacity-40"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
