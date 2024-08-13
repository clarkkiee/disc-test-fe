"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";

import { getDetailExamResult } from "@/services/AdminActionServices";
import { useCallback, useEffect, useState } from "react";

type ExamineeBiodata = {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  latest_education: string;
  position_applied: string;
  domicile_city: string;
  source_information: string;
  created_at: string;
};

type ExamChunkData = {
  questionId: number;
  answer_0: string;
  answer_1: string;
}[];

type CompleteExamData = {
  user: ExamineeBiodata;
  exam_result: ExamChunkData;
};

export default function ResultPage({ userId }: { userId: string }) {
  const [examData, setExamData] = useState<CompleteExamData | null>(null);
  const [loading, isLoading] = useState<boolean>(true);

  const fetchCompleteExamData = useCallback(async () => {
    isLoading(true);
    const completeExamDataQ = await getDetailExamResult(userId);
    setExamData(completeExamDataQ);
    isLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchCompleteExamData();
  }, [fetchCompleteExamData]);

  return (
    <>
      {loading === false ? (
        <div className="flex gap-8 w-full">
          <Card className="w-[30%] h-min">
            <CardHeader>
              <CardTitle>Biodata User</CardTitle>
              <CardDescription>
                User ID: {examData?.user.id.substring(0, 8)}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <CardDescription>Email</CardDescription>
                <p>{examData?.user.email}</p>
              </div>
              <div>
                <CardDescription>Nama</CardDescription>
                <p>{examData?.user.name}</p>
              </div>
              <div>
                <CardDescription>Tanggal Lahir</CardDescription>
                <p>{examData?.user.birthdate}</p>
              </div>
              <div>
                <CardDescription>Pendidikan terakhir</CardDescription>
                <p>{examData?.user.latest_education}</p>
              </div>
              <div>
                <CardDescription>Posisi yang Dilamar</CardDescription>
                <p>{examData?.user.position_applied}</p>
              </div>
              <div>
                <CardDescription>Kota Domisili</CardDescription>
                <p>{examData?.user.domicile_city}</p>
              </div>
              <div>
                <CardDescription>Asal Informasi</CardDescription>
                <p>{examData?.user.source_information}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[70%]">
            <CardHeader>
              <CardTitle>Hasil Tes</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. Soal</TableHead>
                    <TableHead>Paling Menggambarkan</TableHead>
                    <TableHead>Paling Tidak Menggambarkan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examData?.exam_result.map((q, index) => (
                    <TableRow key={index}>
                      <TableCell>{q.questionId}</TableCell>
                      <TableCell>{q.answer_0}</TableCell>
                      <TableCell>{q.answer_1}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
}
