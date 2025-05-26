import { useEffect, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Rejestracja komponentów Chart.js
Chart.register(ArcElement, Tooltip, Legend);

type Project = {
  _id: string;
  name: string;
  website: string;
  type: string;
  status: string;
  amount: number;
  email: string;
  password: string;
  note: string;
};

const ProjectEarningsChart = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Błąd pobierania projektów:", error);
      }
    };

    fetchProjects();
  }, []);

  const earningsByType = projects.reduce<Record<string, number>>((acc, project) => {
    acc[project.type] = (acc[project.type] || 0) + project.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(earningsByType),
    datasets: [
      {
        data: Object.values(earningsByType),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: { enabled: true },
    },
  };

  return (
    <div>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default ProjectEarningsChart;
