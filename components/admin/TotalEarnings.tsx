import { useEffect, useState } from "react";

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

const TotalEarnings = () => {
  const [totalEarnings, setTotalEarnings] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data: Project[] = await response.json();
        const total = data.reduce((sum, project) => sum + project.amount, 0);
        setTotalEarnings(total);
      } catch (error) {
        console.error("Błąd pobierania projektów:", error);
      }
    };

    fetchProjects();
  }, []);

  const tax = totalEarnings * 0.88;

  return (
    <div className="total-earnings">
      <h2>Łączne zarobki: {totalEarnings.toFixed(2)} zł</h2>
      <p>Podatek (12%): {tax.toFixed(2)} zł</p>
    </div>
  );
};

export default TotalEarnings;
