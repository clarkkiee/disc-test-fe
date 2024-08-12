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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useEffect, useState, useCallback, Suspense } from "react";
import { getPaginationData } from "@/services/AdminActionServices";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

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

type PaginationMetaData = {
  page: number;
  limit: number;
  total: number;
} | null;

export function Dashboard() {
  const router = useRouter();
  const [searchTextInput, setSearchTextInput] = useState<string>("");
  const [searchTextQuery] = useDebounce(searchTextInput, 700);
  const [userDatas, setUserDatas] = useState<UserData[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, isLoading] = useState<boolean>(true);
  const [paginationMetaData, setPaginationMetaData] =
    useState<PaginationMetaData>(null);
  const windowSize = 5;

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const fetchPaginationData = useCallback(async () => {
    isLoading(true);
    const userDatasQ = await getPaginationData(currentPage, searchTextQuery);
    if (!userDatasQ) {
      setPaginationMetaData(null);
      setUserDatas(null);
    } else {
      setPaginationMetaData(userDatasQ.meta);
      setUserDatas(userDatasQ.datas);
    }
    isLoading(false);
  }, [currentPage, searchTextQuery]);

  const getPageNumbers = () => {
    const totalPages = Math.ceil(
      paginationMetaData!.total / paginationMetaData!.limit
    );
    let startPage = Math.max(currentPage - Math.floor(windowSize / 2), 1);
    let endPage = Math.min(startPage + windowSize - 1, totalPages);

    if (endPage - startPage < windowSize - 1) {
      startPage = Math.max(endPage - windowSize + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handleDetailPage = (userId: string) => {
    router.push(`dashboard/disc/${userId}/result`);
  };

  useEffect(() => {
    fetchPaginationData();
  }, [fetchPaginationData]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <p>Hello, Admin</p>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <form>
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                onChange={(e) => setSearchTextInput(e.currentTarget.value)}
              />
            </form>
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

        {loading ? (
          <div>Loading...</div>
        ) : (
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Hasil Tes</CardTitle>
                <CardDescription>
                  Hasil tes dan informasi lengkap mengenai kandidat yang
                  menjalani DiSC Test
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userDatas == null ? (
                  <div>Data not Found</div>
                ) : (
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
                        <TableRow
                          key={data.id}
                          onClick={() => handleDetailPage(data.id)}
                        >
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
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              ...
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {paginationMetaData === null ? (
              ""
            ) : (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={currentPage == 1 ? "hidden" : ""}
                      onClick={() => handleChangePage(currentPage - 1)}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handleChangePage(page)}
                        className={
                          page === currentPage ? "active bg-slate-100" : ""
                        }
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      className={
                        currentPage ==
                        Math.ceil(
                          paginationMetaData!.total / paginationMetaData!.limit
                        )
                          ? "hidden"
                          : ""
                      }
                      onClick={() => handleChangePage(currentPage + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
