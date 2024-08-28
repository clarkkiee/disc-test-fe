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

import { ScrollArea } from "@/components/ui/scroll-area"
import { getDetailExamResult } from "@/services/AdminActionServices";
import { useCallback, useEffect, useState } from "react";
import DiSCResultChart from "./chart";
import { processDiscData } from "@/services/DataProcessingServices";

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
  const [ answerDataPayload, setAnswerDataPayload ] = useState<string[]>([])
  const [ processedData, setProcessedData ] = useState<number[][]>([])

  const fetchCompleteExamData = useCallback(async () => {
    isLoading(true);
    const completeExamDataQ = await getDetailExamResult(userId);
    setExamData(completeExamDataQ);
    isLoading(false);
  }, [userId]);

  const processAndSendData = useCallback(async (examData: CompleteExamData | null) => {
    if (!examData) return;

    const payload = examData.exam_result.flatMap(dataEachNumber => [
      dataEachNumber.answer_0,
      dataEachNumber.answer_1,
    ]);

    setAnswerDataPayload(payload);

    const resultdata = await processDiscData(payload);
    setProcessedData(resultdata)
  }, []);

  useEffect(() => {
    fetchCompleteExamData();
  }, [fetchCompleteExamData]);

  useEffect(() => {
    if (examData) {
      processAndSendData(examData);
    }
  }, [examData, processAndSendData]);

  return (
    <>
      {loading === false ? (
        <div className="flex flex-col gap-8 w-full items-center">

            <div className="flex gap-4 ">
              <div className="flex gap-4 h-min">
                <Card className="flex flex-col min-h px-4">
                  <CardHeader>
                    <CardTitle>Biodata</CardTitle>
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
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Jawaban</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-8">
                    <Table>
                        <ScrollArea className="flex h-[50vh] w-full ">
                      <TableHeader className="sticky top-0 bg-white z-10">
                        <TableRow>
                          <TableHead>No</TableHead>
                          <TableHead>M</TableHead>
                          <TableHead>L</TableHead>
                        </TableRow>
                      </TableHeader>
                          <TableBody className="w-min">
                              {examData?.exam_result.map((q, index) => (
                                <TableRow key={index}>
                                  <TableCell>{q.questionId}</TableCell>
                                  <TableCell>{q.answer_0}</TableCell>
                                  <TableCell>{q.answer_1}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </ScrollArea>
                    </Table>
                    <CardFooter className="p-0">
                      <div className="text-xs text-muted-foreground">
                        <strong>M</strong> : Menggambarkan <br></br>
                        <strong>L</strong> : Tidak Menggambarkan 
                      </div>
                    </CardFooter>
                  </CardContent>
                </Card>
              </div>

              <Card className="flex p-2 w-min items-center justify-center">
                <CardContent className="flex w-full justify-center items-center">
                  <DiSCResultChart processedData={processedData} username={examData!.user.name}/> 
                  {/* Mirror, Mask, Core */}
                </CardContent>
              </Card>
            </div>


        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
}
