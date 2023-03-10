import en from "@/locales/en";
import es from "@/locales/es";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRouter } from "next/router";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y" as const,
  layout: {
    padding: 20,
  },
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#fff",
      },
    },
    title: {
      display: false,
      position: "top" as const,
      text: "Cantidades de proyectos/blogs por categoría",
      color: "#fff",
    },
  },
  scales: {
    y: {
      ticks: {
        color: "white",
      },
      border: {
        color: "white",
      },
    },
    x: {
      ticks: {
        color: "white",
        stepSize: 1,
      },
      border: {
        color: "white",
      },
      grid: {
        color: "grey",
        borderColor: "grey",
        tickColor: "grey",
      },
    },
  },
};

function CategoriesChart({ data }: any) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "es" ? es : en;
  const labels: any = [];
  let projectsData: any = [];
  let blogsData: any = [];

  data
    .filter((el: any) => el.projects > 0 || el.blog > 0)
    .sort((a: any, b: any) => a.name.localeCompare(b.name))
    .map((el: any) => {
      labels.push(el.name);
      projectsData.push(el.projects);
      blogsData.push(el.blog);
    });

  const dataSets = {
    labels,
    datasets: [
      {
        label: "Projects",
        data: projectsData,
        borderColor: "#7c3aed",
        backgroundColor: "#7c3aed",
      },
      {
        label: "Blogs",
        data: blogsData,
        borderColor: "#be123c",
        backgroundColor: "#be123c",
      },
    ],
  };
  return (
    <div className="aspect-square lg:aspect-video">
      <Bar options={options} data={dataSets} updateMode="resize" />
    </div>
  );
}

export default CategoriesChart;
