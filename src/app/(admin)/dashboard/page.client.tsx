"use client";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useEffect, useState, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getPaginationData } from "@/services/AdminActionServices";
// import { Pagination } from "flowbite-react";
import { useRouter } from "next/navigation";

type UserData = {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  latest_education: string;
  position_applied: string;
  domicile_city: string;
  source_information: string;
};

export function Dashboard() {
  const router = useRouter();
  const [userDatas, setUserDatas] = useState<UserData[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onPageChange = (state: string) => {
    let newPage = currentPage;
    if (state === "next") {
      newPage = currentPage + 1;
    } else if (state === "prev") {
      newPage = currentPage - 1;
    }
    setCurrentPage(newPage);
  };

  const fetchPaginationData = useCallback(async () => {
    const userDatasQ = await getPaginationData(currentPage);
    setUserDatas(userDatasQ);
  }, [currentPage]);

  useEffect(() => {
    fetchPaginationData()
  }, [fetchPaginationData]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <p>Hello, Admin</p>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center"></div>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Hasil Tes</CardTitle>
              <CardDescription>
                Hasil tes dan informasi lengkap mengenai kandidat yang menjalani
                DiSC Test
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Tanggal Lahir</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Pendidikan Terakhir
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Posisi yang Dilamar
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Kota Domisili
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userDatas?.map((data, index) => (
                      <TableRow key={data.id} onClick={() => alert(data.id)}>
                        <TableCell>{data.email}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {data.birthdate}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {data.latest_education}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {data.position_applied}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {data.domicile_city}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Suspense>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className={currentPage == 1 ? "hidden" : ""} onClick={() => onPageChange("prev")} />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className={currentPage == 3 ? "hidden" : ""} onClick={() => onPageChange("next")} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
}
