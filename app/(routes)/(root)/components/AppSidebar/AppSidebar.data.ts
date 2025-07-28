import { Award, BookOpen, ChartArea, GraduationCap, House,  ReceiptText, SquareTerminal } from "lucide-react";


export const routes = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Cursos",
    url: "/courses",
    icon: SquareTerminal,
  },
  {
    title: "Mis Cursos",
    url: "/my-courses",
    icon: BookOpen,
  },
  {
    title: "Pedidos",
    url: "/orders",
    icon: ReceiptText,
  },
  {
    title: "Certificados",
    url: "/certificate",
    icon: Award,
  }
]

export const routesTeacher = [
  {
    title: "Cursos",
    url: "/teacher",
    icon: GraduationCap,
  },
  {
    title: "Analiticas",
    url: "/teacher/analytics",
    icon: ChartArea,
  },




]