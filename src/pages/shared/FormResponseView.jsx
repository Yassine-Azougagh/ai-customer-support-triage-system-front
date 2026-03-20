import { StatusComponent } from "@/components/StatusComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { getTicketById } from "@/services/ticket.service";
import { MoreHorizontalIcon, Send, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const tableData = [
  {
    id: 1,
    title: "Analyse de satisfaction client Q4",
    createdAt: "2024-03-15T10:30:00Z",
    createdBy: "JD",
    formName: "Enquête Qualité",
    status: "PUBLISHED",
    answers: [
      {
        questionId: "q1",
        questionTitle: "Note globale",
        value: "4/5"
      },
      {
        questionId: "q2",
        questionTitle: "Commentaires",
        value: "Excellent service, très réactif."
      }
    ]
  },
  {
    id: 2,
    title: "Retour d'expérience Beta Test",
    createdAt: "2024-03-12T14:15:00Z",
    createdBy: "EM",
    formName: "Feedback Produit",
    status: "DRAFT",
    answers: [
      {
        questionId: "q1",
        questionTitle: "Bug rencontré",
        value: "Problème d'affichage sur mobile."
      }
    ]
  },
  {
    id: 3,
    title: "Inscription séminaire annuel",
    createdAt: "2024-03-10T09:00:00Z",
    createdBy: "AL",
    formName: "RH - Événements",
    status: "CLOSED",
    answers: [
      {
        questionId: "q1",
        questionTitle: "Régime alimentaire",
        value: "Végétarien"
      }
    ]
  },
  {
    id: '9bbe3364-fb79-4ea0-91a1-fb336ce8ee10',
    title: "Sondage matériel bureau",
    createdAt: "2024-03-08T16:45:00Z",
    createdBy: "KB",
    formName: "Logistique interne",
    status: "DELETED",
    answers: [
      {
        questionId: "q1",
        questionTitle: "Besoin",
        value: "Double écran 27 pouces"
      }
    ]
  }
];



export default function FormResponseView() {
  const [responses, setResponses] = useState([]);
  const [ticketInfo, setTicketInfo] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getTicketById(id).then(data => {
      setTicketInfo(data);
    });
  }, [id]);


  return (
    <div className="max-w-6xl mx-auto space-y-8 w-full pb-10">
      <header className="pb-2 flex justify-between items-start gap-2 w-full pt-4">
        <div>
          <div className="text-3xl font-bold mb-4">Ticket #{id}</div>
          <div className="space-y-1 text-base">
            <p><strong>Submitted by:</strong> {ticketInfo?.submittedBy} &mdash; <a href={`mailto:${ticketInfo?.email}`} className="text-blue-600 hover:underline">{ticketInfo?.email}</a></p>
            <p><strong>Date:</strong> {ticketInfo?.date}</p>
            <p><strong>Category:</strong> {ticketInfo?.category}</p>
            <p className="flex items-center gap-2"><strong>Priority:</strong> {ticketInfo?.priority === 'Urgent' ? '🔴' : ticketInfo?.priority === 'Medium' ? '🟡' : '⚪'} {ticketInfo?.priority}</p>
            <p><strong>Status:</strong> {ticketInfo?.status}</p>
            <p><strong>Assigned to:</strong> {ticketInfo?.agent}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate("/agent/tickets")}>Back to Dashboard</Button>
      </header>

      <div className="bg-white/40 backdrop-blur-md border border-white/20 shadow-xl rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">Customer message:</h2>
        <blockquote className="border-l-4 border-gray-300 pl-4 py-2 italic text-gray-700 bg-gray-50/50 rounded-r-md">
          {ticketInfo?.message}
        </blockquote>
      </div>

      <div className="bg-blue-50/50 backdrop-blur-md border border-blue-200 shadow-xl rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4 text-blue-800">
          <Sparkles className="size-5" />
          <h2 className="text-xl font-semibold">AI Suggested Reply</h2>
        </div>
        <Textarea
          value={ticketInfo?.suggeestedResponse || ""}
          readOnly
          className="min-h-[150px] bg-white text-base shadow-inner border-gray-300"
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
            <Sparkles className="size-4 mr-2" /> Regenerate
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="size-4 mr-2" /> Send Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
