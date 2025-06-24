'use client';

import * as React from 'react';
import { type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, Eye, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { Client } from '@/lib/features/clients/clientsSlice';

const statutColors = {
  actif: 'bg-green-100 text-green-800 hover:bg-green-200',
  prospect: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  inactif: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
};

export const columns: ColumnDef<Client, unknown>[] = [
  {
    id: 'select',
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label='Sélectionner tout' />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Sélectionner la ligne' />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'nom',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Nom
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='font-medium'>
        {row.getValue('nom')} {row.original.prenom}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'entreprise',
    header: 'Entreprise',
    cell: ({ row }) => (
      <div>
        <div className='font-medium'>{row.getValue('entreprise')}</div>
        <div className='text-sm text-muted-foreground'>{row.original.poste}</div>
      </div>
    ),
  },
  {
    accessorKey: 'statut',
    header: 'Statut',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as keyof typeof statutColors;
      return <Badge className={statutColors[statut]}>{statut}</Badge>;
    },
  },
  {
    accessorKey: 'ville',
    header: 'Localisation',
    cell: ({ row }) => (
      <div>
        <div>{row.getValue('ville')}</div>
        <div className='text-sm text-muted-foreground'>{row.original.adresse.pays}</div>
      </div>
    ),
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[];
      return (
        <div className='flex flex-wrap gap-1'>
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant='outline' className='text-xs'>
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant='outline' className='text-xs'>
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'derniereActivite',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Dernière activité
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rawDate = row.getValue('derniereActivite');
      const date = new Date(rawDate as string | number | Date); // conversion explicite
      return <div>{date.toLocaleDateString('fr-FR')}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const client = row.original;

      return (
        <Button variant='outline' className='h-8 w-8 p-0' asChild>
          <Link href={`/clients/${client.id}`}>
            <Eye className='h-4 w-4' />
          </Link>
        </Button>
      );
    },
  },
];

export function ClientDataTable({ data }: { data: Client[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data: data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const searchValue = filterValue.toLowerCase();
      const client = row.original;

      return client.nom.toLowerCase().includes(searchValue) || client.prenom.toLowerCase().includes(searchValue) || client.email.toLowerCase().includes(searchValue) || client.entreprise.toLowerCase().includes(searchValue) || client.adresse.ville.toLowerCase().includes(searchValue) || client.tags.some((tag) => tag.toLowerCase().includes(searchValue));
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between py-4'>
        <div className='flex items-center space-x-2'>
          <div className='relative'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input placeholder='Rechercher des clients...' value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} className='pl-8 max-w-sm' />
          </div>
          <Select value={(table.getColumn('statut')?.getFilterValue() as string) ?? ''} onValueChange={(value) => table.getColumn('statut')?.setFilterValue(value === 'all' ? '' : value)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filtrer par statut' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tous les statuts</SelectItem>
              <SelectItem value='actif'>Actif</SelectItem>
              <SelectItem value='prospect'>Prospect</SelectItem>
              <SelectItem value='inactif'>Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Colonnes <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem key={column.id} className='capitalize' checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} sur {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
        </div>
        <div className='flex items-center space-x-6 lg:space-x-8'>
          <div className='flex items-center space-x-2'>
            <p className='text-sm font-medium'>Lignes par page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className='h-8 w-[70px]'>
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side='top'>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
            Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
          </div>
          <div className='flex items-center space-x-2'>
            <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
              <span className='sr-only'>Aller à la première page</span>
              {'<<'}
            </Button>
            <Button variant='outline' className='h-8 w-8 p-0' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <span className='sr-only'>Aller à la page précédente</span>
              {'<'}
            </Button>
            <Button variant='outline' className='h-8 w-8 p-0' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <span className='sr-only'>Aller à la page suivante</span>
              {'>'}
            </Button>
            <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
              <span className='sr-only'>Aller à la dernière page</span>
              {'>>'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
