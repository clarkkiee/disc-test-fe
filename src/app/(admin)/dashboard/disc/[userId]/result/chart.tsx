import React, {useRef} from "react";
import { Line } from "react-chartjs-2";
import html2canvas from 'html2canvas';
import { Button } from "@/components/ui/button"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

type ProcessedDataT = {
    processedData: number[][]
}

const DiSCResultChart: React.FC<ProcessedDataT> = ({ processedData }) => {

    const divRef = useRef<HTMLDivElement>(null);

    const downloadImage = async () => {
        if (divRef.current) {
        // Ambil screenshot dari container div yang mencakup semua elemen
        const canvas = await html2canvas(divRef.current);

        // Konversi canvas ke URL gambar
        const dataUrl = canvas.toDataURL('image/png');

        // Buat link unduhan untuk gambar
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'downloaded-image.png';

        // Tambahkan link ke dokumen dan klik untuk mengunduh gambar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        }
    };

    const graphSet = [
        {
            title: 'Graph III Mirror',
          color: 'rgba(255, 99, 132, 1)', 
        },
        {
            title: 'Graph I Mask',
          color: 'rgba(54, 162, 235, 1)',    
        },
        {
            title: 'Graph II Core',
          color: 'rgba(75, 192, 192, 1)',      
        },
      ];
    

    return (
            <div className="flex flex-col w-full justify-center items-center">
                <div ref={divRef} className="flex gap-14 p-4">
                    {
                        processedData.map((dataset, index) => (
                            <div key={index} style={{ width: '175px', height: '500px' }}>
                                <Line
                                    className="flex"
                                    data={{
                                        labels: ['D', 'I', 'S', 'C'],
                                        datasets: [{
                                          fill: true,
                                          tension: 0,
                                          backgroundColor: graphSet[index].color,
                                          borderColor: graphSet[index].color,
                                          borderWidth: 2,
                                          data: dataset
                                        }]
                                      }}
                                    options={{
                                        responsive: true,
                                        indexAxis: 'x' as const,  // Mengubah orientasi chart menjadi vertikal
                                        maintainAspectRatio: false, 
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: graphSet[index].title
                                            },
                                            legend: {
                                                display: false  // Add this line to hide the legend
                                            }
                                        },
                                        scales: {
                                            x: {
                                                position: 'center' as const,
                                                grid: {
                                                    drawOnChartArea: false,  // Disable grid lines within the chart area
                                                },
                                                min: -0.5,
                                                max: 3.5,
                                                offset: true,
                                                ticks: {
                                                    autoSkip: false,
                                                },
                                            },
                                            y: {
                                                min: -8,
                                                max: 8,
                                                ticks: {
                                                    autoSkip: false,   // Menonaktifkan auto-skip agar semua label ditampilkan
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        ))
                    }
                </div>
                <Button onClick={downloadImage} variant="outline">Download Image</Button>
            </div>
    );
}

export default DiSCResultChart;
