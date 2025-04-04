import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

// Register necessary components
ChartJS.register(
  LineElement, 
  PointElement, 
  CategoryScale, 
  LinearScale, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

// Define TypeScript interface for props
interface RatingData {
  getday: string;
  getmonth: string;
  getyear: string;
  rating: string;
}

interface RatingChartProps {
  ratingData?: RatingData[];
}

const RatingChart: React.FC<RatingChartProps> = ({ ratingData = [] }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Add default sample data if ratingData is empty
  const isDataEmpty = !ratingData || ratingData.length === 0;
  
  // Process the data
  const formatDate = (day: string, month: string, year: string) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = parseInt(month, 10) - 1;
    return `${day} ${monthNames[monthIndex]} ${year}`;
  };
  
  // Sample data to use when ratingData is empty
  const sampleData = [
    { getday: "01", getmonth: "01", getyear: "2023", rating: "1500" },
    { getday: "15", getmonth: "02", getyear: "2023", rating: "1550" },
    { getday: "10", getmonth: "03", getyear: "2023", rating: "1620" },
    { getday: "05", getmonth: "04", getyear: "2023", rating: "1590" },
    { getday: "20", getmonth: "05", getyear: "2023", rating: "1650" }
  ];
  
  // Use sample data if ratingData is empty
  const dataToUse = isDataEmpty ? sampleData : ratingData;
  
  const labels: string[] = dataToUse.map(item => 
    formatDate(item.getday, item.getmonth, item.getyear)
  );
  
  const ratings: number[] = dataToUse.map(item => parseInt(item.rating, 10));
  
  // Calculate min and max ratings for better scaling
  const minRating = Math.min(...ratings) - 50;
  const maxRating = Math.max(...ratings) + 50;
  
  // Use direct hex/rgb values instead of CSS variables for gradient
  const getGradient = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    // Use direct color values that work with canvas
    gradient.addColorStop(0, "rgba(92, 41, 235, 0.8)");  // Primary color with 0.8 opacity
    gradient.addColorStop(0.5, "rgba(92, 41, 235, 0.4)"); // Primary color with 0.4 opacity
    gradient.addColorStop(1, "rgba(92, 41, 235, 0)");    // Primary color with 0 opacity
    return gradient;
  };

  // Use direct color values for point colors
  const determinePointColor = (rating: number, index: number, ratings: number[]) => {
    // First point, increase (green), decrease colors
    if (index === 0) return "rgb(165, 55, 253)";  // Chart-1 equivalent
    return rating > ratings[index - 1] 
      ? "rgb(34, 197, 94)"  // Green for increases
      : "rgb(239, 68, 68)";  // Red for decreases
  };
  
  // Define animation settings
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Rating",
        data: ratings,
        borderWidth: 3,
        borderColor: "rgb(92, 41, 235)",  // Primary color
        backgroundColor: function(context: any) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          return getGradient(ctx);
        },
        pointBorderColor: (context: any) => {
          const index = context.dataIndex;
          return determinePointColor(ratings[index], index, ratings);
        },
        pointBackgroundColor: "#FFFFFF",  // White background for points
        pointBorderWidth: 2,
        pointRadius: (context: any) => {
          const index = context.dataIndex;
          // Larger points for min and max values
          if (ratings[index] === Math.max(...ratings)) return 8;
          if (ratings[index] === Math.min(...ratings)) return 8;
          return 6;
        },
        pointHoverRadius: 10,
        pointHoverBorderWidth: 3,
        pointHoverBackgroundColor: "#FFFFFF",
        pointHoverBorderColor: "rgb(92, 41, 235)",  // Primary color
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      delay: (context: any) => context.dataIndex * 100,
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          usePointStyle: true,
          padding: 20,
          color: "#1F2937",  // Foreground color
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)',  // Popover color
        titleColor: '#F9FAFB',  // Popover foreground
        bodyColor: '#F9FAFB',   // Popover foreground
        titleFont: {
          size: 16,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 14,
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          title: (items: any) => {
            return `Contest on ${items[0].label}`;
          },
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
              
              if (context.dataIndex > 0) {
                const diff = context.parsed.y - ratings[context.dataIndex - 1];
                const sign = diff > 0 ? '+' : '';
                label += ` (${sign}${diff} points)`;
              }
            }
            return label;
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Contest Date",
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          padding: {
            top: 10,
          },
          color: "#1F2937",  // Foreground color
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#6B7280",  // Muted foreground
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "Rating",
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          color: "#1F2937",  // Foreground color
        },
        min: minRating,
        max: maxRating,
        grid: {
          color: 'rgba(209, 213, 219, 0.5)',  // Border color
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#6B7280",  // Muted foreground
          stepSize: 50,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 mb-14">
      <div 
        className={`bg-card text-card-foreground rounded-lg shadow-lg p-6 transition-all duration-500${
          animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ height: "500px" }}
      >
        <h2 className="text-foreground font-bold text-center mb-6">
          Rating Progress
        </h2>
        {isDataEmpty ? (
          <div className="flex justify-center items-center h-64 text-muted-foreground">
            <p>Loading rating data...</p>
          </div>
        ) : (
          <div className="h-full">
            <Line data={data} options={options} />
          </div>
        )}
        
        {/* Legend for rating changes */}
        <div className="flex justify-center items-center gap-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-muted-foreground">Rating Increase</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm text-muted-foreground">Rating Decrease</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-sm text-muted-foreground">First Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingChart;